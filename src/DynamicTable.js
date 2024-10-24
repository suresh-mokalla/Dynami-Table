import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DynamicTable() {
  const [showModal, setShowModal] = useState(false);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [tableData, setTableData] = useState([]);

  // Function to open modal
  const handleShow = () => setShowModal(true);

  // Function to close modal
  const handleClose = () => setShowModal(false);

  // Function to create the table
  const createTable = () => {
    const initialTable = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => "")
    );
    setTableData(initialTable);
    handleClose();
  };

  // Function to handle input changes for cells
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;
    setTableData(newTableData);
  };

  // Function to insert a row above
  const insertRowAbove = (index) => {
    const newRow = Array(numCols).fill(""); // Create an empty row with input fields
    const newTable = [...tableData]; // Create a copy of the current table data
    newTable.splice(index, 0, newRow); // Insert the new row above the specified index
    setTableData(newTable); // Update the state with the new rows
  };

  // Function to insert a row below
  const insertRowBelow = (index) => {
    const newRow = Array(numCols).fill(""); // Create an empty row with input fields
    const newTable = [...tableData]; // Create a copy of the current table data
    newTable.splice(index + 1, 0, newRow); // Insert the new row below the specified index
    setTableData(newTable); // Update the state with the new rows
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button onClick={handleShow}>Create Table</Button>

        {/* Modal for creating table */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="row">
                <div className="col">
                  <Form.Group controlId="formNumRows">
                    <Form.Label>Number of Rows</Form.Label>
                    <Form.Control
                      type="number"
                      value={numRows}
                      onChange={(e) => setNumRows(parseInt(e.target.value, 10))}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="formNumCols">
                    <Form.Label>Number of Columns</Form.Label>
                    <Form.Control
                      type="number"
                      value={numCols}
                      onChange={(e) => setNumCols(parseInt(e.target.value, 10))}
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createTable}>
              Create Table
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Render the dynamic table */}
        {tableData.length > 0 && (
          <table className="table table-bordered mt-3">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Three dots menu in a separate column */}
                  <td className="position-relative">
                    <div className="three-dots-menu">
                      <button className="three-dots-button">⋮</button>
                      <div className="dropdown-menu">
                        <button onClick={() => insertRowAbove(rowIndex)}>
                          Insert Above
                        </button>
                        <button onClick={() => insertRowBelow(rowIndex)}>
                          Insert Below
                        </button>
                      </div>
                    </div>
                  </td>
                  {/* Render input fields in the remaining columns */}
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default DynamicTable;
