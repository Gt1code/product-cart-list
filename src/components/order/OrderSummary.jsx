import OrderItem from "./OrderItem";

const OrderSummary = ({
  foodItem,
  getItemQuantity,
  onRemoveAll,
  totalPrice,
  onConfirm,
}) => {
  const uniqueItems = [
    ...new Map(foodItem.map((item) => [item.name, item])).values(),
  ];

  return (
    <div className="orders">
      <h2>Your Cart ({foodItem.length})</h2>

      <section className="order-items">
        {uniqueItems.map((item) => (
          <OrderItem
            key={item.name}
            item={item}
            quantity={getItemQuantity(item.name)}
            onRemove={() => onRemoveAll(item.name)}
          />
        ))}
      </section>

      <section className="order-summary">
        <div className="order-total">
          <p>
            <span>Order Total</span>
            <span>${totalPrice}</span>
          </p>
        </div>
        <div className="carbon-neutral">
          <img
            src="./assets/images/icon-carbon-neutral.svg"
            alt="neutral-icon"
          />
          <p>
            This is a <span className="carbon">carbon-neutral</span> delivery
          </p>
        </div>
        <div className="confirm-order">
          <button className="confirm-order-btn" onClick={onConfirm}>
            Confirm Order
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
