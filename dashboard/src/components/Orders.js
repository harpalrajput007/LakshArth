import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3002/allOrders", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAllOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          // Redirect to login if token is invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else {
          setError("Failed to load orders");
        }
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getOrderStatus = (order) => {
    // For now, we'll assume all orders are completed
    // In a real system, you'd have status tracking
    return "Completed";
  };

  const getOrderTypeClass = (mode) => {
    return mode === "BUY" ? "buy-order" : "sell-order";
  };

  if (loading) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders">
        <h3 className="title">Orders</h3>
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>

      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Transaction Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                const total = order.qty * order.price;
                return (
                  <tr key={index} className={getOrderTypeClass(order.mode)}>
                    <td>{formatDate(order.timestamp || order._id)}</td>
                    <td className="align-left">{order.name}</td>
                    <td>
                      <span className={`order-type ${order.mode.toLowerCase()}`}>
                        {order.mode}
                      </span>
                    </td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>₹{total.toFixed(2)}</td>
                    <td>
                      <span className="status completed">
                        {getOrderStatus(order)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
