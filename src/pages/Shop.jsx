// src/pages/Shop.jsx

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAppContext } from "../context/AppContext";
import ProductList from "../components/Shop/ProductList";
import Filters from "../components/Shop/Filters";
import SearchBar from "../components/Shop/SearchBar";
import CartPreview from "../components/Shop/CartPreview";
import toast from "react-hot-toast";

const PRODUCTS_PER_PAGE = 12;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { cart } = useAppContext();

  const fetchProducts = async (lastDoc = null) => {
    try {
      setLoading(true);
      let productsQuery = query(
        collection(db, "products"),
        orderBy("name"),
        limit(PRODUCTS_PER_PAGE)
      );

      if (lastDoc) {
        productsQuery = query(
          collection(db, "products"),
          orderBy("name"),
          startAfter(lastDoc),
          limit(PRODUCTS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts((prevProducts) => [...prevProducts, ...productsData]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === PRODUCTS_PER_PAGE);
      setLoading(false);

      // Set categories
      const uniqueCategories = [
        ...new Set(productsData.map((product) => product.category)),
      ];
      setCategories((prevCategories) => [
        ...new Set([...prevCategories, ...uniqueCategories]),
      ]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const loadMore = () => {
    if (hasMore) {
      fetchProducts(lastVisible);
    }
  };

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
          {loading && <p>Loading...</p>}
          {!loading && hasMore && (
            <button
              onClick={loadMore}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load More
            </button>
          )}
        </div>
        <div className="md:w-1/4">
          <CartPreview cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
