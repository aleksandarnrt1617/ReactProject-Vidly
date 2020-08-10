import React, { Component } from "react";

const Search = ({ value, Change }) => {
  return (
    <div class='input-group mb-3'>
      <input
        value={value}
        onChange={(e) => Change(e.currentTarget.value)}
        type='text'
        class='form-control'
        placeholder='Search'
      />
    </div>
  );
};

export default Search;
