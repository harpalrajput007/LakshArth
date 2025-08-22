import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { fetchMarketData, getMarketStatus } from "../services/marketDataService";

const TopBar = () => {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [marketData, setMarketData] = useState({
    nifty: {
      value: 22450.75,
      change: 125.50,
      percentChange: 0.56
    },
    sensex: {
      value: 73850.25,
      change: 425.75,
      percentChange: 0.58
    }
  });
  const [marketStatus, setMarketStatus] = useState({
    isOpen: true,
    lastUpdate: new Date().toLocaleTimeString('en-IN')
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch and update market data
  useEffect(() => {
    const updateMarketData = async () => {
      try {
        const data = await fetchMarketData();
        setMarketData(data);
        setMarketStatus(getMarketStatus());
      } catch (error) {
        console.error('Error updating market data:', error);
      }
    };

    // Initial fetch
    updateMarketData();

    // Update every 30 seconds (to avoid API rate limits)
    const interval = setInterval(updateMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatPercent = (percent) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <div className="topbar-container">
      <div className="market-section">
        <div className="market-status">
          <span className={`status-indicator ${marketStatus.isOpen ? 'open' : 'closed'}`}>
            {marketStatus.isOpen ? '●' : '○'}
          </span>
          <span className="status-text">
            {marketStatus.isOpen ? 'Market Open' : 'Market Closed'}
          </span>
          <span className="last-update">
            Last: {marketStatus.lastUpdate}
          </span>
        </div>
        
        <div className="indices-container">
          <div className="index-card nifty">
            <div className="index-header">
              <p className="index-name">NIFTY 50</p>
              <span className="index-symbol">NSE</span>
            </div>
            <div className="index-values">
              <p className="index-points">{formatNumber(marketData.nifty.value)}</p>
              <div className="index-change">
                <span className={`change-value ${marketData.nifty.change >= 0 ? 'positive' : 'negative'}`}>
                  {formatChange(marketData.nifty.change)}
                </span>
                <span className={`change-percent ${marketData.nifty.percentChange >= 0 ? 'positive' : 'negative'}`}>
                  {formatPercent(marketData.nifty.percentChange)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="index-card sensex">
            <div className="index-header">
              <p className="index-name">SENSEX</p>
              <span className="index-symbol">BSE</span>
            </div>
            <div className="index-values">
              <p className="index-points">{formatNumber(marketData.sensex.value)}</p>
              <div className="index-change">
                <span className={`change-value ${marketData.sensex.change >= 0 ? 'positive' : 'negative'}`}>
                  {formatChange(marketData.sensex.change)}
                </span>
                <span className={`change-percent ${marketData.sensex.percentChange >= 0 ? 'positive' : 'negative'}`}>
                  {formatPercent(marketData.sensex.percentChange)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Menu />

      {user && (
        <div className="user-profile">
          <div 
            className="profile-avatar"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span>{getInitials(user.firstName, user.lastName)}</span>
          </div>
          
          {showProfileMenu && (
            <div className="profile-menu">
              <div className="profile-info">
                <p className="user-name">{user.firstName} {user.lastName}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <div className="profile-actions">
                <button className="profile-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopBar;
