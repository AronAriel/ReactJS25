import { useFetch } from "../hooks/UseFetch";

export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";

export const useMeals = () => {
  return useFetch<Meal[]>(API_URL, {
    method: "GET"
  });
};
