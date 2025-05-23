export interface MenuItemType {
  id: number;
  meal: string;
  price: number;
  img: string;
  instructions: string;
  category?: string; 
  [key: string]: any;
}