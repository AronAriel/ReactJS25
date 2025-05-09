import { useFetch } from "../hooks/UseFetch";

const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";

export const useMeals = () => {
  return useFetch(API_URL, {
    method: "GET"
  });
};
