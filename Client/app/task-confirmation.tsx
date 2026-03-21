import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  ChevronRight,
  CheckCircle,
  User,
  DollarSign,
  Info,
  Shield,
} from "lucide-react-native";

type TaskDetails = {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  address: string;
};

type HelperInfo = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  hourlyRate: number;
};

type CostBreakdown = {
  serviceCost: number;
  serviceFee: number;
  total: number;
};

export default function TaskConfirmation() {
  const router = useRouter();

  // Mock Data - In a real app, this would come from route params or global state
  const task: TaskDetails = {
    id: "task-123",
    title: "Kitchen Sink Repair",
    category: "Plumbing",
    description:
      "The kitchen sink is leaking from the drain pipe. Need replacement of the P-trap and possibly new washers.",
    date: "Today, Nov 15",
    time: "2:00 PM",
    duration: "2 hours",
    address: "123 Maple Avenue, Apt 4B, San Francisco, CA",
  };

  const helper: HelperInfo = {
    id: "1",
    name: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 4.9,
    hourlyRate: 45,
  };

  const cost: CostBreakdown = {
    serviceCost: 90, // 2 hours * $45
    serviceFee: 5.0,
    total: 95.0,
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      "Booking Confirmed!",
      "Your helper has been notified and will arrive at the scheduled time.",
      [
        {
          text: "View Bookings",
          onPress: () => router.replace("/(tabs)"),
          style: "default",
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-foreground">
            Confirm Booking
          </Text>
          <Text className="text-muted-foreground mt-1">
            Review your task details before confirming
          </Text>
        </View>

        {/* Task Details Card */}
        <View className="px-6 mb-4">
          <View className="bg-card rounded-2xl p-5 border border-border">
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1">
                <View className="bg-primary/10 self-start px-3 py-1 rounded-full mb-2">
                  <Text className="text-xs font-semibold text-primary">
                    {task.category}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-foreground">
                  {task.title}
                </Text>
              </View>
            </View>

            <Text className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {task.description}
            </Text>

            <View className="space-y-3">
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Calendar size={16} className="text-primary" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-foreground">
                    {task.date}
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {task.time}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </View>
                <View>
                  <Text className="text-sm font-semibold text-foreground">
                    Duration
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    {task.duration}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    Location
                  </Text>
                  <Text
                    className="text-xs text-muted-foreground"
                    numberOfLines={2}
                  >
                    {task.address}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Helper Info Card */}
        <View className="px-6 mb-4">
          <View className="bg-card rounded-2xl p-4 border border-border">
            <Text className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Assigned Helper
            </Text>

            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-full bg-primary/20 overflow-hidden border-2 border-card">
                <View className="w-full h-full bg-primary/10 items-center justify-center">
                  <Text className="text-xl font-bold text-primary">
                    {helper.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
              </View>

              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-bold text-foreground">
                    {helper.name}
                  </Text>
                  <CheckCircle
                    size={16}
                    className="text-green-500"
                    fill="#22c55e"
                  />
                </View>
                <View className="flex-row items-center gap-3 mt-1">
                  <Text className="text-sm text-muted-foreground">
                    <Text className="text-foreground font-semibold">
                      {helper.rating}
                    </Text>{" "}
                    ★
                  </Text>
                  <Text className="text-sm text-primary font-semibold">
                    ${helper.hourlyRate}/hr
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push(`/helper-detail?id=${helper.id}`)}
              >
                <ChevronRight size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Cost Breakdown Card */}
        <View className="px-6 mb-4">
          <View className="bg-card rounded-2xl p-5 border border-border">
            <Text className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Payment Summary
            </Text>

            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-muted-foreground">
                  Service Cost ({task.duration})
                </Text>
                <Text className="text-sm font-semibold text-foreground">
                  ${cost.serviceCost.toFixed(2)}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-muted-foreground">
                    Service Fee
                  </Text>
                  <Info size={14} className="text-muted-foreground" />
                </View>
                <Text className="text-sm font-semibold text-foreground">
                  ${cost.serviceFee.toFixed(2)}
                </Text>
              </View>

              <View className="h-px bg-border my-2" />

              <View className="flex-row justify-between items-center">
                <Text className="text-base font-bold text-foreground">
                  Total
                </Text>
                <Text className="text-xl font-bold text-primary">
                  ${cost.total.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className="px-6 mb-4">
          <TouchableOpacity className="bg-card rounded-2xl p-4 border border-border flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <CreditCard size={20} className="text-foreground" />
              </View>
              <View>
                <Text className="text-sm font-semibold text-foreground">
                  Visa ending in 4242
                </Text>
                <Text className="text-xs text-muted-foreground">
                  Expires 12/25
                </Text>
              </View>
            </View>
            <ChevronRight size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Secure Payment Notice */}
        <View className="px-6 mb-4">
          <View className="flex-row items-center justify-center gap-2">
            <Shield size={16} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">
              Secure payment powered by Stripe
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 pb-8">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-sm text-muted-foreground">Total Amount</Text>
            <Text className="text-2xl font-bold text-foreground">
              ${cost.total.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleConfirmBooking}
          className="bg-primary rounded-xl py-4 flex-row items-center justify-center shadow-sm"
        >
          <CheckCircle size={20} className="text-primary-foreground mr-2" />
          <Text className="text-base font-bold text-primary-foreground">
            Confirm Booking
          </Text>
        </TouchableOpacity>

        <Text className="text-xs text-center text-muted-foreground mt-3">
          By confirming, you agree to our Terms of Service
        </Text>
      </View>
    </SafeAreaView>
  );
}
