package com.example.ekayam // Don't copy this line, use your own package name

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Find the buttons
        val button1 = findViewById<Button>(R.id.btnGoToPage1)
        val button2 = findViewById<Button>(R.id.btnGoToPage2)

        // 2. Set Click Listener for Page 1
        button1.setOnClickListener {
            // This Intent tells Android: "From this Context (this), go to PageOneActivity"
            val intent = Intent(this, PageOneActivity::class.java)
            startActivity(intent)
        }

        // 3. Set Click Listener for Page 2
        button2.setOnClickListener {
            val intent = Intent(this, PageTwoActivity::class.java)
            startActivity(intent)
        }
    }
}