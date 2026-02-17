import { foodData } from "./data";
import { useState, useEffect } from "react";
import EmptyOrder from "../order-confirmation/EmptyOrder";

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
            <div className="order-container">
              <h2>Your Cart ({foodItem.length})</h2>

              <div className="order-items">
                {foodItem.map((item) => (
                  <div key={item.name} className="order-item">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button onClick={() => handleRemoveFromCart(item)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <p>Total: ${calculateTotalPrice()}</p>
                <button onClick={handleCheckout}>Checkout</button>
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
