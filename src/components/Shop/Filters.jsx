/* eslint-disable react/prop-types */
import { Radio } from "@material-tailwind/react";

const Filters = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <Radio
        name="category"
        label="All"
        checked={selectedCategory === ""}
        onChange={() => setSelectedCategory("")}
      />
      {categories.map((category) => (
        <Radio
          key={category}
          name="category"
          label={category}
          checked={selectedCategory === category}
          onChange={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
};

export default Filters;
