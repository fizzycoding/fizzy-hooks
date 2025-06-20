import { useEffect, useState } from "react";

interface BatteryState {
  charging: boolean;
  level: number; // 0 to 1
  chargingTime: number;
  dischargingTime: number;
}

interface UseBatteryReturns extends BatteryState {
  supported: boolean;
  loading: boolean;
}

const defaultBatteryState: BatteryState = {
  charging: false,
  level: 1,
  chargingTime: 0,
  dischargingTime: Infinity,
};

const useBattery = (): UseBatteryReturns => {
  const [batteryState, setBatteryState] =
    useState<BatteryState>(defaultBatteryState);
  const [supported, setSupported] = useState<boolean>(
    () =>
      typeof navigator !== "undefined" &&
      typeof (navigator as any).getBattery === "function"
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!supported) {
      return;
    }
    const getBattery = async () => {
      try {
        const battery = await (navigator as any).getBattery();
        setSupported(true);

        const updateBattery = () => {
          setBatteryState({
            charging: battery.charging,
            level: battery.level,
            chargingTime: battery.chargingTime,
            dischargingTime: battery.dischargingTime,
          });
        };

        updateBattery();

        // Add event listeners
        battery.addEventListener("chargingchange", updateBattery);
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingtimechange", updateBattery);
        battery.addEventListener("dischargingtimechange", updateBattery);

        return () => {
          // Clean up event listeners
          battery.removeEventListener("chargingchange", updateBattery);
          battery.removeEventListener("levelchange", updateBattery);
          battery.removeEventListener("chargingtimechange", updateBattery);
          battery.removeEventListener("dischargingtimechange", updateBattery);
        };
      } catch (error) {
        setSupported(false);
      } finally {
        setLoading(false);
      }
    };

    getBattery();
  }, []);

  return {
    ...batteryState,
    supported,
    loading,
  };
};

export default useBattery;
