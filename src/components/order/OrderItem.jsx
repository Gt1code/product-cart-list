import { X } from "lucide-react";

const OrderItem = ({ item, quantity, onRemove }) => {
  const itemTotal = (quantity * item.price).toFixed(2);

  return (
    <article className="order-item">
      <div className="order-details">
        <h3 className="order-item-name">{item.name}</h3>
        <p className="order-price-list">
          <span className="quantity">{quantity}x</span>
          <span className="order-item-price"> @ ${item.price}</span>
          <span className="order-item-total"> ${itemTotal}</span>
        </p>
      </div>
      <X className="remove-item-icon lucide" onClick={onRemove} />
    </article>
  );
};

export default OrderItem;
