import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Calendar, Clock, MapPin, Star, X, ChevronRight, MoreHorizontal } from 'lucide-react-native';

type BookingStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

type Helper = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
};

type Booking = {
  id: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  helper: Helper;
  price: string;
  address: string;
};

const mockBookings: Booking[] = [
  {
    id: '1',
    service: 'Home Cleaning',
    date: 'Today, Dec 15',
    time: '2:00 PM - 4:00 PM',
    status: 'in-progress',
    helper: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
      rating: 4.9,
    },
    price: '$70.00',
    address: '123 Market St, San Francisco',
  },
  {
    id: '2',
    service: 'Furniture Assembly',
    date: 'Tomorrow, Dec 16',
    time: '10:00 AM - 12:00 PM',
    status: 'pending',
    helper: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
      rating: 4.8,
    },
    price: '$50.00',
    address: '456 Oak Ave, San Francisco',
  },
  {
    id: '3',
    service: 'Pet Sitting',
    date: 'Dec 10, 2024',
    time: '9:00 AM - 5:00 PM',
    status: 'completed',
    helper: {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60',
      rating: 4.9,
    },
    price: '$45.00',
    address: '789 Pine St, San Francisco',
  },
  {
    id: '4',
    service: 'Gardening',
    date: 'Dec 5, 2024',
    time: '8:00 AM - 11:00 AM',
    status: 'completed',
    helper: {
      id: '4',
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
      rating: 4.7,
    },
    price: '$85.00',
    address: '321 Elm St, San Francisco',
  },
];

type TabType = 'current' | 'past';

const getStatusConfig = (status: BookingStatus) => {
  switch (status) {
    case 'pending':
      return {
        label: 'Pending',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-700',
      };
    case 'in-progress':
      return {
        label: 'In Progress',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      };
    case 'completed':
      return {
        label: 'Completed',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
      };
  }
};

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('current');

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === 'current') {
      return booking.status === 'pending' || booking.status === 'in-progress';
    }
    return booking.status === 'completed' || booking.status === 'cancelled';
  });

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? This action cannot be undone.',
      [
        { text: 'No, keep it', style: 'cancel' },
        { 
          text: 'Yes, cancel', 
          style: 'destructive',
          onPress: () => {
            console.log('Cancelled booking:', bookingId);
            // In a real app, update the booking status here
          }
        },
      ]
    );
  };

  const handleReschedule = (bookingId: string) => {
    Alert.alert(
      'Reschedule Booking',
      'Select a new date and time for your booking.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Select Date', onPress: () => console.log('Open date picker') },
      ]
    );
  };

  const renderBookingCard = ({ item }: { item: Booking }) => {
    const statusConfig = getStatusConfig(item.status);
    const isActive = item.status === 'pending' || item.status === 'in-progress';

    return (
      <View className="bg-card rounded-2xl p-4 border border-border mb-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-lg font-semibold text-foreground">{item.service}</Text>
              <View className={`${statusConfig.bgColor} px-2 py-0.5 rounded-full`}>
                <Text className={`${statusConfig.textColor} text-xs font-semibold`}>
                  {statusConfig.label}
                </Text>
              </View>
            </View>
            <Text className="text-muted-foreground text-sm">{item.price}</Text>
          </View>
          <TouchableOpacity className="p-1">
            <MoreHorizontal size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Helper Info */}
        <View className="flex-row items-center gap-3 mb-4 pb-4 border-b border-border">
          <Image
            source={{ uri: item.helper.avatar }}
            className="w-12 h-12 rounded-full"
          />
          <View className="flex-1">
            <Text className="text-foreground font-semibold">{item.helper.name}</Text>
            <View className="flex-row items-center gap-1">
              <Star size={14} className="text-yellow-500" fill="#eab308" />
              <Text className="text-foreground text-sm font-medium">{item.helper.rating}</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-secondary px-3 py-1.5 rounded-lg">
            <Text className="text-secondary-foreground text-xs font-semibold">View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View className="space-y-2 mb-4">
          <View className="flex-row items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <Text className="text-foreground text-sm">{item.date}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <Text className="text-foreground text-sm">{item.time}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <Text className="text-foreground text-sm flex-1" numberOfLines={1}>{item.address}</Text>
          </View>
        </View>

        {/* Actions */}
        {isActive && (
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleReschedule(item.id)}
              className="flex-1 bg-secondary py-2.5 rounded-xl flex-row items-center justify-center gap-2"
            >
              <Calendar size={16} className="text-secondary-foreground" />
              <Text className="text-secondary-foreground font-semibold text-sm">Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCancelBooking(item.id)}
              className="flex-1 bg-destructive/10 py-2.5 rounded-xl flex-row items-center justify-center gap-2"
            >
              <X size={16} className="text-destructive" />
              <Text className="text-destructive font-semibold text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isActive && item.status === 'completed' && (
          <TouchableOpacity className="w-full bg-primary py-2.5 rounded-xl flex-row items-center justify-center gap-2">
            <Text className="text-primary-foreground font-semibold text-sm">Book Again</Text>
            <ChevronRight size={16} className="text-primary-foreground" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-bold text-foreground">My Bookings</Text>
        <ThemeToggle />
      </View>

      {/* Tabs */}
      <View className="px-6 mb-4">
        <View className="bg-muted p-1 rounded-xl flex-row">
          <TouchableOpacity
            onPress={() => setActiveTab('current')}
            className={`flex-1 py-2.5 rounded-lg items-center ${
              activeTab === 'current' ? 'bg-background shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === 'current' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('past')}
            className={`flex-1 py-2.5 rounded-lg items-center ${
              activeTab === 'past' ? 'bg-background shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === 'past' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 128 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Calendar size={48} className="text-muted-foreground mb-4" />
            <Text className="text-xl font-semibold text-foreground mb-2">No Bookings</Text>
            <Text className="text-muted-foreground text-center px-8">
              {activeTab === 'current'
                ? "You don't have any upcoming bookings."
                : "You haven't completed any bookings yet."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}