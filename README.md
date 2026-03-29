# Ekayam

Ekayam is a assistance platform designed for elderly users, connecting them with local helpers.

## Project Structure

- **[client/](client/)**: React Native mobile application built with Expo.
- **[server/](server/)**: Robust Node.js backend using Express, MongoDB, and Socket.io.
- **[docs/](docs/)**: Documentation and API specifications.
- **[legacy/](legacy/)**: Archived prototype versions.

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)
- Expo CLI (`npm install -g expo-cli`)

### Setup Backend
1. `cd server`
2. `npm install`
3. Create `.env` from `.env.example`
4. `npm run dev`

### Setup Frontend
1. `cd client`
2. `npm install`
3. `npx expo start`

## Technologies

- **Frontend**: React Native, Expo, NativeWind (Tailwind CSS)
- **Backend**: Node.js, Express, MongoDB, Socket.io, JWT
- **Real-time**: WebSockets for task updates and notifications
