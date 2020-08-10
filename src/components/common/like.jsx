import React, { Component } from "react";

const Like = (props) => {
  let style = props.isLiked === false ? "fa fa-heart-o" : "fa fa-heart";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={style}
      aria-hidden="true"
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
