import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories()
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop page"
      description="Search and find book of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by prices range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
