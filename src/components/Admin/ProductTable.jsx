/* eslint-disable react/prop-types */
// src/components/admin/ProductTable.jsx
// "use client";

// import { useState, useEffect } from "react";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../utils/firebase";

// const ProductTable = ({ onEdit }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [error, setError] = useState(null); // Added error state

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       const productsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteDoc(doc(db, "products", id));
//         await fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         // Optionally display an error message to the user
//         alert("Error deleting product. Please try again later.");
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; //Loading state
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>; //Error state
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Image</th>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">Price</th>
//             <th className="py-2 px-4 border-b">Category</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td className="py-2 px-4 border-b">
//                 <img
//                   src={product.image || "/placeholder.svg"}
//                   alt={product.name}
//                   className="w-16 h-16 object-cover"
//                 />
//               </td>
//               <td className="py-2 px-4 border-b">{product.name}</td>
//               <td className="py-2 px-4 border-b">
//                 ${product.price.toFixed(2)}
//               </td>
//               <td className="py-2 px-4 border-b">{product.category}</td>
//               <td className="py-2 px-4 border-b">
//                 <button
//                   onClick={() => onEdit(product)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product.id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductTable;

"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const ProductTable = ({ onEdit, refresh }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); //Fixed useEffect dependency

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        // Optionally display an error message to the user
        alert("Error deleting product. Please try again later.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; //Loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; //Error state
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">
                ${product.price.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
