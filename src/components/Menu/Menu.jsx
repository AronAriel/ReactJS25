import React, { useEffect, useState } from "react";
import MenuList from "./MenuList";

function Menu({ visibleCount, onHasMoreChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals"
        );
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (onHasMoreChange) {
      const hasMore = visibleCount < items.length;
      onHasMoreChange(hasMore);
    }
  }, [visibleCount, items, onHasMoreChange]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const visibleItems = items.slice(0, visibleCount);

  return <MenuList items={visibleItems} />;
}

export default Menu;
