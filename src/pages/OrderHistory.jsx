/* eslint-disable react/no-unescaped-entities */
// src/pages/OrderHistory.jsx

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAppContext();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">
                Order #{order.id.slice(0, 8)}
              </h2>
              <p className="text-gray-600 mb-2">
                Date: {new Date(order.createdAt.toDate()).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-2">
                Total: ${order.total.toFixed(2)}
              </p>
              <h3 className="font-semibold mt-4 mb-2">Items:</h3>
              <ul className="list-disc list-inside">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}, Price: $
                    {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 mt-4">
                Status: {order.status || "Processing"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
