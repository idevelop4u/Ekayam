package com.example.ekayam

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // 1. Install Splash Screen (Must come before setContentView)
        installSplashScreen()

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 2. Find Views
        val btnLogin = findViewById<Button>(R.id.btnLandingLogin)
        val btnRegister = findViewById<Button>(R.id.btnLandingRegister)
        val tvSkip = findViewById<TextView>(R.id.tvSkipToDashboard) // The new Skip link

        // 3. Navigate to Login Page
        btnLogin.setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }

        // 4. Navigate to Register Page
        btnRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }

        // 5. Navigate DIRECTLY to Dashboard (Bypassing Login)
        tvSkip.setOnClickListener {
            val intent = Intent(this, DashboardActivity::class.java)
            startActivity(intent)
        }
    }
}