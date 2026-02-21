import { foodData } from "./data";
import FoodCard from "./FoodCard";

const FoodGrid = ({
  getItemQuantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => (
  <div className="food-grid">
    {foodData.map((food, index) => (
      <FoodCard
        key={food.name}
        food={food}
        index={index}
        quantity={getItemQuantity(food.name)}
        onAddToCart={onAddToCart}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    ))}
  </div>
);

export default FoodGrid;
