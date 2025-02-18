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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./context/AppContext";
import Header from "./components/Universal/Header";
import Footer from "./components/Universal/Footer";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow ">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
