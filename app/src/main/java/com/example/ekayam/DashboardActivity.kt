package com.example.ekayam

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Color
import android.location.Location
import android.os.Bundle
import android.view.MenuItem
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.gms.location.LocationServices
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.navigation.NavigationView
import com.uber.h3core.H3Core
import org.osmdroid.config.Configuration
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.MapView
import org.osmdroid.views.overlay.Marker
import org.osmdroid.views.overlay.Polygon
import org.osmdroid.views.overlay.compass.CompassOverlay
import org.osmdroid.views.overlay.compass.IOrientationConsumer
import org.osmdroid.views.overlay.compass.IOrientationProvider
import org.osmdroid.views.overlay.gestures.RotationGestureOverlay
import java.io.IOException
import kotlin.random.Random

class DashboardActivity : AppCompatActivity() {

    private lateinit var map: MapView
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView
    private val LOCATION_PERMISSION_CODE = 1
    private var mCompassOverlay: CompassOverlay? = null
    private var mRotationGestureOverlay: RotationGestureOverlay? = null

    // Initialize H3 Core lazily
    private val h3: H3Core? by lazy {
        try {
            H3Core.newInstance()
        } catch (e: Throwable) {
            e.printStackTrace()
            null
        }
    }

    // Custom Provider to link Compass to Map Rotation
    private val mapOrientationProvider = object : IOrientationProvider {
        private var consumer: IOrientationConsumer? = null
        override fun startOrientationProvider(c: IOrientationConsumer?): Boolean {
            consumer = c
            update(map.mapOrientation)
            return true
        }
        override fun stopOrientationProvider() {
            consumer = null
        }
        override fun getLastKnownOrientation(): Float = if (::map.isInitialized) map.mapOrientation else 0f
        override fun destroy() { consumer = null }

        fun update(orientation: Float) {
            consumer?.onOrientationChanged(orientation, this)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 1. FIX: Use getSharedPreferences instead of the deprecated PreferenceManager
        val ctx = applicationContext
        Configuration.getInstance().load(ctx, ctx.getSharedPreferences("osmdroid", Context.MODE_PRIVATE))

        setContentView(R.layout.activity_dashboard)

        drawerLayout = findViewById(R.id.drawerLayout)
        navigationView = findViewById(R.id.navigationView)

        // Setup Navigation View Listener
        navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_assistance -> {
                    Toast.makeText(this, "Provide Assistance Clicked", Toast.LENGTH_SHORT).show()
                }
                R.id.nav_ask_help -> {
                    Toast.makeText(this, "Ask for Help Clicked", Toast.LENGTH_SHORT).show()
                }
                R.id.nav_settings -> {
                    Toast.makeText(this, "Settings Clicked", Toast.LENGTH_SHORT).show()
                }
                R.id.nav_logout -> {
                    Toast.makeText(this, "Logout Clicked", Toast.LENGTH_SHORT).show()
                }
            }
            drawerLayout.closeDrawer(GravityCompat.START)
            true
        }

        map = findViewById(R.id.mapView)
        map.setTileSource(TileSourceFactory.MAPNIK)
        map.setMultiTouchControls(true)
        map.controller.setZoom(18.0)

        // Add Compass Overlay linked to Map Rotation
        mCompassOverlay = CompassOverlay(ctx, mapOrientationProvider, map)
        mCompassOverlay?.enableCompass()
        map.overlays.add(mCompassOverlay)

        // Re-enable Rotation Gesture Overlay with correct onRotate signature
        mRotationGestureOverlay = object : RotationGestureOverlay(map) {
            override fun onRotate(deltaAngle: Float) {
                super.onRotate(deltaAngle)
                mapOrientationProvider.update(map.mapOrientation)
            }
        }
        mRotationGestureOverlay?.isEnabled = true
        map.overlays.add(mRotationGestureOverlay)

        val fabMenu = findViewById<FloatingActionButton>(R.id.fabMenu)
        fabMenu.setOnClickListener {
            drawerLayout.openDrawer(GravityCompat.START)
        }

        val fabCenter = findViewById<FloatingActionButton>(R.id.fabCenterLocation)
        fabCenter.setOnClickListener {
            // Reset map rotation to North (0 degrees)
            map.mapOrientation = 0f
            mapOrientationProvider.update(0f)
            checkPermissionsAndLocate()
        }

        checkPermissionsAndLocate()
    }

    private fun checkPermissionsAndLocate() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            == PackageManager.PERMISSION_GRANTED) {
            getUserLocation()
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_CODE
            )
        }
    }

    private fun getUserLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            return
        }

        val fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
            if (location != null) {
                val userPoint = GeoPoint(location.latitude, location.longitude)

                map.controller.animateTo(userPoint)

                // 1. Clear previous drawings
                map.overlays.clear()
                // Re-add permanent overlays
                if (mCompassOverlay != null) map.overlays.add(mCompassOverlay)
                if (mRotationGestureOverlay != null) map.overlays.add(mRotationGestureOverlay)

                // 2. Draw User Hexagon
                drawH3Hexagon(location)

                // 3. Draw Neighbors
                drawNeighbors(location)

                // 4. Draw Marker
                val startMarker = Marker(map)
                startMarker.position = userPoint
                startMarker.setAnchor(Marker.ANCHOR_CENTER, Marker.ANCHOR_BOTTOM)
                startMarker.title = "You are here"

                if (h3 != null) {
                    // FIX: "latLngToCell" is the new name for "geoToH3Address"
                    val hexId = h3!!.latLngToCell(location.latitude, location.longitude, 9)
                    // Convert the Long ID to String for display
                    startMarker.snippet = "Zone: ${h3!!.h3ToString(hexId)}"
                }

                startMarker.showInfoWindow()
                map.overlays.add(startMarker)

                map.invalidate()
            } else {
                Toast.makeText(this, "Waiting for GPS signal...", Toast.LENGTH_SHORT).show()
            }
        }.addOnFailureListener {
            Toast.makeText(this, "Failed to get location: ${it.message}", Toast.LENGTH_SHORT).show()
        }
    }

    private fun drawH3Hexagon(location: Location) {
        if (h3 == null) return

        try {
            val resolution = 9
            // FIX: Use "latLngToCell" (Returns a Long)
            val hexIndex = h3!!.latLngToCell(location.latitude, location.longitude, resolution)

            // FIX: Use "cellToBoundary" instead of "h3ToGeoBoundary"
            val boundary = h3!!.cellToBoundary(hexIndex)

            val polygonPoints = boundary.map { GeoPoint(it.lat, it.lng) }

            val hexPolygon = Polygon().apply {
                points = polygonPoints
                fillPaint.color = Color.argb(50, 0, 0, 255) // Blue
                outlinePaint.color = Color.BLUE
                outlinePaint.strokeWidth = 3f
                // Convert Long ID to string for the title
                title = "My Zone (${h3!!.h3ToString(hexIndex)})"
            }

            hexPolygon.setOnClickListener { _, _, _ ->
                val volunteers = Random.nextInt(1, 10)
                Toast.makeText(this, "$volunteers Volunteers active in this zone", Toast.LENGTH_SHORT).show()
                true
            }

            map.overlays.add(0, hexPolygon)

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun drawNeighbors(location: Location) {
        if (h3 == null) return

        try {
            val resolution = 9
            val centerHex = h3!!.latLngToCell(location.latitude, location.longitude, resolution)

            // FIX: Use "gridDisk" instead of "kRing"
            val neighbors = h3!!.gridDisk(centerHex, 1)

            for (hexId in neighbors) {
                if (hexId == centerHex) continue

                // FIX: Use "cellToBoundary"
                val boundary = h3!!.cellToBoundary(hexId)
                val polygonPoints = boundary.map { GeoPoint(it.lat, it.lng) }

                val neighborPoly = Polygon().apply {
                    points = polygonPoints
                    fillPaint.color = Color.argb(40, 0, 128, 0) // Green
                    outlinePaint.color = Color.parseColor("#006400")
                    outlinePaint.strokeWidth = 3f
                    title = "Neighbor (${h3!!.h3ToString(hexId)})"
                }

                neighborPoly.setOnClickListener { _, _, _ ->
                    val volunteers = Random.nextInt(0, 6)
                    val message = if (volunteers > 0) "$volunteers Volunteers active here" else "No volunteers here"
                    Toast.makeText(this@DashboardActivity, message, Toast.LENGTH_SHORT).show()
                    true
                }

                map.overlays.add(0, neighborPoly)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getUserLocation()
            } else {
                Toast.makeText(this, "Location permission is required.", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        map.onResume()
        mCompassOverlay?.enableCompass()
    }

    override fun onPause() {
        super.onPause()
        map.onPause()
        mCompassOverlay?.disableCompass()
    }
}