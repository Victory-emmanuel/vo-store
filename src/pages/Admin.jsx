// src/pages/Admin.jsx

import { useState } from "react";
import ProductTable from "../components/Admin/ProductTable";
import ProductForm from "../components/Admin/ProductForm";
import OrderManagement from "../components/Admin/OrderManagement";
import UserManagement from "../components/Admin/UserManagement";
import SalesReport from "../components/Admin/SalesReport";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
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
      <div className="mb-4">
        <button
          onClick={() => setActiveTab("products")}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`px-4 py-2 rounded ${
            activeTab === "sales" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sales Report
        </button>
      </div>

      {activeTab === "products" && (
        <>
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
        </>
      )}

      {activeTab === "orders" && <OrderManagement />}
      {activeTab === "users" && <UserManagement />}
      {activeTab === "sales" && <SalesReport />}
    </div>
  );
};

export default Admin;
