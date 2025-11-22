package com.example.ekayam // Use your package

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class PageTwoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_page_two)

        val btnHome = findViewById<Button>(R.id.btnBackHome2)

        btnHome.setOnClickListener {
            finish() // Closes Page 2, revealing Home
        }
    }
}