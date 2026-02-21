import { Plus, Minus } from "lucide-react";

const QuantityControl = ({ quantity, onIncrement, onDecrement }) => (
  <div className="quantity-control">
    <button
      className="quantity-btn"
      onClick={onDecrement}
      aria-label="Decrease quantity"
    >
      <Minus className="quantity-minus-icon lucide" />
    </button>
    <span className="quantity-count">{quantity}</span>
    <button
      className="quantity-btn"
      onClick={onIncrement}
      aria-label="Increase quantity"
    >
      <Plus className="quantity-plus-icon lucide" />
    </button>
  </div>
);

export default QuantityControl;
