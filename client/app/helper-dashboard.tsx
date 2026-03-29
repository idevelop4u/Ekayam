import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DollarSign,
  Briefcase,
  Star,
  MapPin,
  Clock,
  Check,
  ToggleRight,
  ToggleLeft,
  Phone,
  Navigation,
  MoreVertical,
} from "lucide-react-native";
import { useRouter } from "expo-router";

type Task = {
  id: string;
  title: string;
  category: string;
  pay: number;
  distance: string;
  duration: string;
  clientName: string;
  clientRating: number;
  address: string;
};

type Assignment = {
  id: string;
  task: Task;
  status: "in_progress" | "on_way" | "arrived";
  eta: string;
};

type Stats = {
  earnings: number;
  tasksCompleted: number;
  rating: number;
  hoursThisWeek: number;
};

export default function HelperDashboard() {
  const router = useRouter();
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<"available" | "assignments">(
    "available"
  );

  // Mock data
  const stats: Stats = {
    earnings: 485.5,
    tasksCompleted: 32,
    rating: 4.9,
    hoursThisWeek: 28,
  };

  const availableTasks: Task[] = [
    {
      id: "1",
      title: "Furniture Assembly",
      category: "Assembly",
      pay: 45,
      distance: "2.3 km",
      duration: "1.5 hrs",
      clientName: "Sarah Johnson",
      clientRating: 4.8,
      address: "123 Oak Street, Apt 4B",
    },
    {
      id: "2",
      title: "Plumbing Repair",
      category: "Plumbing",
      pay: 65,
      distance: "3.8 km",
      duration: "2 hrs",
      clientName: "Mike Chen",
      clientRating: 4.9,
      address: "456 Maple Ave, House 12",
    },
    {
      id: "3",
      title: "Moving Assistance",
      category: "Moving",
      pay: 80,
      distance: "1.5 km",
      duration: "3 hrs",
      clientName: "Emily Davis",
      clientRating: 4.7,
      address: "789 Pine Road, Unit 3",
    },
  ];

  const currentAssignment: Assignment | null = {
    id: "assign-1",
    task: {
      id: "4",
      title: "Electrical Installation",
      category: "Electrical",
      pay: 75,
      distance: "0.8 km",
      duration: "2 hrs",
      clientName: "Robert Wilson",
      clientRating: 5.0,
      address: "321 Cedar Lane",
    },
    status: "on_way",
    eta: "8 mins",
  };

  const handleAcceptTask = (task: Task) => {
    Alert.alert(
      "Accept Task",
      `Are you sure you want to accept "${task.title}" for $${task.pay}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: () => {
            Alert.alert("Success", "Task accepted! Navigate to the location.");
          },
        },
      ]
    );
  };

  const handleStatusToggle = () => {
    setIsAvailable(!isAvailable);
    Alert.alert(
      "Status Updated",
      `You are now ${!isAvailable ? "unavailable" : "available"} for new tasks.`
    );
  };

  const renderStatCard = (
    icon: React.ReactNode,
    value: string,
    label: string
  ) => (
    <View className="flex-1 bg-card rounded-2xl p-4 border border-border">
      <View className="items-center">
        {icon}
        <Text className="text-2xl font-bold text-foreground mt-2">{value}</Text>
        <Text className="text-sm text-muted-foreground mt-1">{label}</Text>
      </View>
    </View>
  );

  const renderTaskCard = (task: Task, isAssignment = false) => (
    <View
      key={task.id}
      className="bg-card rounded-2xl p-5 border border-border mb-4"
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-xs font-semibold text-primary mb-1">
            {task.category}
          </Text>
          <Text className="text-lg font-bold text-foreground">
            {task.title}
          </Text>
        </View>
        <View className="bg-primary/10 px-3 py-1 rounded-full">
          <Text className="text-sm font-bold text-primary">${task.pay}</Text>
        </View>
      </View>

      {/* Client Info */}
      <View className="flex-row items-center gap-2 mb-3">
        <View className="w-8 h-8 bg-muted rounded-full items-center justify-center">
          <Text className="text-sm font-bold text-foreground">
            {task.clientName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-foreground">
            {task.clientName}
          </Text>
          <View className="flex-row items-center gap-1">
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-xs text-muted-foreground">
              {task.clientRating}
            </Text>
          </View>
        </View>
      </View>

      {/* Details */}
      <View className="flex-row gap-4 mb-4">
        <View className="flex-row items-center gap-1.5 flex-1">
          <MapPin size={16} className="text-muted-foreground" />
          <Text className="text-sm text-muted-foreground">{task.distance}</Text>
        </View>
        <View className="flex-row items-center gap-1.5 flex-1">
          <Clock size={16} className="text-muted-foreground" />
          <Text className="text-sm text-muted-foreground">{task.duration}</Text>
        </View>
      </View>

      {/* Address */}
      <View className="bg-muted/50 rounded-lg p-3 mb-4">
        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
          {task.address}
        </Text>
      </View>

      {/* Actions */}
      {isAssignment ? (
        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-secondary rounded-xl py-3 flex-row items-center justify-center">
            <Phone size={18} className="text-secondary-foreground mr-2" />
            <Text className="font-semibold text-secondary-foreground">
              Call Client
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center">
            <Navigation size={18} className="text-primary-foreground mr-2" />
            <Text className="font-semibold text-primary-foreground">
              Navigate
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => handleAcceptTask(task)}
          className="bg-primary rounded-xl py-3.5 flex-row items-center justify-center"
        >
          <Check size={20} className="text-primary-foreground mr-2" />
          <Text className="font-semibold text-primary-foreground">
            Accept Task
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-muted-foreground text-base">
                Good morning,
              </Text>
              <Text className="text-2xl font-bold text-foreground">
                John Helper
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleStatusToggle}
              className="bg-card border border-border rounded-full p-2"
            >
              {isAvailable ? (
                <ToggleRight size={24} className="text-primary" />
              ) : (
                <ToggleLeft size={24} className="text-muted-foreground" />
              )}
            </TouchableOpacity>
          </View>

          {/* Availability Status */}
          <View
            className={`mt-4 rounded-xl p-3 flex-row items-center gap-3 ${
              isAvailable ? "bg-primary/10" : "bg-muted"
            }`}
          >
            <View
              className={`w-3 h-3 rounded-full ${isAvailable ? "bg-primary" : "bg-muted-foreground"}`}
            />
            <Text
              className={`text-sm font-medium ${
                isAvailable ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isAvailable
                ? "You are available for new tasks"
                : "You are currently unavailable"}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3">
            {renderStatCard(
              <DollarSign size={24} className="text-primary" />,
              `$${stats.earnings}`,
              "This Week"
            )}
            {renderStatCard(
              <Briefcase size={24} className="text-primary" />,
              stats.tasksCompleted.toString(),
              "Completed"
            )}
            {renderStatCard(
              <Star size={24} className="text-primary" />,
              stats.rating.toFixed(1),
              "Rating"
            )}
          </View>
        </View>

        {/* Current Assignment (if any) */}
        {currentAssignment && (
          <View className="px-6 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold text-foreground">
                Current Assignment
              </Text>
              <TouchableOpacity>
                <MoreVertical size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>

            <View className="bg-card rounded-2xl p-5 border-border">
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-sm font-semibold text-primary mb-1">
                    {currentAssignment.task.category}
                  </Text>
                  <Text className="text-lg font-bold text-foreground">
                    {currentAssignment.task.title}
                  </Text>
                </View>
                <View className="bg-accent px-3 py-1 rounded-full">
                  <Text className="text-xs font-bold text-accent-foreground uppercase">
                    {currentAssignment.status.replace("_", " ")}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2 mb-3">
                <Clock size={16} className="text-muted-foreground" />
                <Text className="text-sm text-muted-foreground">
                  ETA: {currentAssignment.eta}
                </Text>
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-secondary rounded-xl py-3 flex-row items-center justify-center">
                  <Phone size={18} className="text-secondary-foreground mr-2" />
                  <Text className="font-semibold text-secondary-foreground">
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/tracking")}
                  className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center"
                >
                  <Navigation
                    size={18}
                    className="text-primary-foreground mr-2"
                  />
                  <Text className="font-semibold text-primary-foreground">
                    Track
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View className="px-6 mb-4">
          <View className="flex-row bg-muted rounded-xl p-1">
            <TouchableOpacity
              onPress={() => setActiveTab("available")}
              className={`flex-1 py-2.5 rounded-lg ${
                activeTab === "available" ? "bg-background shadow-sm" : ""
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "available"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Available Tasks ({availableTasks.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("assignments")}
              className={`flex-1 py-2.5 rounded-lg ${
                activeTab === "assignments" ? "bg-background shadow-sm" : ""
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  activeTab === "assignments"
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                My Assignments
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on tab */}
        <View className="px-6">
          {activeTab === "available" ? (
            <>
              {availableTasks.length > 0 ? (
                availableTasks.map((task) => renderTaskCard(task))
              ) : (
                <View className="items-center py-12">
                  <Briefcase size={48} className="text-muted-foreground mb-4" />
                  <Text className="text-lg font-semibold text-foreground mb-2">
                    No Available Tasks
                  </Text>
                  <Text className="text-muted-foreground text-center">
                    Check back later for new opportunities
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="items-center py-12">
              <Briefcase size={48} className="text-muted-foreground mb-4" />
              <Text className="text-lg font-semibold text-foreground mb-2">
                No Active Assignments
              </Text>
              <Text className="text-muted-foreground text-center">
                Your completed assignments will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}