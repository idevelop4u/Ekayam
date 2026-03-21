import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  CreditCard, 
  ChevronRight, 
  Check, 
  Star, 
  User, 
  DollarSign,
  Receipt,
  Shield
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

type HelperInfo = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
};

type PaymentMethod = {
  type: string;
  last4: string;
  expiry: string;
};

export default function PaymentTipScreen() {
  const router = useRouter();
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState('');

  // Mock Data
  const helper: HelperInfo = {
    id: '1',
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
  };

  const paymentMethod: PaymentMethod = {
    type: 'Visa',
    last4: '4242',
    expiry: '12/25',
  };

  const serviceCost = 90.00;
  const helperFee = 5.00;
  const taxRate = 0.085; // 8.5%
  const tax = serviceCost * taxRate;
  const subtotal = serviceCost + helperFee + tax;
  
  const tipAmount = selectedTip !== null 
    ? (selectedTip === -1 ? parseFloat(customTip) || 0 : subtotal * (selectedTip / 100))
    : 0;
  
  const total = subtotal + tipAmount;

  const handleTipSelect = (percent: number) => {
    setSelectedTip(percent);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setSelectedTip(-1);
  };

  const handlePay = () => {
    Alert.alert(
      'Payment Successful!',
      `Your payment of $${total.toFixed(2)} has been processed.`,
      [
        {
          text: 'Done',
          onPress: () => router.replace('/(tabs)'),
          style: 'default',
        },
      ]
    );
  };

  const TipButton = ({ percent, label }: { percent: number; label: string }) => {
    const isSelected = selectedTip === percent;
    return (
      <TouchableOpacity
        onPress={() => handleTipSelect(percent)}
        className={`flex-1 py-3 rounded-xl border-2 items-center justify-center ${
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-border bg-card'
        }`}
      >
        <Text className={`text-lg font-bold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          {/* Header */}
          <View className="px-6 pt-6 pb-4">
            <Text className="text-2xl font-bold text-foreground">Payment & Tip</Text>
            <Text className="text-muted-foreground mt-1">Complete your payment for the service</Text>
          </View>

          {/* Helper Summary */}
          <View className="px-6 mb-4">
            <View className="bg-card rounded-2xl p-4 border border-border flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-full bg-primary/20 overflow-hidden border-2 border-card">
                <View className="w-full h-full bg-primary/10 items-center justify-center">
                  <Text className="text-xl font-bold text-primary">
                    {helper.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
              </View>
              
              <View className="flex-1">
                <Text className="text-base font-bold text-foreground">{helper.name}</Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <Star size={14} className="text-yellow-500 fill=" />
                  <Text className="text-sm text-foreground font-semibold">{helper.rating}</Text>
                  <Text className="text-sm text-muted-foreground">• Completed today</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Cost Breakdown */}
          <View className="px-6 mb-4">
            <View className="bg-card rounded-2xl p-5 border border-border">
              <View className="flex-row items-center gap-2 mb-4">
                <Receipt size={18} className="text-primary" />
                <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Cost Breakdown
                </Text>
              </View>
              
              <View className="space-y-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted-foreground">Service Cost (2 hrs)</Text>
                  <Text className="text-sm font-semibold text-foreground">${serviceCost.toFixed(2)}</Text>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted-foreground">Helper Fee</Text>
                  <Text className="text-sm font-semibold text-foreground">${helperFee.toFixed(2)}</Text>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-muted-foreground">Tax (8.5%)</Text>
                  <Text className="text-sm font-semibold text-foreground">${tax.toFixed(2)}</Text>
                </View>

                <View className="h-px bg-border my-2" />

                <View className="flex-row justify-between items-center">
                  <Text className="text-base font-semibold text-foreground">Subtotal</Text>
                  <Text className="text-base font-bold text-foreground">${subtotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tip Selection */}
          <View className="px-6 mb-4">
            <View className="bg-card rounded-2xl p-5 border border-border">
              <View className="flex-row items-center gap-2 mb-4">
                <DollarSign size={18} className="text-primary" />
                <Text className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Add a Tip
                </Text>
              </View>

              <View className="flex-row gap-3 mb-4">
                <TipButton percent={10} label="10%" />
                <TipButton percent={15} label="15%" />
                <TipButton percent={20} label="20%" />
              </View>

              <View className="flex-row gap-3">
                <TipButton percent={25} label="25%" />
                <TipButton percent={30} label="30%" />
              </View>

              {/* Custom Tip Input */}
              <View className={`mt-4 rounded-xl border-2 overflow-hidden ${
                selectedTip === -1 ? 'border-primary' : 'border-border'
              }`}>
                <View className="flex-row items-center bg-input px-4 py-3">
                  <DollarSign size={18} className="text-muted-foreground mr-2" />
                  <TextInput
                    className="flex-1 text-foreground text-base"
                    placeholder="Custom amount"
                    placeholderTextColor="#94a3b8"
                    value={customTip}
                    onChangeText={handleCustomTipChange}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              {tipAmount > 0 && (
                <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-border">
                  <Text className="text-sm text-muted-foreground">Tip Amount</Text>
                  <Text className="text-base font-bold text-primary">${tipAmount.toFixed(2)}</Text>
                </View>
              )}
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
                  <Text className="text-sm font-semibold text-foreground">{paymentMethod.type} ending in {paymentMethod.last4}</Text>
                  <Text className="text-xs text-muted-foreground">Expires {paymentMethod.expiry}</Text>
                </View>
              </View>
              <ChevronRight size={20} className="text-muted-foreground" />
            </TouchableOpacity>
          </View>

          {/* Secure Payment Notice */}
          <View className="px-6 mb-4">
            <View className="flex-row items-center justify-center gap-2">
              <Shield size={16} className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground">Secure payment powered by Stripe</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-6 pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-sm text-muted-foreground">Total Amount</Text>
              <Text className="text-3xl font-bold text-foreground">${total.toFixed(2)}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={handlePay}
            className="rounded-xl overflow-hidden shadow-sm"
          >
            <LinearGradient
              colors={['#0d9c88', '#0f7a6b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 16, paddingHorizontal: 24 }}
            >
              <View className="flex-row items-center justify-center">
                <Check size={20} className="text-white mr-2" />
                <Text className="text-base font-bold text-white">Pay ${total.toFixed(2)}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}