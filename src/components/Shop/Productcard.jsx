/* eslint-disable react/prop-types */
// src/components/shop/ProductCard.jsx

import { useAppContext } from "../../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
