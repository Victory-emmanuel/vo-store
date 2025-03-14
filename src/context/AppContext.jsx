/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// src/context/AppContext.jsx

import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { toast } from "react-hot-toast";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            await setDoc(doc(db, "users", user.uid), {
              email: user.email,
              role: "user",
            });
            setUserRole("user");
          }
        } else {
          toast.error("Please verify your email address.");
          auth.signOut();
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + (product.quantity || 1),
                price: Number(product.price),
              }
            : item
        );
      } else {
        return [
          ...currentCart,
          {
            ...product,
            quantity: product.quantity || 1,
            price: Number(product.price),
          },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    user,
    userRole,
    loading,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
