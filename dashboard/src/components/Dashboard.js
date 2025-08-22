import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import TopBar from "./TopBar";

// Stable layout component so it doesn't remount on route changes
const DashboardLayout = () => {
  return (
    <>
      <TopBar />
      <div className="dashboard-container">
        <GeneralContextProvider>
          <WatchList />
        </GeneralContextProvider>
        <div className="content">
          {/* Nested routes render here without remounting the layout */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      {/* Public auth routes (no TopBar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app with persistent layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Summary />} />
        <Route path="orders" element={<Orders />} />
        <Route path="holdings" element={<Holdings />} />
        <Route path="positions" element={<Positions />} />
        <Route path="funds" element={<Funds />} />
        <Route path="apps" element={<Apps />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
