import { foodData } from "./data";
import { useState, useEffect } from "react";
import EmptyOrder from "../order-confirmation/EmptyOrder";
import { X, Plus, Minus } from "lucide-react";

const FoodSection = () => {
  const [showModal, setShowModal] = useState(false);
  const storedFood = localStorage.getItem("foodItem");
  const [foodItem, setFoodItem] = useState(() => {
    return storedFood ? JSON.parse(storedFood) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodItem", JSON.stringify(foodItem));
  }, [foodItem]);

  const handleConfirmOrder = () => setShowModal(true);

  // get quantity of a specific item in cart
  const getItemQuantity = (itemName) => {
    return foodItem.filter((i) => i.name === itemName).length;
  };

  // Add one instance of item to cart
  const handleAddToCart = (item) => {
    setFoodItem((prevItems) => [...prevItems, item]);
  };

  // Increment quantity by adding one more instance
  const handleIncrement = (item) => {
    setFoodItem((prevItems) => [...prevItems, item]);
  };

  // Decrement quantity by removing one instance
  const handleDecrement = (item) => {
    setFoodItem((prevItems) => {
      const index = prevItems.findLastIndex((i) => i.name === item.name);
      if (index === -1) return prevItems;
      return prevItems.filter((_, i) => i !== index);
    });
  };

  const calculateTotalPrice = () => {
    return foodItem.reduce((total, item) => total + item.price, 0);
  };

  const clearCart = () => setFoodItem([]);

  const handleCheckout = () => {
    setShowModal(false);
    clearCart();
  };

  return (
    <article className="container">
      {/* food section */}
      <section className="food-section">
        <h1>Desserts</h1>

        <div className="food-grid">
          {foodData.map((food) => {
            const quantity = getItemQuantity(food.name);
            const isInCart = quantity > 0;

            return (
              <section
                className={`food-box ${isInCart ? "food-box--selected" : ""}`}
                key={food.name}
              >
                <div className="food-img-box">
                  <picture>
                    <source
                      media="(min-width: 1024px)"
                      srcSet={food.image.desktop}
                    />
                    <source
                      media="(min-width: 640px)"
                      srcSet={food.image.tablet}
                    />
                    <img
                      className="food-img"
                      src={food.image.mobile}
                      alt={food.name}
                    />
                  </picture>

                  {isInCart ? (
                    // Quantity control button (replaces "Add to Cart")
                    <div className="quantity-control ">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecrement(food)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="quantity-minus-icon lucide" />
                      </button>

                      <span className="quantity-count">{quantity}</span>

                      <button
                        className="quantity-btn"
                        onClick={() => handleIncrement(food)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="quantity-plus-icon lucide" />
                      </button>
                    </div>
                  ) : (
                    // Default "Add to Cart" button
                    <button
                      className="food-cart-btn"
                      onClick={() => handleAddToCart(food)}
                    >
                      <img
                        src="/assets/images/icon-add-to-cart.svg"
                        alt="cart-icon"
                        className="cart-icon"
                      />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>

                <div className="food-description">
                  <p className="food-category">{food.category}</p>
                  <p className="food-name">{food.name}</p>
                  <p className="food-price">${food.price}</p>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* order section */}
      <section className="order-section">
        <article className="order-container">
          {foodItem.length > 0 ? (
            <div className="orders">
              <h2>Your Cart ({foodItem.length})</h2>

              <section className="order-items">
                {[
                  ...new Map(
                    foodItem.map((item) => [item.name, item]),
                  ).values(),
                ].map((item) => {
                  const quantity = getItemQuantity(item.name);
                  const itemTotal = (quantity * item.price).toFixed(2);

                  return (
                    <article key={item.name} className="order-item">
                      <div className="order-details">
                        <h3 className="order-item-name">{item.name}</h3>
                        <p className="order-price-list">
                          <span className="quantity">{quantity}x</span>
                          <span className="order-item-price">
                            {" "}
                            @ ${item.price}
                          </span>
                          <span className="order-item-total">
                            {" "}
                            ${itemTotal}
                          </span>
                        </p>
                      </div>
                      <X
                        className="remove-item-icon lucide"
                        onClick={() =>
                          setFoodItem((prev) =>
                            prev.filter((i) => i.name !== item.name),
                          )
                        }
                      />
                    </article>
                  );
                })}
              </section>

              <section className="order-summary">
                <div className="order-total">
                  <p>
                    <span>Order Total</span>
                    <span>${calculateTotalPrice()}</span>
                  </p>
                </div>

                <div className="carbon-neutral">
                  <img
                    src="./assets/images/icon-carbon-neutral.svg"
                    alt="neutral-icon"
                  />
                  <p>
                    This is a <span className="carbon">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>

                <div className="confirm-order">
                  <button
                    className="confirm-order-btn"
                    onClick={handleConfirmOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              </section>
            </div>
          ) : (
            <EmptyOrder />
          )}

          {/* confirmation modal */}
          {showModal && (
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
                  {[
                    ...new Map(
                      foodItem.map((item) => [item.name, item]),
                    ).values(),
                  ].map((item) => {
                    const quantity = getItemQuantity(item.name);
                    const itemTotal = (quantity * item.price).toFixed(2);
                    return (
                      <article key={item.name} className="modal-item">
                        <img
                          src={item.image.thumbnail}
                          alt={item.name}
                          className="modal-item-img"
                        />

                        <div className="modal-item-details">
                          <p className="modal-item-name">{item.name}</p>
                          <p className="modal-item-price">
                            <span className="quantity">{quantity}x</span>
                            <span className="order-item-price">
                              {" "}
                              @ ${item.price}
                            </span>
                          </p>
                        </div>

                        <span className="modal-item-total">${itemTotal}</span>
                      </article>
                    );
                  })}

                  {/* modal total price */}
                  <div className="modal-total">
                    <span>Order Total</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </section>

                {/* start new order CTA */}
                <div className="modal-actions">
                  <button
                    className="modal-confirm-btn"
                    onClick={handleCheckout}
                  >
                    Start New Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </article>
      </section>
    </article>
  );
};

export default FoodSection;
