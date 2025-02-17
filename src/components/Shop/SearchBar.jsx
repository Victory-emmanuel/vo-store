/* eslint-disable react/prop-types */
// src/components/shop/SearchBar.jsx

import { Input } from "@material-tailwind/react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        label="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
