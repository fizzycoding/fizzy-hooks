import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useIdle Hook
 * 
 * Detects if the user is idle after a given timeout.
 *
 * @param timeout - Time in milliseconds to wait before considering the user idle.
 * @returns \{isIdle, resetTimer} 
 * - isIdle: whether the user is idle.
 * - resetTimer: function to manually reset the timer.
 */

function useIdle(timeout: number = 2000) {
  const [isIdle, setIsIdle] = useState(false);
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setIsIdle(false);
    timerId.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  }, [timeout]);

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "wheel",
      "mousedown",
    ];

    const handlerActivity = () => {
      resetTimer();
    };

    resetTimer();

    events.forEach((event) => window.addEventListener(event, handlerActivity));

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      events.forEach((event) =>
        window.removeEventListener(event, handlerActivity)
      );
    };
  }, [resetTimer]);

  return { isIdle, resetTimer };
}

export default useIdle;
