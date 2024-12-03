import { useState, useEffect } from 'react';
import createPropertyData from '../API/Api.ts';


export function useFetchData() {
  const [apartmentData, setApartmentData] = useState<any[]>([]);
  const [villaData, setVillaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await createPropertyData();
        setApartmentData(data.apartmentData);
        setVillaData(data.villaData);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { apartmentData, villaData, loading, error };
}
