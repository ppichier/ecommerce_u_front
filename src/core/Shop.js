import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import getCategories from "./apiCore";

const Shop = () => {
  const [] = useState();

  return (
    <Layout
      title="Shop page"
      description="Search and find book of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">left side bar</div>
        <div className="col-8">right side bar</div>
      </div>
    </Layout>
  );
};

export default Shop;
