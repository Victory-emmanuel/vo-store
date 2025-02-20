// src/components/admin/SalesReport.jsx

import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { toast } from "react-hot-toast";

const SalesReport = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topSellingProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const ordersQuery = query(collection(db, "orders"));
        const querySnapshot = await getDocs(ordersQuery);
        const orders = querySnapshot.docs.map((doc) => doc.data());

        const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const averageOrderValue =
          totalOrders > 0 ? totalSales / totalOrders : 0;

        const productSales = {};
        orders.forEach((order) => {
          order.items.forEach((item) => {
            if (productSales[item.id]) {
              productSales[item.id].quantity += item.quantity;
              productSales[item.id].total += item.price * item.quantity;
            } else {
              productSales[item.id] = {
                name: item.name,
                quantity: item.quantity,
                total: item.price * item.quantity,
              };
            }
          });
        });

        const topSellingProducts = Object.values(productSales)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5);

        setSalesData({
          totalSales,
          totalOrders,
          averageOrderValue,
          topSellingProducts,
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
        toast.error("Failed to load sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
          <p className="text-2xl font-bold">
            ${salesData.totalSales.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-2xl font-bold">{salesData.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
          <p className="text-2xl font-bold">
            ${salesData.averageOrderValue.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity Sold</th>
              <th className="py-2 px-4 border-b">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {salesData.topSellingProducts.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b">
                  ${product.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
