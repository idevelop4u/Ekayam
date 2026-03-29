import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeIn, ZoomIn, BounceIn } from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check and loading
    const timer = setTimeout(() => {
      // Check if user is logged in (mock implementation)
      // In real app, this would check AsyncStorage or AuthContext
      const isLoggedIn = false; // Default to false for demo

      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }, 2500); // 2.5 seconds splash duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 40,
        }}
        className="bg-background"
      >
        {/* Logo Container with Animation */}
        <Animated.View
          entering={ZoomIn.duration(800).springify()}
          className="items-center"
        >
          {/* Logo Icon */}
          <View className="w-32 h-32 bg-primary rounded-3xl items-center justify-center shadow-2xl mb-6">
            <Text className="text-white text-6xl font-bold">H</Text>
          </View>

          {/* App Name */}
          <Animated.Text
            entering={FadeIn.duration(1000).delay(300)}
            className="text-4xl font-bold text-foreground mb-2"
          >
            HelpMate
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text
            entering={FadeIn.duration(1000).delay(500)}
            className="text-muted-foreground text-lg"
          >
            Your trusted service companion
          </Animated.Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          entering={BounceIn.duration(1200).delay(800)}
          className="mt-12"
        >
          <ActivityIndicator size="large" color="#0d9488" />
          <Text className="text-muted-foreground text-sm mt-3 text-center">
            Loading your experience...
          </Text>
        </Animated.View>

        {/* Version Info */}
        <View className="mt-8">
          <Text className="text-muted-foreground/50 text-xs">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
