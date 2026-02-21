import OrderSummary from "./OrderSummary";
import OrderModal from "../modal/OrderModal";
import EmptyOrder from "./EmptyOrder";

const OrderSection = ({
  foodItem,
  getItemQuantity,
  totalPrice,
  onRemoveAll,
  onConfirm,
  showModal,
  onCheckout,
}) => (
  <section className="order-section">
    <article className="order-container">
      {foodItem.length > 0 ? (
        // list of all ordered items
        <OrderSummary
          foodItem={foodItem}
          getItemQuantity={getItemQuantity}
          onRemoveAll={onRemoveAll}
          totalPrice={totalPrice}
          onConfirm={onConfirm}
        />
      ) : (
        <EmptyOrder />
      )}

      {showModal && (
        <OrderModal
          foodItem={foodItem}
          getItemQuantity={getItemQuantity}
          totalPrice={totalPrice}
          onCheckout={onCheckout}
        />
      )}
    </article>
  </section>
);

export default OrderSection;
