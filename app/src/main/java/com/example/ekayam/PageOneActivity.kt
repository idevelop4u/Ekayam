package com.example.ekayam // Use your package

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class PageOneActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_page_one)

        val btnHome = findViewById<Button>(R.id.btnBackHome)

        btnHome.setOnClickListener {
            // "finish()" closes this screen and returns to the previous one (Home)
            finish()
        }
    }
}