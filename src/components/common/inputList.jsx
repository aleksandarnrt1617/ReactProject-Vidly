import React, { Component } from "react";

const InputList = ({ name, label, error, items, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className='custom-select'>
        <option></option>
        {items.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default InputList;
