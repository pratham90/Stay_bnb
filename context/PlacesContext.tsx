import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';

export type PlaceType = 'hotel' | 'restaurant' | 'tourism' | 'map';

export interface Place {
  _id?: string;
  name?: string;
  address?: string;
  image?: string;
  [key: string]: any;
}

interface PlacesContextValue {
  places: Place[];
  mapResult: any;
  loading: boolean;
  error: string | null;
  fetchPlaces: (location: string, type: PlaceType) => Promise<void>;
  fetchMap: (location: string, nearbyType?: string) => Promise<void>;
}

const PlacesContext = createContext<PlacesContextValue | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [mapResult, setMapResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(async (location: string, userId?: string, type: PlaceType = 'hotel') => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = type === 'map' ? 'map' : type + 's';
      const userIdParam = userId ? `&clerk_id=${encodeURIComponent(userId)}` : '';
      const { data } = await api.get(`/api/${endpoint}?location=${encodeURIComponent(location)}&limit=10${userIdParam}`);
      setPlaces(data.data || data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMap = useCallback(async (location: string, userId?: string, nearbyType?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('location', location);
      if (nearbyType) params.append('show_nearby', nearbyType);
      if (userId) params.append('clerk_id', userId);
      const { data } = await api.get(`/api/map?${params.toString()}`);
      setMapResult(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setMapResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PlacesContext.Provider value={{ places, mapResult, loading, error, fetchPlaces, fetchMap }}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const ctx = useContext(PlacesContext);
  if (!ctx) throw new Error('usePlaces must be used within a PlacesProvider');
  return ctx;
};
