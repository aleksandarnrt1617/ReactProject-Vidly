import React, { Component } from "react";

const Filter = (props) => {
  const { items, onItemSelected, textProperty, selectedItem, valueProperty } = props;
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={item === selectedItem ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelected(item)}>
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Filter;
