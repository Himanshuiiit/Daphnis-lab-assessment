import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store from "../states/store";
import axios from "axios";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const [categories, setCategories] = useState([]);

  function handleCategorySelect(e) {
    store.dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  }

  useEffect(() => {
    const fetchedCategories = async () => {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(data);
      store.dispatch({ type: "SET_CATEGORIES", payload: data });
    };
    fetchedCategories();
    return () => {};
  }, []);

  return (
    <nav className="flex justify-between p-4 bg-blue-600 font-semibold text-white">
      <h2 className="text-md md:text-base sm:text-sm">
        {user.name} and {user.email}
      </h2>
      <select
        className="bg-transparent"
        onChange={(e) => handleCategorySelect(e)}
        value={selectedCategory}  
      >
        <option value="All" className="text-center text-black">
          All
        </option>
        {categories.map((category, index) => (
          <option
            key={index}
            value={category}
            className="text-center text-black"
          >
            {category}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default NavBar;
