import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Slider,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Sliders,
  MapPin,
  Star,
  DollarSign,
  ChevronDown,
  Clock,
  Award,
  Filter,
  X,
  Briefcase,
  CheckCircle2,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

type Helper = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  category: string;
  hourlyRate: number;
  distance: number;
  completedTasks: number;
  verified: boolean;
  specialties: string[];
  availability: "available" | "busy" | "offline";
  responseTime: string;
};

export default function HelperList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(10);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 100]);
  const [sortBy, setSortBy] = useState<
    "rating" | "price_low" | "price_high" | "distance" | "reviews"
  >("rating");

  const categories = [
    "All",
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Moving",
    "Assembly",
    "Gardening",
  ];

  const sortOptions = [
    { key: "rating", label: "Highest Rated" },
    { key: "reviews", label: "Most Reviews" },
    { key: "price_low", label: "Price: Low to High" },
    { key: "price_high", label: "Price: High to Low" },
    { key: "distance", label: "Nearest First" },
  ];

  const helpers: Helper[] = [
    {
      id: "1",
      name: "Michael Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 4.9,
      reviews: 127,
      category: "Plumbing",
      hourlyRate: 45,
      distance: 1.2,
      completedTasks: 234,
      verified: true,
      specialties: ["Pipe Repair", "Installation", "Emergency"],
      availability: "available",
      responseTime: "5 min",
    },
    {
      id: "2",
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      rating: 4.8,
      reviews: 89,
      category: "Cleaning",
      hourlyRate: 35,
      distance: 2.5,
      completedTasks: 156,
      verified: true,
      specialties: ["Deep Clean", "Organizing", "Move-out"],
      availability: "available",
      responseTime: "8 min",
    },
    {
      id: "3",
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      rating: 4.7,
      reviews: 203,
      category: "Electrical",
      hourlyRate: 55,
      distance: 3.1,
      completedTasks: 312,
      verified: true,
      specialties: ["Wiring", "Repairs", "Installation"],
      availability: "busy",
      responseTime: "12 min",
    },
    {
      id: "4",
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      rating: 4.9,
      reviews: 156,
      category: "Moving",
      hourlyRate: 50,
      distance: 4.2,
      completedTasks: 189,
      verified: false,
      specialties: ["Heavy Lifting", "Packing", "Furniture"],
      availability: "available",
      responseTime: "10 min",
    },
    {
      id: "5",
      name: "James Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      rating: 4.6,
      reviews: 78,
      category: "Assembly",
      hourlyRate: 40,
      distance: 1.8,
      completedTasks: 98,
      verified: true,
      specialties: ["Furniture", "IKEA", "Custom"],
      availability: "available",
      responseTime: "15 min",
    },
    {
      id: "6",
      name: "Lisa Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
      rating: 4.8,
      reviews: 112,
      category: "Gardening",
      hourlyRate: 38,
      distance: 5.5,
      completedTasks: 145,
      verified: true,
      specialties: ["Lawn Care", "Plants", "Landscaping"],
      availability: "offline",
      responseTime: "20 min",
    },
  ];

  const filteredHelpers = helpers
    .filter((helper) => {
      const matchesSearch =
        helper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        helper.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || helper.category === selectedCategory;
      const matchesRating = helper.rating >= selectedRating;
      const matchesDistance = helper.distance <= maxDistance;
      const matchesPrice =
        helper.hourlyRate >= priceRange[0] &&
        helper.hourlyRate <= priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesDistance &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "price_low":
          return a.hourlyRate - b.hourlyRate;
        case "price_high":
          return b.hourlyRate - a.hourlyRate;
        case "distance":
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

  const renderHelperCard = (helper: Helper) => (
    <TouchableOpacity
      key={helper.id}
      onPress={() => router.push(`/helper-detail?id=${helper.id}`)}
      className="bg-card rounded-2xl overflow-hidden border border-border mb-4 shadow-sm"
      activeOpacity={0.7}
    >
      {/* Top Section with Gradient */}
      <View className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <View className="bg-primary/20 px-2 py-1 rounded-lg">
              <Text className="text-xs font-semibold text-primary">
                {helper.category}
              </Text>
            </View>
            {helper.verified && (
              <View className="flex-row items-center gap-1 bg-green-500/10 px-2 py-1 rounded-lg">
                <CheckCircle2 size={12} className="text-green-600" />
                <Text className="text-xs font-semibold text-green-600">
                  Verified
                </Text>
              </View>
            )}
          </View>
          <View className="flex-row items-center gap-1">
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-sm font-bold text-foreground">
              {helper.rating}
            </Text>
            <Text className="text-xs text-muted-foreground">
              ({helper.reviews})
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="p-4">
        <View className="flex-row items-start gap-3 mb-3">
          <View className="relative">
            <View className="w-16 h-16 rounded-full bg-muted overflow-hidden border-2 border-card">
              <View className="w-full h-full bg-primary/20 items-center justify-center">
                <Text className="text-xl font-bold text-primary">
                  {helper.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Text>
              </View>
            </View>
            {helper.availability === "available" && (
              <View className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-card">
                <View className="w-2 h-2 bg-white rounded-full" />
              </View>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground mb-1">
              {helper.name}
            </Text>
            <View className="flex-row items-center gap-2 mb-2">
              <View className="flex-row items-center gap-1">
                <Briefcase size={14} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">
                  {helper.completedTasks} tasks
                </Text>
              </View>
              <View className="w-1 h-1 rounded-full bg-muted-foreground" />
              <View className="flex-row items-center gap-1">
                <Clock size={14} className="text-muted-foreground" />
                <Text className="text-xs text-muted-foreground">
                  {helper.responseTime} response
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Specialties */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {helper.specialties.slice(0, 3).map((specialty, index) => (
            <View
              key={index}
              className="bg-muted/70 px-3 py-1.5 rounded-full border border-border"
            >
              <Text className="text-xs text-muted-foreground font-medium">
                {specialty}
              </Text>
            </View>
          ))}
        </View>

        {/* Stats Row */}
        <View className="flex-row items-center justify-between pt-3 border-t border-border">
          <View className="flex-row items-center gap-1.5">
            <MapPin size={16} className="text-primary" />
            <Text className="text-sm font-semibold text-foreground">
              {helper.distance} km
            </Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <DollarSign size={16} className="text-primary" />
            <Text className="text-lg font-bold text-primary">
              ${helper.hourlyRate}
              <Text className="text-sm text-muted-foreground font-normal">
                /hr
              </Text>
            </Text>
          </View>

          <View
            className={`px-3 py-1.5 rounded-full border ${
              helper.availability === "available"
                ? "bg-green-500/10 border-green-500/20"
                : helper.availability === "busy"
                  ? "bg-orange-500/10 border-orange-500/20"
                  : "bg-gray-500/10 border-gray-500/20"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                helper.availability === "available"
                  ? "text-green-600"
                  : helper.availability === "busy"
                    ? "text-orange-600"
                    : "text-gray-600"
              }`}
            >
              {helper.availability === "available"
                ? "Available Now"
                : helper.availability === "busy"
                  ? "Busy"
                  : "Offline"}
            </Text>
          </View>
        </View>
      </View>

      {/* Book CTA */}
      <View className="px-4 pb-4">
        <View className="flex-row items-center justify-between bg-muted/30 rounded-xl px-4 py-3">
          <Text className="text-sm text-muted-foreground">
            Tap to view details & book
          </Text>
          <ChevronRight size={18} className="text-primary" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSelectedRating(0);
    setMaxDistance(10);
    setPriceRange([20, 100]);
    setSearchQuery("");
    setSortBy("rating");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedRating > 0 ||
    maxDistance < 10 ||
    priceRange[0] > 20 ||
    priceRange[1] < 100 ||
    sortBy !== "rating";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="px-6 pt-6 pb-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Find Helpers
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center gap-3">
          <View className="flex-1 bg-card border border-border rounded-xl px-4 py-3 flex-row items-center gap-3">
            <Search size={20} className="text-muted-foreground" />
            <TextInput
              placeholder="Search helpers or services..."
              placeholderTextColor="#a8a29e"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-foreground text-base"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <X size={20} className="text-muted-foreground" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              showFilters ? "bg-primary" : "bg-card border border-border"
            }`}
          >
            <Sliders
              size={20}
              className={
                showFilters ? "text-primary-foreground" : "text-foreground"
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View className="px-6 mb-4">
          <View className="bg-card rounded-2xl p-4 border border-border">
            {/* Category Filter */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-foreground mb-3">
                Service Type
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`px-4 py-2.5 rounded-full border ${
                      selectedCategory === category
                        ? "bg-primary border-primary"
                        : "bg-card border-border"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        selectedCategory === category
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Rating Filter */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-foreground mb-3">
                Minimum Rating
              </Text>
              <View className="flex-row gap-2">
                {[0, 4.0, 4.5, 4.7].map((rating) => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => setSelectedRating(rating)}
                    className={`flex-1 py-2.5 rounded-xl border ${
                      selectedRating === rating
                        ? "bg-primary border-primary"
                        : "bg-card border-border"
                    }`}
                  >
                    <Text
                      className={`text-center text-sm font-medium ${
                        selectedRating === rating
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {rating === 0 ? "All" : `${rating}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Distance Filter */}
            <View className="mb-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-semibold text-foreground">
                  Max Distance
                </Text>
                <Text className="text-sm font-bold text-primary">
                  {maxDistance} km
                </Text>
              </View>
              <View className="bg-muted rounded-xl p-4">
                <Slider
                  style={{ width: "100%", height: 40 }}
                  minimumValue={1}
                  maximumValue={10}
                  step={0.5}
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  minimumTrackTintColor="#0d9588"
                  maximumTrackTintColor="#e2e8f0"
                  thumbTintColor="#0d9588"
                />
              </View>
            </View>

            {/* Price Range Filter */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-foreground mb-3">
                Price Range ($/hr)
              </Text>
              <View className="flex-row gap-3 items-center">
                <View className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5">
                  <Text className="text-xs text-muted-foreground mb-1">
                    Min
                  </Text>
                  <Text className="text-base font-bold text-foreground">
                    ${priceRange[0]}
                  </Text>
                </View>
                <Text className="text-muted-foreground">-</Text>
                <View className="flex-1 bg-card border border-border rounded-xl px-3 py-2.5">
                  <Text className="text-xs text-muted-foreground mb-1">
                    Max
                  </Text>
                  <Text className="text-base font-bold text-foreground">
                    ${priceRange[1]}
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-2 mt-3">
                {[20, 50, 75, 100].map((price) => (
                  <TouchableOpacity
                    key={price}
                    onPress={() => setPriceRange([20, price])}
                    className={`flex-1 py-2 rounded-lg ${
                      priceRange[1] === price
                        ? "bg-primary/10 border border-primary"
                        : "bg-muted/50 border border-transparent"
                    }`}
                  >
                    <Text
                      className={`text-center text-xs font-medium ${
                        priceRange[1] === price
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Up to ${price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Sort By */}
            <View>
              <Text className="text-sm font-semibold text-foreground mb-3">
                Sort By
              </Text>
              <View className="flex-row gap-2 flex-wrap">
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    onPress={() => setSortBy(option.key as any)}
                    className={`px-4 py-2 rounded-xl border ${
                      sortBy === option.key
                        ? "bg-primary border-primary"
                        : "bg-card border-border"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        sortBy === option.key
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Results Count & Clear */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-muted-foreground">
            <Text className="font-semibold text-foreground">
              {filteredHelpers.length}
            </Text>{" "}
            helper{filteredHelpers.length !== 1 ? "s" : ""} found
          </Text>
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={clearAllFilters}
              className="flex-row items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full"
            >
              <X size={14} className="text-primary" />
              <Text className="text-sm font-semibold text-primary">
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Helpers List */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredHelpers.length > 0 ? (
          filteredHelpers.map((helper) => renderHelperCard(helper))
        ) : (
          <View className="items-center py-16">
            <View className="w-20 h-20 bg-muted rounded-full items-center justify-center mb-4">
              <Search size={32} className="text-muted-foreground" />
            </View>
            <Text className="text-lg font-bold text-foreground mb-2">
              No Helpers Found
            </Text>
            <Text className="text-muted-foreground text-center mb-6 px-8">
              Try adjusting your filters or search terms to find the perfect
              helper
            </Text>
            <TouchableOpacity
              onPress={clearAllFilters}
              className="bg-primary px-6 py-3 rounded-xl flex-row items-center gap-2"
            >
              <X size={18} className="text-primary-foreground" />
              <Text className="font-semibold text-primary-foreground">
                Clear All Filters
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
