import QuantityControl from "./QuantityControl";

const FoodCard = ({
  food,
  index,
  quantity,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const isInCart = quantity > 0;

  return (
    <section className={`food-box ${isInCart ? "food-box--selected" : ""}`}>
      <div className="food-img-box">
        <picture>
          <source media="(min-width: 1024px)" srcSet={food.image.desktop} />
          <source media="(min-width: 640px)" srcSet={food.image.tablet} />
          <img
            className="food-img"
            src={food.image.mobile}
            alt={food.name}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </picture>

        {isInCart ? (
          <QuantityControl
            quantity={quantity}
            onIncrement={() => onIncrement(food)}
            onDecrement={() => onDecrement(food)}
          />
        ) : (
          <button className="food-cart-btn" onClick={() => onAddToCart(food)}>
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
};

export default FoodCard;
