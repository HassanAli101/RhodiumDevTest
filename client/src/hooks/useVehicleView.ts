import { useState, useEffect } from "react";
import { GetVehiclesInfo } from "../services/api/vehicle";
import { Vehicle } from "../utils/types";

export const useVehicleView = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GetVehiclesInfo();
        setVehicles(data);
      } catch (err: any) {
        setError("Failed to fetch vehicle submissions");
        console.error("Error fetching vehicles:", err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
};
