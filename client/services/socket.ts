import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_URL = 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = async () => {
  if (!socket.connected) {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // @ts-ignore
        socket.auth = { token };
        socket.connect();
      }
    } catch (err) {
      console.error("Socket auth error", err);
    }
  }
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};