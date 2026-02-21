import { useState, useEffect } from "react";
import FoodGrid from "./FoodGrid";
import OrderSection from "../order/OrderSection";

const FoodSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [foodItem, setFoodItem] = useState(() => {
    const stored = localStorage.getItem("foodItem");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodItem", JSON.stringify(foodItem));
  }, [foodItem]);

  const getItemQuantity = (name) =>
    foodItem.filter((i) => i.name === name).length;
  const handleAddToCart = (item) => setFoodItem((prev) => [...prev, item]);
  const handleIncrement = (item) => setFoodItem((prev) => [...prev, item]);
  const handleDecrement = (item) => {
    setFoodItem((prev) => {
      const index = prev.findLastIndex((i) => i.name === item.name);
      return index === -1 ? prev : prev.filter((_, i) => i !== index);
    });
  };
  const handleRemoveAll = (name) =>
    setFoodItem((prev) => prev.filter((i) => i.name !== name));
  const calculateTotalPrice = () =>
    foodItem.reduce((total, item) => total + item.price, 0);
  const handleCheckout = () => {
    setShowModal(false);
    setFoodItem([]);
  };

  return (
    <article className="container">
      <section className="food-section">
        <h1>Desserts</h1>
        <FoodGrid
          getItemQuantity={getItemQuantity}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </section>

      <OrderSection
        foodItem={foodItem}
        getItemQuantity={getItemQuantity}
        totalPrice={calculateTotalPrice()}
        onRemoveAll={handleRemoveAll}
        onConfirm={() => setShowModal(true)}
        showModal={showModal}
        onCheckout={handleCheckout}
      />
    </article>
  );
};

export default FoodSection;
