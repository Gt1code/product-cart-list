const EmptyOrder = () => {
  return (
    <section className="empty-order-container">
      <h2>Your Cart (0)</h2>
      <div className="order-empty-img-container">
        <img
          src="./assets/images/illustration-empty-cart.svg"
          alt="empty-cart"
        />
        <p>Your added items will appear here</p>
      </div>
    </section>
  );
};

export default EmptyOrder;
