import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, Clock, Star, ChevronRight, MapPin, Sparkles } from 'lucide-react-native';

type ServiceCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

type Helper = {
  id: string;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  distance: string;
};

export default function HomeScreen() {
  const categories: ServiceCategory[] = [
    { id: '1', name: 'Cleaning', icon: '🧹', color: 'bg-blue-100', count: 245 },
    { id: '2', name: 'Repairs', icon: '🔧', color: 'bg-orange-100', count: 189 },
    { id: '3', name: 'Moving', icon: '📦', color: 'bg-purple-100', count: 156 },
    { id: '4', name: 'Tutoring', icon: '📚', color: 'bg-green-100', count: 312 },
    { id: '5', name: 'Pet Care', icon: '🐕', color: 'bg-yellow-100', count: 98 },
    { id: '6', name: 'Gardening', icon: '🌱', color: 'bg-emerald-100', count: 134 },
  ];

  const topHelpers: Helper[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      service: 'Professional Cleaning',
      rating: 4.9,
      reviews: 234,
      price: '$35/hr',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
      distance: '1.2 km',
    },
    {
      id: '2',
      name: 'Mike Chen',
      service: 'Home Repairs',
      rating: 4.8,
      reviews: 189,
      price: '$50/hr',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      distance: '2.4 km',
    },
    {
      id: '3',
      name: 'Emily Davis',
      service: 'Pet Sitting',
      rating: 4.9,
      reviews: 156,
      price: '$25/hr',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      distance: '0.8 km',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-muted-foreground text-sm">Your location</Text>
          <View className="flex-row items-center gap-1">
            <MapPin className="text-primary" size={16} />
            <Text className="text-foreground font-semibold">San Francisco, CA</Text>
          </View>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Hero Section */}
        <View className="px-6 mb-6">
          <View className="bg-primary rounded-2xl p-6 relative overflow-hidden">
            <View className="relative z-10">
              <Text className="text-primary-foreground text-2xl font-bold mb-2">
                Get Help Now
              </Text>
              <Text className="text-primary-foreground/80 text-sm mb-4">
                Trusted helpers arrive in minutes
              </Text>
              <TouchableOpacity className="bg-primary-foreground px-4 py-3 rounded-xl flex-row items-center justify-center gap-2">
                <Sparkles className="text-primary" size={18} />
                <Text className="text-primary font-semibold">Book a Helper</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6 mb-6">
          <View className="bg-card border border-border rounded-xl px-4 py-3 flex-row items-center gap-3">
            <Search className="text-muted-foreground" size={20} />
            <Text className="text-muted-foreground flex-1">Search services...</Text>
          </View>
        </View>

        {/* Service Categories */}
        <View className="mb-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-foreground">Services</Text>
            <TouchableOpacity>
              <Text className="text-primary text-sm font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} className="items-center">
                <View className={`${category.color} w-16 h-16 rounded-2xl items-center justify-center mb-2`}>
                  <Text className="text-2xl">{category.icon}</Text>
                </View>
                <Text className="text-foreground text-xs font-medium">{category.name}</Text>
                <Text className="text-muted-foreground text-xs">{category.count}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Helpers */}
        <View className="mb-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-foreground">Top Helpers Near You</Text>
            <TouchableOpacity>
              <Text className="text-primary text-sm font-medium">See all</Text>
            </TouchableOpacity>
          </View>
          <View className="px-6 gap-4">
            {topHelpers.map((helper) => (
              <TouchableOpacity key={helper.id} className="bg-card rounded-xl p-4 border border-border">
                <View className="flex-row gap-4">
                  <Image
                    source={{ uri: helper.image }}
                    className="w-16 h-16 rounded-xl"
                  />
                  <View className="flex-1">
                    <Text className="text-foreground font-semibold">{helper.name}</Text>
                    <Text className="text-muted-foreground text-sm mb-1">{helper.service}</Text>
                    <View className="flex-row items-center gap-2">
                      <View className="flex-row items-center gap-1">
                        <Star className="text-yellow-500" size={14} fill="#eab308" />
                        <Text className="text-foreground text-sm font-medium">{helper.rating}</Text>
                      </View>
                      <Text className="text-muted-foreground text-xs">({helper.reviews} reviews)</Text>
                    </View>
                  </View>
                  <View className="items-end justify-between">
                    <Text className="text-primary font-bold">{helper.price}</Text>
                    <View className="flex-row items-center gap-1">
                      <MapPin className="text-muted-foreground" size={12} />
                      <Text className="text-muted-foreground text-xs">{helper.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Quick Actions</Text>
          <View className="grid grid-cols-2 gap-4">
            <TouchableOpacity className="bg-card rounded-xl p-4 border border-border">
              <View className="bg-primary/10 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Clock className="text-primary" size={20} />
              </View>
              <Text className="text-foreground font-semibold mb-1">Schedule Later</Text>
              <Text className="text-muted-foreground text-xs">Book for a future date</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-card rounded-xl p-4 border border-border">
              <View className="bg-primary/10 w-10 h-10 rounded-lg items-center justify-center mb-3">
                <Star className="text-primary" size={20} />
              </View>
              <Text className="text-foreground font-semibold mb-1">Favorites</Text>
              <Text className="text-muted-foreground text-xs">Your saved helpers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}