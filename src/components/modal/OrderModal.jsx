import ModalItem from "./ModalItem";

const OrderModal = ({ foodItem, getItemQuantity, totalPrice, onCheckout }) => {
  const uniqueItems = [
    ...new Map(foodItem.map((item) => [item.name, item])).values(),
  ];

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img
            src="./assets/images/icon-order-confirmed.svg"
            alt="order confirmed"
            className="order-confirmed-icon"
          />
          <h2>Order Confirmed</h2>
          <p className="modal-subtitle">We hope you enjoy your food!</p>
        </div>

        <section className="modal-items">
          {uniqueItems.map((item, index) => (
            <ModalItem
              key={item.name}
              item={item}
              index={index}
              quantity={getItemQuantity(item.name)}
            />
          ))}
          <div className="modal-total">
            <span>Order Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </section>

        <div className="modal-actions">
          <button className="modal-confirm-btn" onClick={onCheckout}>
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
