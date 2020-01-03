import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure info and user from local storage
  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return <div className="text-success">Category created</div>;
    }
  };

  const showError = () => {
    if (error) {
      return <div className="text-danger">Category should be unique</div>;
    }
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
          Back to dashboard
        </Link>
      </div>
    );
  };

  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  return (
    <Layout
      title="Add a new Category"
      description={`Good day ${user.name}, ready to add a new category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
