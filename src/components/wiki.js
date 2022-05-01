import React from "react";
import { Chip } from "@mui/material";
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
        <div className="time">
            <div className="best">
                <h3>Optimized Time:
                  <Chip label='O(2^(N/3))' sx={{fontSize: 20}} />
                </h3>
            </div>
            <div className="worst">
                <h3>Worst Time:
                  <Chip label='O(4^(N/3))' sx={{fontSize: 20}} />
                </h3>
            </div>
            <div className="space">
                <h3>Space Complexity:
                  <Chip label='O(N^2)' sx={{fontSize: 20}} />
                </h3>
            </div>
        </div>
      <div className="second-block">
        <div className="img-div">
          <img src={require("../assets/matrix-dlx.png")} alt="dlx" />
        </div>
        <div className="outer">
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
      <div className="second-block">
        <div className="outer">
          <div className="inner">
            <h2>The Algo Behind: </h2>
            <p>
              We define a function search(h, k, s) where h is the root column
              object, k is the current depth and s is the solution with a list
              of data objects. The function should be invoked with k = 0 and s =
              []. If s is a linked list the k can be omitted.
            </p>
          </div>
        </div>
        <div className="img-div">
          <img src={require("../assets/algo.png")} alt="dlx" />
        </div>
      </div>
      <div className="second-block">
        <div className="outer">
          <div className="inner">
            <h1>Reducing Sudoku </h1>
            <h2> Cell Constraint </h2>
            <p>
              Each cell in G has nine candidates which means there must be nine
              rows in M for each cell. One of these nine rows must be included
              for the solution for each cell. Since the solution must cover all
              columns, each of the nine rows has 1s in their own column. The
              first cell has 1s in the first column for the first nine rows, the
              second cell has 1s in the second column for the next nine rows and
              so on for the remaining cells. This will force the algorithm to
              always include at least one of the rows for each cell to cover all
              columns. Since there are 81 cells, there are 81 columns required
              for the cell constraint, and since each cell requires nine rows, M
              must have space for its 9 · 81 = 729 rows.
              <span>
                {" "}
                For scope of better understanding we are using 27 rows only
                which is for 3 number mini sudoku i.e 3X3 Matrix
              </span>
            </p>
          </div>
        </div>
        <div className="img-div">
          <img src={require("../assets/col.png")} alt="dlx" />
        </div>
      </div>
      <div className="second-block">
        <div className="outer">
          <div className="inner">
            <h2> Row Constraint </h2>
            <p>
              Each row in G can only have a set of integers between 1 and 9. To
              preserve this constraint in M, the 1s are placed in a different
              pattern than in the cell constraint. For 9 cells to comply with a
              row constraint, we need to place the 1s for one row in G over 9
              rows in M.
              <span>
                {" "}
                For scope of better understanding we are using only i.e 3X3
                Matrix so 3 numbers instead of 9. {" "}
              </span>
               For one cell in G the 1s are placed in a new column for each of
              the nine rows in M. This is repeated in the same columns for the
              first nine cells in G or the 81 first rows in M. The next row
              constraint starts in the 10th cell or on row 82, but the 1s are
              placed starting after the last column used by the first row in M.
              This will force the algorithm to only pick a unique integer value
              for each cell in the row since the columns with 1s spans the same
              columns for the cells on the same row, but only one column can be
              in the solution.
            </p>
          </div>
        </div>
        <div className="img-div">
          <img src={require("../assets/row.png")} alt="dlx" />
        </div>
      </div>
    </div>
  );
}

export default wiki;
