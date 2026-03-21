import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Car,
  X,
  Plus,
  Minus,
  Layers,
  Navigation as NavigationIcon,
  ChevronLeft,
} from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

type Helper = {
  id: string;
  name: string;
  image: string;
  rating: number;
  service: string;
  distance: string;
  eta: string;
  phone: string;
};

const AnimatedView = Animated.createAnimatedComponent(View);
const { width, height } = Dimensions.get("window");

// Simple building block component - Dark Theme
const Building = ({ 
  top, 
  left, 
  width: w, 
  height: h, 
  rotate = 0 
}: { 
  top: number; 
  left: number; 
  width: number; 
  height: number; 
  rotate?: number 
}) => (
  <View
    style={{
      position: "absolute",
      top,
      left,
      width: w,
      height: h,
      backgroundColor: "#1e293b", // Slate-800
      transform: [{ rotate: `${rotate}deg` }],
    }}
  />
);

// Street component - Dark Theme
const Street = ({ 
  top, 
  left, 
  width: w, 
  height: h, 
  rotate = 0,
  vertical = false
}: { 
  top: number; 
  left: number; 
  width: number; 
  height: number; 
  rotate?: number;
  vertical?: boolean;
}) => (
  <View
    style={{
      position: "absolute",
      top,
      left,
      width: w,
      height: h,
      backgroundColor: "#1e293b", // Slate-800
      transform: [{ rotate: `${rotate}deg` }],
    }}
  >
    {/* Street center line */}
    <View
      style={{
        position: "absolute",
        top: vertical ? 0 : "50%",
        left: vertical ? "50%" : 0,
        width: vertical ? 1 : "100%",
        height: vertical ? "100%" : 1,
        backgroundColor: "#334155", // Slate-700
        marginTop: vertical ? 0 : -0.5,
        marginLeft: vertical ? -0.5 : 0,
      }}
    />
  </View>
);

// Street label - Dark Theme
const StreetLabel = ({ 
  text, 
  top, 
  left, 
  rotate = 0 
}: { 
  text: string; 
  top: number; 
  left: number; 
  rotate?: number;
}) => (
  <View
    style={{
      position: "absolute",
      top,
      left,
      backgroundColor: "rgba(15, 23, 42, 0.8)", // Dark semi-transparent
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      transform: [{ rotate: `${rotate}deg` }],
    }}
  >
    <Text style={{ fontSize: 10, color: "#cbd5e1", fontWeight: "500" }}>
      {text}
    </Text>
  </View>
);

// Location marker component
const LocationMarker = ({ 
  color, 
  label, 
  top, 
  left 
}: { 
  color: string; 
  label?: string; 
  top: number; 
  left: number;
}) => (
  <View style={{ position: "absolute", top, left, alignItems: "center" }}>
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <MapPin size={18} color="white" />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: color,
        marginTop: -2,
      }}
    />
    {label && (
      <View
        style={{
          backgroundColor: "#1e293b", // Slate-800
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
          marginTop: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: "600", color: "#f1f5f9" }}>
          {label}
        </Text>
      </View>
    )}
  </View>
);

// Car marker component
const CarMarker = ({ top, left }: { top: number; left: number }) => (
  <View style={{ position: "absolute", top, left, alignItems: "center" }}>
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#3b82f6",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 3,
        borderColor: "#1e293b", // Dark border for contrast
      }}
    >
      <Car size={20} color="white" />
    </View>
  </View>
);

export default function TrackingScreen() {
  const router = useRouter();
  
  // Animation values
  const pulseScale = useSharedValue(1);
  const carBounce = useSharedValue(0);

  useEffect(() => {
    // User location pulse
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Car bounce animation
    carBounce.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: 1 - (pulseScale.value - 1) * 1.5,
  }));

  const carStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: carBounce.value }],
  }));

  const helper: Helper = {
    id: "1",
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
    rating: 4.9,
    service: "Professional Cleaning",
    distance: "1.2 km",
    eta: "5 min",
    phone: "+1 (555) 123-4567",
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Full Screen Map Container */}
      <View className="flex-1 relative bg-[#0f172a]">
        {/* Map Background - Dark Slate */}
        <View className="absolute inset-0 bg-[#0f172a]">
          {/* Streets - Horizontal */}
          <Street top={120} left={0} width={width} height={24} />
          <Street top={280} left={0} width={width} height={20} />
          <Street top={420} left={0} width={width} height={22} />
          <Street top={580} left={0} width={width} height={18} />
          
          {/* Streets - Vertical */}
          <Street top={0} left={60} width={18} height={height} vertical />
          <Street top={0} left={180} width={20} height={height} vertical />
          <Street top={0} left={320} width={16} height={height} vertical />
          
          {/* Diagonal streets */}
          <Street top={100} left={-50} width={400} height={20} rotate={35} />
          <Street top={350} left={200} width={300} height={18} rotate={-25} />
          
          {/* Street Labels */}
          <StreetLabel text="Main St" top={125} left={20} />
          <StreetLabel text="Oak Ave" top={285} left={width - 80} />
          <StreetLabel text="Park Rd" top={425} left={40} />
          <StreetLabel text="1st Ave" top={50} left={185} rotate={90} />
          <StreetLabel text="2nd Ave" top={200} left={325} rotate={90} />
          
          {/* Buildings */}
          <Building top={160} left={40} width={80} height={60} />
          <Building top={160} left={140} width={60} height={80} />
          <Building top={180} left={240} width={70} height={50} />
          <Building top={320} left={100} width={90} height={70} />
          <Building top={310} left={250} width={50} height={90} />
          <Building top={460} left={30} width={100} height={60} />
          <Building top={480} left={200} width={80} height={50} />
          <Building top={450} left={340} width={60} height={80} />
          <Building top={620} left={80} width={70} height={60} />
          <Building top={600} left={280} width={90} height={70} />
          
          {/* Rotated buildings for variety */}
          <Building top={380} left={150} width={50} height={40} rotate={15} />
          <Building top={520} left={130} width={60} height={50} rotate={-10} />
          
          {/* Parks/Green spaces - Dark Teal to match theme */}
          <View
            style={{
              position: "absolute",
              top: 240,
              left: width - 120,
              width: 100,
              height: 60,
              backgroundColor: "#0f766e", // Teal-800
              borderRadius: 8,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 540,
              left: 20,
              width: 80,
              height: 50,
              backgroundColor: "#0f766e", // Teal-800
              borderRadius: 8,
            }}
          />
        </View>

        {/* Top Navigation Bar */}
        <View className="absolute top-12 left-4 right-4 flex-row items-center z-20">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-card rounded-full shadow-md items-center justify-center mr-3 border border-border"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </TouchableOpacity>
          
          <View className="flex-1 bg-card/95 backdrop-blur-md shadow-md rounded-full flex-row items-center px-4 py-3 border border-border">
            <View className="flex-1">
              <Text className="text-foreground font-semibold text-sm">Tracking Sarah</Text>
              <Text className="text-muted-foreground text-xs">Arriving in 5 min</Text>
            </View>
            <View className="bg-primary px-3 py-1 rounded-full">
              <Text className="text-primary-foreground font-bold text-xs">LIVE</Text>
            </View>
          </View>
        </View>

        {/* Right Side Map Controls */}
        <View className="absolute right-4 top-1/3 gap-2 z-10">
          <TouchableOpacity className="bg-card w-11 h-11 rounded-full shadow-md items-center justify-center border border-border">
            <Plus size={22} className="text-foreground" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-card w-11 h-11 rounded-full shadow-md items-center justify-center border border-border">
            <Minus size={22} className="text-foreground" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-card w-11 h-11 rounded-full shadow-md items-center justify-center mt-2 border border-border">
            <NavigationIcon size={22} className="text-primary" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-card w-11 h-11 rounded-full shadow-md items-center justify-center border border-border">
            <Layers size={22} className="text-foreground" />
          </TouchableOpacity>
        </View>

        {/* User Location Marker (Blue Dot with pulse) */}
        <View className="absolute bottom-1/3 left-1/2 -translate-x-1/2 items-center z-0">
          <AnimatedView
            style={[
              pulseStyle,
              {
                position: "absolute",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "rgba(45, 212, 191, 0.3)", // Teal-400 with opacity
              },
            ]}
          />
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#2dd4bf", // Teal-400
              borderWidth: 3,
              borderColor: "#0f172a",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            }}
          />
        </View>

        {/* Helper Car Marker */}
        <AnimatedView
          style={[
            carStyle,
            {
              position: "absolute",
              top: 200,
              right: 100,
            },
          ]}
        >
          <CarMarker top={0} left={0} />
        </AnimatedView>

        {/* Destination Marker */}
        <LocationMarker
          color="#ef4444"
          label="Your location"
          top={height * 0.6}
          left={width * 0.5 - 18}
        />

        {/* Bottom Sheet Card */}
        <View className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl p-5 pb-8 z-30 border-t border-border">
          {/* Handle Bar */}
          <View className="w-10 h-1 bg-muted-foreground/30 rounded-full self-center mb-5" />

          {/* Helper Header */}
          <View className="flex-row items-center gap-4 mb-5">
            <Image
              source={{ uri: helper.image }}
              className="w-14 h-14 rounded-full"
            />
            <View className="flex-1">
              <Text className="text-lg font-bold text-card-foreground">{helper.name}</Text>
              <View className="flex-row items-center gap-1 mt-0.5">
                <Text className="text-yellow-500 text-sm">★</Text>
                <Text className="text-card-foreground font-medium text-sm">{helper.rating}</Text>
                <Text className="text-muted-foreground text-xs">• {helper.service}</Text>
              </View>
            </View>
            <View className="bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30">
              <Text className="text-primary font-semibold text-xs">On the way</Text>
            </View>
          </View>

          {/* ETA & Distance Row */}
          <View className="flex-row gap-3 mb-5">
            <View className="flex-1 bg-secondary/50 p-4 rounded-2xl border border-border">
              <View className="flex-row items-center gap-2 mb-1">
                <Clock size={18} className="text-primary" />
                <Text className="text-muted-foreground text-xs font-medium uppercase">Arriving</Text>
              </View>
              <Text className="text-2xl font-bold text-card-foreground">{helper.eta}</Text>
            </View>
            <View className="flex-1 bg-secondary/50 p-4 rounded-2xl border border-border">
              <View className="flex-row items-center gap-2 mb-1">
                <MapPin size={18} className="text-destructive" />
                <Text className="text-muted-foreground text-xs font-medium uppercase">Distance</Text>
              </View>
              <Text className="text-2xl font-bold text-card-foreground">{helper.distance}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-primary rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-md">
              <Phone size={20} className="text-primary-foreground" />
              <Text className="text-primary-foreground font-bold text-base">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-muted rounded-xl py-4 flex-row items-center justify-center gap-2 border border-border">
              <MessageCircle size={20} className="text-foreground" />
              <Text className="text-foreground font-bold text-base">Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}