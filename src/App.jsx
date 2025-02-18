/* eslint-disable react/prop-types */
// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import ThemeToggle from "./components/Universal/ThemeToggle";

// function App() {
//   useEffect(() => {
//     // Check for saved theme preference or use system preference
//     const isDarkMode =
//       localStorage.getItem("darkMode") === "true" ||
//       (!("darkMode" in localStorage) &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   return (
//     <div className="app bg-primary dark:bg-secondary text-secondary dark:text-primary transition-colors duration-1000">
//       <BrowserRouter>
//         <ThemeToggle />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import AppProvider from "./context/AppContext";
import Header from "./components/Universal/Header";
import Footer from "./components/Universal/Footer";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Profile from "./pages/Profile";
import PasswordReset from "./components/auth/PasswordReset";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, userRole, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </Router>
    </AppProvider>
  );
}

export default App;
