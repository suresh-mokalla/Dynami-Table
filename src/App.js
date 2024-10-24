import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicTable from './DynamicTable'; // Adjust the path if necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h3 style={{textAlign:"center"}}>Dynamic Table</h3>
        <Routes>
          <Route path="/dynamic-table" element={<DynamicTable />} />
          <Route path="/" element={
            <>
              <h2>Welcome to the Dynamic Table App</h2>
              <p>
                Go to <a href="/dynamic-table">Dynamic Table</a> to create a table.
              </p>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
