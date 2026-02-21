const ModalItem = ({ item, quantity, index }) => {
  const itemTotal = (quantity * item.price).toFixed(2);

  return (
    <article className="modal-item">
      <img
        src={item.image.thumbnail}
        alt={item.name}
        className="modal-item-img"
        fetchPriority={index === 0 ? "high" : "auto"}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className="modal-item-details">
        <p className="modal-item-name">{item.name}</p>
        <p className="modal-item-price">
          <span className="quantity">{quantity}x</span>
          <span className="order-item-price"> @ ${item.price}</span>
        </p>
      </div>
      <span className="modal-item-total">${itemTotal}</span>
    </article>
  );
};

export default ModalItem;
