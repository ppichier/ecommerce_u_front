import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import Checkbox from "./Checkbox";

const Shop = () => {
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
    console.log("SHOP", filters, filterBy);
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
        </div>
        <div className="col-8">right side bar</div>
      </div>
    </Layout>
  );
};

export default Shop;
