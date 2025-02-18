// src/components/shop/CartPreview.jsx

import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CartPreview = () => {
  const { cart, removeFromCart } = useAppContext();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <span>
            {item.name} (x{item.quantity})
          </span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <Link
        to="/checkout"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded block text-center hover:bg-blue-600"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default CartPreview;
