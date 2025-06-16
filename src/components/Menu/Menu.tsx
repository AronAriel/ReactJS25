import React, { useEffect, useState } from "react";
import MenuList from "./MenuList";
import { MenuItemType } from "../../types/MenuItemType";

interface MenuProps {
  visibleCount: number;
  onHasMoreChange?: (hasMore: boolean) => void;
  activeCategory: string;
}

const Menu: React.FC<MenuProps> = ({ visibleCount, onHasMoreChange, activeCategory }) => {
  const [items, setItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals");
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data: MenuItemType[] = await response.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  useEffect(() => {
    if (onHasMoreChange) {
      const hasMore = visibleCount < filteredItems.length;
      onHasMoreChange(hasMore);
    }
  }, [visibleCount, filteredItems, onHasMoreChange]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const visibleItems = filteredItems.slice(0, visibleCount);

  return <MenuList items={visibleItems} />;
};

export default Menu;
