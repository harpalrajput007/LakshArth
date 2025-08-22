import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Read auth user from localStorage (same key used by dashboard)
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}

    // Capture redirected token/user from dashboard and persist
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const userParam = params.get('user');
      if (token && userParam) {
        const decodedUser = JSON.parse(atob(userParam));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decodedUser));
        setUser(decodedUser);

        // Clean the URL (remove token/user params)
        const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (firstName, lastName) => {
    const f = (firstName || '').charAt(0);
    const l = (lastName || '').charAt(0);
    return (f + l).toUpperCase() || 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowMenu(false);
    navigate('/');
  };

  // Compute login/register URL with redirect back to current frontend page
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'http://localhost:3000/';
  const loginUrl = `http://localhost:3001/login?redirect=${encodeURIComponent(currentUrl)}`;
  const registerUrl = `http://localhost:3001/register?redirect=${encodeURIComponent(currentUrl)}`;

  return (
    <nav className="navbar navbar-expand-lg bg-body-white border-bottom">
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img className='nav-logo' src="assets\\LAKSHARTH.png" style={{ width: '45%' }} alt="Logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginLeft: '400px' }}>
            {/* Removed Signup from static nav as requested */}
            <li className="nav-item">
              <Link className="nav-link active" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/support">Support</Link>
            </li>

            {/* Avatar - placed to the right of Support, with spacing matching nav links */}
            <li className="nav-item position-relative" ref={menuRef}>
              <div
                className="nav-link p-0"
                onClick={() => setShowMenu((s) => !s)}
                style={{ display: 'flex', alignItems: 'center' }}
                title={user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : 'Account'}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#2d6cdf',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  {user ? getInitials(user.firstName, user.lastName) : '👤'}
                </div>
              </div>

              {showMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 44,
                    right: 0,
                    minWidth: 200,
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                    borderRadius: 8,
                    padding: 8,
                    zIndex: 1000
                  }}
                >
                  {user ? (
                    <div>
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid #eee' }}>
                        <div style={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          background: '#f5f5f5',
                          border: '1px solid #e5e5e5',
                          borderRadius: 6,
                          padding: '8px 10px',
                          marginTop: 8,
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <a
                        href={loginUrl}
                        style={{ display: 'block', padding: '8px 10px', textDecoration: 'none', color: '#222', fontWeight: 600 }}
                        onClick={() => setShowMenu(false)}
                      >
                        Sign in
                      </a>
                      <a
                        href={registerUrl}
                        style={{ display: 'block', padding: '8px 10px', textDecoration: 'none', color: '#222', fontWeight: 600 }}
                        onClick={() => setShowMenu(false)}
                      >
                        Sign up
                      </a>
                    </div>
                  )}
                </div>
              )}
            </li>

            <i className="fa-solid fa-bars p-2 mt-1" style={{ marginLeft: '40px' }}></i>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;