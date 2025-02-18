// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Navbar,
//   Collapse,
//   IconButton,
//   Typography,
// } from "@material-tailwind/react";
// import { motion } from "framer-motion";
// import {
//   MoonIcon,
//   SunIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";

// const NavLinks = [
//   { name: "Home", path: "/" },
//   { name: "Components", path: "/components" },
//   { name: "Templates", path: "/templates" },
//   { name: "Pricing", path: "/pricing" },
// ];

// const Navigation = () => {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleTheme = () => {
//     document.documentElement.classList.toggle("dark");
//     setDarkMode(!darkMode);
//   };

//   const navVariants = {
//     open: { opacity: 1, y: 0 },
//     closed: { opacity: 0, y: -20 },
//   };

//   return (
//     <Navbar
//       className="sticky top-0 z-50 dark:bg-black dark:text-white bg-white text-secondary/80 rounded-none px-6 ss:px-12 py-4 border-none shadow-lg shadow-secondary/10 dark:shadow-primary/10"
//       fullWidth
//     >
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <motion.div variants={navVariants} className="col-span-1">
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
//               <span className="text-white font-bold text-xl">S</span>
//             </div>
//             <Typography variant="h6" className="font-bold">
//               SquidTemplates
//             </Typography>
//           </Link>
//         </motion.div>

//         {/* Desktop Navigation */}
//         <div className="hidden ss:flex gap-8 items-center">
//           {NavLinks.map((link) => (
//             <motion.div
//               key={link.name}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `dark:hover:text-accent hover:text-secondary hover:font-semibold transition-colors ${
//                     isActive ? "text-black dark:text-accent font-bold" : ""
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             </motion.div>
//           ))}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           {/* Theme Toggle */}
//           <motion.button
//             onClick={toggleTheme}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="p-2 rounded-full"
//           >
//             {darkMode ? (
//               <SunIcon className="h-5 w-5" />
//             ) : (
//               <MoonIcon className="h-5 w-5" />
//             )}
//           </motion.button>

//           <IconButton
//             variant="text"
//             className="ss:hidden text-inherit hover:bg-transparent focus:bg-transparent"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? (
//               <XMarkIcon className="h-6 w-6" />
//             ) : (
//               <Bars3Icon className="h-6 w-6" />
//             )}
//           </IconButton>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <Collapse open={open}>
//         <motion.div
//           initial="closed"
//           animate={open ? "open" : "closed"}
//           variants={navVariants}
//           className="flex flex-col ss:hidden gap-4 mt-4 border-t border-secondary/10 dark:border-gray-800"
//         >
//           {NavLinks.map((link) => (
//             <motion.div
//               key={link.name}
//               whileHover={{ x: 10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <NavLink
//                 to={link.path}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `py-2 dark:hover:text-accent hover:text-secondary hover:font-semibold transition-colors ${
//                     isActive ? "text-black dark:text-accent font-bold" : ""
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             </motion.div>
//           ))}
//         </motion.div>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Navigation;

// src/components/Header.jsx

import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import SignOut from "../auth/SignOut";

const Header = () => {
  const { cart, user, userRole } = useAppContext();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-Commerce Store
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout ({cart.length})</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                {userRole === "admin" && (
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                )}
                <li>
                  <SignOut />
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
