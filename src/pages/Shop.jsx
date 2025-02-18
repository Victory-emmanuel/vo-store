// // src/pages/Shop.jsx

// import { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../utils/firebase";
// import ProductList from "../components/Shop/ProductList";
// import Filters from "../components/Shop/Filters";
// import SearchBar from "../components/Shop/SearchBar";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch products from Firestore
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       const productsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productsData);
//       setFilteredProducts(productsData);

//       // Extract unique categories
//       const uniqueCategories = [
//         ...new Set(productsData.map((product) => product.category)),
//       ];
//       setCategories(uniqueCategories);
//     };

//     fetchProducts();
//   }, []);

//   // Filter products based on category and search term

//   useEffect(() => {
//     let result = products;
//     if (selectedCategory) {
//       result = result.filter(
//         (product) => product.category === selectedCategory
//       );
//     }
//     if (searchTerm) {
//       result = result.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     setFilteredProducts(result);
//   }, [selectedCategory, searchTerm, products]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Shop</h1>
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="md:w-1/4">
//           <Filters
//             categories={categories}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//         </div>
//         <div className="md:w-3/4">
//           <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//           <ProductList products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;

// src/pages/Shop.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAppContext } from "../context/AppContext";
import ProductList from "../components/Shop/ProductList";
import Filters from "../components/Shop/Filters";
import SearchBar from "../components/Shop/SearchBar";
import CartPreview from "../components/Shop/CartPreview";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setFilteredProducts(productsData);

      const uniqueCategories = [
        ...new Set(productsData.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/4">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="md:w-1/2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList products={filteredProducts} />
        </div>
        <div className="md:w-1/4">
          <CartPreview cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
