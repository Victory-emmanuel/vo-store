// src/pages/Shop.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAppContext } from "../context/AppContext";
import ProductList from "../components/Shop/ProductList";
import Filters from "../components/Shop/Filters";
import SearchBar from "../components/Shop/SearchBar";
import CartPreview from "../components/Shop/CartPreview";
import toast from "react-hot-toast";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { cart } = useAppContext();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let productsQuery = query(collection(db, "products"));

      if (selectedCategory) {
        productsQuery = query(
          productsQuery,
          where("category", "==", selectedCategory)
        );
      }

      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
      setLoading(false);

      // Set categories
      const uniqueCategories = [
        ...new Set(productsData.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again.");
      setLoading(false);
      setProducts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, products]);

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ProductList products={filteredProducts} />
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
