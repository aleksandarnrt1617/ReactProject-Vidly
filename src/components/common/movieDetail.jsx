import React from "react";
import queryString from "query-string";
const MovieDetail = ({ match, location, history }) => {
  const { id } = queryString.parse(location.search);

  return (
    <React.Fragment>
      <h1>Movie ID : {match.params.id}</h1>
      <button className='btn btn-primary btn-sm' onClick={() => history.replace("/")}>
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieDetail;
