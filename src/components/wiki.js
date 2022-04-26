import React from "react";
import "./wiki.css";

function wiki() {
  return (
    <div className="main">
      <div className="outer">
        <div className="inner">
          <h2>Dancing Links / Algorithm X</h2>
          <p>
            Dancing Links, or DLX for short, is the technique suggested by
            Donald Knuth for implementing Algorithm X efficiently. Given a
            binary matrix, DLX will represent the 1s as data objects. Each data
            object x have the fields L[x], R[x], U[x], D[x] and C[x]. The fields
            are for linking to any other cell with an occupying 1 to the left,
            right, up and down. Any link that has no corresponding 1 in a
            suitable cell will link to itself instead.
          </p>
        </div>
      </div>
      <div className="second-block">
        <div className="img-div">
          <img src={require("../assets/matrix-dlx.png")} alt="dlx" />
        </div>
        <div className="img-details">
          <p>
            This image visualizes how a given binary matrix is represented in
            the DLX data structure. It shows how each 1 in the matrix is
            represented by a data object with links to any nearby data object.
            The arrow head at the data or column objects describes a link; also
            note how the links have a circular connection for both the row and
            columns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default wiki;
