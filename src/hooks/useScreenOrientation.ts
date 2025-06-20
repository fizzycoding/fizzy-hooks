import { useEffect, useState } from "react";

type OrientationType = "portrait" | "landscape";

interface ScreenOrientationState {
  orientation: OrientationType;
  angle: number;
  supported: boolean;
}

/**
 * useScreenOrientation Hook
 *
 * Detects if the screen is in portrait or landscape mode.
 *
 * @returns \{
 *   orientation: "portrait" | "landscape",
 *   angle,
 *   supported
 * }
 */
function useScreenOrientation(): ScreenOrientationState {
  const getOrientation = (): ScreenOrientationState => {
    const supported =
      typeof window !== "undefined" &&
      "screen" in window &&
      "orientation" in window.screen;

    if (!supported) {
      return {
        orientation: "portrait",
        angle: 0,
        supported: false,
      };
    }

    const { type, angle } = window.screen.orientation;
    return {
      orientation: type.startsWith("portrait") ? "portrait" : "landscape",
      angle,
      supported: true,
    };
  };

  const [state, setState] = useState<ScreenOrientationState>(getOrientation);

  useEffect(() => {
    if (!state.supported) return;

    const handleChange = () => setState(getOrientation());

    window.screen.orientation.addEventListener("change", handleChange);

    return () => {
      window.screen.orientation.removeEventListener("change", handleChange);
    };
  }, [state.supported]);

  return state;
}

export default useScreenOrientation;
