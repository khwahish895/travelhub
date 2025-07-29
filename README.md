# TravelHub - Travel Booking Application

A modern, responsive travel booking application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **User Authentication**: Login, Register, and Logout functionality
- **Destination Exploration**: Browse and explore travel destinations
- **Booking Management**: Book flights, hotels, cars, and trains
- **Saved Trips**: Save destinations for later planning
- **Payment Processing**: Secure payment methods with card management
- **AI Chat Assistant**: Interactive travel planning assistance
- **Profile Management**: Update user profile and preferences

### Technical Features
- **Responsive Design**: Works on all devices
- **Modern UI**: Beautiful glassmorphism design
- **Error Handling**: Comprehensive error boundaries and validation
- **Protected Routes**: Secure access to user-specific pages
- **Local Storage**: Persistent data across sessions
- **TypeScript**: Full type safety

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travelhub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

### Netlify Deployment

1. **Automatic Deployment**:
   - Connect your GitHub repository to Netlify
   - Netlify will automatically detect the build settings from `netlify.toml`

2. **Manual Deployment**:
   ```bash
   npm run build
   ```
   - Upload the `dist` folder to Netlify

3. **Build Settings** (already configured in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### Environment Variables

No environment variables are required for basic functionality. The app uses localStorage for data persistence.

## 📱 Usage

### Getting Started
1. **Register/Login**: Create an account or login with any email/password
2. **Explore Destinations**: Click "Explore Now" on the home page
3. **Book Services**: Book flights, hotels, cars, or trains
4. **Manage Bookings**: View and manage your bookings in the dashboard
5. **Save Trips**: Save destinations for future planning
6. **Chat with AI**: Get travel assistance and recommendations

### Key Features
- **Destination Details**: Comprehensive information about travel destinations
- **Booking System**: Direct booking with confirmation
- **Payment Methods**: Add and manage payment cards
- **Profile Settings**: Update personal information
- **Saved Trips**: Organize your travel plans

## 🐛 Bug Fixes & Improvements

### Recent Fixes
- ✅ Fixed localStorage parsing errors with try-catch blocks
- ✅ Added error boundaries for better error handling
- ✅ Implemented protected routes for secure access
- ✅ Added loading states to prevent UI issues
- ✅ Enhanced form validation
- ✅ Fixed navigation issues
- ✅ Added 404 page for better UX

### Error Handling
- **localStorage Errors**: Graceful handling of corrupted data
- **Network Errors**: User-friendly error messages
- **Form Validation**: Real-time validation with helpful feedback
- **Authentication**: Proper session management

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx      # Navigation bar
│   ├── ErrorBoundary.tsx # Error handling
│   ├── LoadingSpinner.tsx # Loading states
│   └── ProtectedRoute.tsx # Route protection
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── BookingContext.tsx # Booking data
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Dashboard.tsx   # User dashboard
│   ├── Hotels.tsx      # Hotel booking
│   ├── Cars.tsx        # Car rental
│   ├── Flights.tsx     # Flight booking
│   ├── Trains.tsx      # Train booking
│   ├── Chat.tsx        # AI chat assistant
│   ├── Payment.tsx     # Payment processing
│   ├── DestinationDetail.tsx # Destination details
│   └── NotFound.tsx    # 404 page
└── App.tsx             # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Features in Detail

### Authentication System
- User registration and login
- Session persistence
- Secure logout functionality
- Protected routes

### Booking System
- Flight bookings
- Hotel reservations
- Car rentals
- Train tickets
- Booking history management

### Payment System
- Multiple payment methods
- Card management
- Secure payment processing
- Transaction history

### AI Chat Assistant
- Travel recommendations
- Booking assistance
- Destination information
- Interactive responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository. 