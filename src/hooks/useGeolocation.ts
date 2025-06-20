import { useEffect, useState } from "react";

type GeoLocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading?: number | null;
  speed?: number | null;
};

type GeoLocationState = {
  timestamp: number | null;
  loading: boolean;
  error: GeolocationPositionError | null;
  coords: GeoLocationCoords | null;
};
/**
 * useGeolocation Hook
 *
 * Tracks user's current geographic location.
 *
 * @returns \{loading, error, coords, timestamp}
 */
function useGeolocation(): GeoLocationState {
  const [state, setState] = useState<GeoLocationState>({
    loading: true,
    coords: null,
    error: null,
    timestamp: null,
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { coords } = position;
        setState({
          loading: false,
          error: null,
          timestamp: position.timestamp,
          coords: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            speed: coords.speed,
          },
        });
        console.log(position);
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error,
        }));
      }
    );

    return () => {
      if (
        navigator.geolocation &&
        typeof navigator.geolocation.clearWatch === "function"
      ) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return state;
}

export default useGeolocation;
