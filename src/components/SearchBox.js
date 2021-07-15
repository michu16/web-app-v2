import React from "react";

const SearchBox = (props) => {
  return (
    <>
      <input
        type="search"
        className="search"
        placeholder={props.placeholder}
        onChange={props.handleChange}
      />
      <button>
        <i className="fa fa-search"></i>
      </button>
    </>
  );
};

export default SearchBox;
