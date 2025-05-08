
const API_URL = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";

export const fetchMeals = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }

  const data = await response.json();
  return data;
};
