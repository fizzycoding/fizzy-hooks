import { useEffect, useState } from "react";

/**
 * useIsOnline Hook
 *
 * Tracks user's online/offline status.
 *
 * @returns isOnline - true if user is online, false otherwise.
 */

function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return isOnline;
}

export default useIsOnline;
