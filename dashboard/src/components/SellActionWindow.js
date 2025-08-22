import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userHolding, setUserHolding] = useState(null);
  const [maxQuantity, setMaxQuantity] = useState(1);

  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    // Fetch user's holdings for this stock when component mounts
    const fetchUserHolding = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3002/getHolding/${uid}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.exists) {
          setUserHolding(response.data.holding);
          setMaxQuantity(response.data.holding.qty);
          setStockQuantity(Math.min(1, response.data.holding.qty));
        } else {
          setErrorMessage("You don't own any shares of this stock");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setErrorMessage("Authentication required");
        } else {
          setErrorMessage("Error fetching your holdings");
        }
      }
    };

    fetchUserHolding();
  }, [uid]);

  const handleSellClick = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:3002/validateSellOrder", {
        name: uid,
        qty: parseInt(stockQuantity),
        price: parseFloat(stockPrice),
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Sell order response:", response.data); // Debug log

      if (response.data.success) {
        alert(response.data.message);
        generalContext.closeSellWindow();
      } else {
        // Handle case where success is false but no error was thrown
        setErrorMessage(response.data.message || "Sell order failed");
      }
    } catch (error) {
      console.error("Sell order error:", error); // Debug log
      
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage(`Network error: ${error.message}`);
      } else {
        setErrorMessage("An error occurred while processing your sell order");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty <= maxQuantity && newQty > 0) {
      setStockQuantity(newQty);
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        {userHolding && (
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '10px', 
            marginBottom: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <strong>Your Holdings:</strong> {userHolding.qty} shares of {uid}
            <br />
            <small>Average Cost: ₹{userHolding.avg?.toFixed(2) || 'N/A'}</small>
          </div>
        )}
        
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={handleQuantityChange}
              value={stockQuantity}
              min="1"
              max={maxQuantity}
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
            onClick={handleSellClick}
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
          >
            {isLoading ? 'Processing...' : 'Sell'}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;