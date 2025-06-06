import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

interface MealsState {
  meals: Meal[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MealsState = {
  meals: [],
  status: "idle",
  error: null,
};

export const fetchMeals = createAsyncThunk<Meal[]>(
  "meals/fetchMeals",
  async () => {
    const response = await fetch("https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
);

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Неизвестная ошибка";
      });
  },
});

export default mealsSlice.reducer;
