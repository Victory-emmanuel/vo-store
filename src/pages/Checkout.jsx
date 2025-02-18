// src/pages/Checkout.jsx
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { flutterwaveConfig } from "../utils/flutterwave";

const Checkout = () => {
  const { cart, removeFromCart } = useAppContext();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const config = {
    ...flutterwaveConfig,
    amount: total,
    customer: {
      email: customerInfo.email,
      phone_number: customerInfo.phone,
      name: customerInfo.name,
    },
    callback: (response) => {
      console.log(response);
      // Here you would typically handle a successful payment
      // For example, clear the cart and redirect to a success page
      closePaymentModal();
    },
    onClose: () => {},
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFlutterPayment();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
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
        </div>
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Customer Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
