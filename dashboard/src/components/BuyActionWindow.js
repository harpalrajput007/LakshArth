import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyClick = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:3002/validateBuyOrder", {
        name: uid,
        qty: parseInt(stockQuantity),
        price: parseFloat(stockPrice),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        alert(response.data.message);
        GeneralContext.closeBuyWindow();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while processing your buy order");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min="0"
            />
          </fieldset>
        </div>
        
        {errorMessage && (
          <div style={{ 
            color: 'red', 
            fontSize: '0.8rem', 
            marginTop: '10px',
            padding: '8px',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px',
            border: '1px solid #ff9999'
          }}>
            {errorMessage}
          </div>
        )}
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link 
            className={`btn ${isLoading ? 'btn-grey' : 'btn-blue'}`} 
            onClick={handleBuyClick}
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
          >
            {isLoading ? 'Processing...' : 'Buy'}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
