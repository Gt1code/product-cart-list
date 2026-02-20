import { foodData } from "./data";
import { useState, useEffect } from "react";
import EmptyOrder from "../order-confirmation/EmptyOrder";
import { X } from "lucide-react";

const FoodSection = () => {
  const storedFood = localStorage.getItem("foodItem");
  const [foodItem, setFoodItem] = useState(() => {
    return storedFood ? JSON.parse(storedFood) : [];
  });

  useEffect(() => {
    localStorage.setItem("foodItem", JSON.stringify(foodItem));
  }, [foodItem]);

  // Function to handle adding food item to cart
  const handleAddToCart = (item) => {
    setFoodItem((prevItems) => [...prevItems, item]);
  };

  // Function to handle removing food item from cart
  const handleRemoveFromCart = (item) => {
    setFoodItem((prevItems) => prevItems.filter((i) => i.name !== item.name));
  };

  // Function to calculate total price of items in cart
  const calculateTotalPrice = () => {
    return foodItem.reduce((total, item) => total + item.price, 0);
  };

  // Function to clear the cart
  const clearCart = () => {
    setFoodItem([]);
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    // Implement checkout logic here (e.g., redirect to payment page, show confirmation, etc.)
    alert("Checkout successful! Thank you for your order.");
    clearCart(); // Clear the cart after successful checkout
  };

  return (
    <article className="container">
      {/* food section */}
      <section className="food-section">
        <h1>Desserts</h1>

        <div className="food-grid">
          {foodData.map((foodItem) => (
            <section className="food-box" key={foodItem.name}>
              <div className="food-img-box">
                <img src={foodItem.image.mobile} alt={foodItem.name} />
                <button
                  className="food-cart-btn"
                  onClick={() => handleAddToCart(foodItem)}
                >
                  <img
                    src="/assets/images/icon-add-to-cart.svg"
                    alt="cart-icon"
                    className="cart-icon"
                  />
                  <span>Add to Cart</span>
                </button>
              </div>

              <p className="food-category">{foodItem.category}</p>
              <p className="food-name">{foodItem.name}</p>
              <p className="food-price">${foodItem.price}</p>
            </section>
          ))}
        </div>
      </section>

      {/* order section */}
      <section className="order-section">
        <article className="order-container">
          {foodItem.length > 0 ? (
            <div className="orders">
              <h2>Your Cart ({foodItem.length})</h2>

              <section className="order-items">
                {/* Deduplicate items and calculate quantity for each */}
                {[
                  ...new Map(
                    foodItem.map((item) => [item.name, item]),
                  ).values(),
                ].map((item) => {
                  const quantity = foodItem.filter(
                    (i) => i.name === item.name,
                  ).length;
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
                        className="remove-item-icon"
                        onClick={() => handleRemoveFromCart(item)}
                      />
                    </article>
                  );
                })}
              </section>

              {/* total order section */}
              <div className="order-total">
                <p>
                  <span>Order Total</span>{" "}
                  <span>${calculateTotalPrice()}</span>{" "}
                </p>
              </div>

              {/* confirm order button */}
              <div className="confirm-order">
                <button className="confirm-order-btn" onClick={handleCheckout}>
                  Confirm Order
                </button>
              </div>
            </div>
          ) : (
            <EmptyOrder />
          )}
        </article>
      </section>
    </article>
  );
};

export default FoodSection;
