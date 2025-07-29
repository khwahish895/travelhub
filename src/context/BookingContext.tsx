import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Booking {
  id: string;
  type: 'Flight' | 'Hotel' | 'Train' | 'Car';
  title: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
  image: string;
  bookingDate: string;
}

interface SavedTrip {
  id: string;
  destination: string;
  savedDate: string;
  image: string;
  description: string;
  estimatedPrice: number;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryDate?: string;
  cardName?: string;
  isDefault: boolean;
}

interface BookingContextType {
  bookings: Booking[];
  savedTrips: SavedTrip[];
  paymentMethods: PaymentMethod[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
  addSavedTrip: (trip: Omit<SavedTrip, 'id' | 'savedDate'>) => void;
  removeSavedTrip: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('bookings');
      const savedTripsData = localStorage.getItem('savedTrips');
      const savedPaymentMethods = localStorage.getItem('paymentMethods');

      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      if (savedTripsData) {
        setSavedTrips(JSON.parse(savedTripsData));
      }
      if (savedPaymentMethods) {
        setPaymentMethods(JSON.parse(savedPaymentMethods));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('bookings');
      localStorage.removeItem('savedTrips');
      localStorage.removeItem('paymentMethods');
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const addSavedTrip = (tripData: Omit<SavedTrip, 'id' | 'savedDate'>) => {
    const newTrip: SavedTrip = {
      ...tripData,
      id: Date.now().toString(),
      savedDate: new Date().toISOString().split('T')[0]
    };
    setSavedTrips(prev => [newTrip, ...prev]);
  };

  const removeSavedTrip = (id: string) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const addPaymentMethod = (methodData: Omit<PaymentMethod, 'id'>) => {
    const newMethod: PaymentMethod = {
      ...methodData,
      id: Date.now().toString()
    };
    setPaymentMethods(prev => [newMethod, ...prev]);
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const value: BookingContextType = {
    bookings,
    savedTrips,
    paymentMethods,
    addBooking,
    addSavedTrip,
    removeSavedTrip,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}; 