import axios from 'axios';
import { Platform } from 'react-native';

// If on Web, localhost is fine. If on Mobile, use the IP.
const baseURL = Platform.OS === 'web' 
  ? 'http://localhost:5000/api' 
  : 'http://192.168.x.xx:5000/api'; // Replace with your ip addr show output

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export default api;