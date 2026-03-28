import api from '../lib/api';

export const authService = {
  // Step 1: Request OTP
  requestOtp: async (phoneNumber: string) => {
    try {
      const response = await api.post('/auth/request-otp', { phoneNumber });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to send OTP";
    }
  },

  // Step 2: Verify OTP
  verifyOtp: async (phoneNumber: string, otp: string, role: string, name?: string) => {
    try {
      const response = await api.post('/auth/verify-otp', { 
        phoneNumber, 
        otp, 
        role,
        name // Only needed for registration
      });
      return response.data; // Returns { token, role, user }
    } catch (error: any) {
      throw error.response?.data?.message || "Invalid OTP";
    }
  }
};