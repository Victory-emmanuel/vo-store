// src/pages/Admin.jsx
import { useState } from "react";
import ProductTable from "../components/admin/ProductTable";
import ProductForm from "../components/admin/ProductForm";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { user, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleProductUpdate = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={() => setIsAddingProduct(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add New Product
      </button>
      {(isAddingProduct || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          onProductUpdate={handleProductUpdate}
        />
      )}
      <ProductTable onEdit={setEditingProduct} />
    </div>
  );
};

export default Admin;
