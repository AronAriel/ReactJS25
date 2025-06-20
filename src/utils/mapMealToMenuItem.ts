import { Meal } from "../store/slices/mealsSlice";
import { MenuItemType } from "../types/MenuItemType";

export const mapMealToMenuItem = (meal: Meal): MenuItemType => ({
  id: meal.id,
  meal: meal.name,
  price: meal.price,
  img: meal.imageUrl || "", 
  instructions: meal.description,
  category: meal.category,
});
