import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ReportLostItem from "./pages/ReportLostItem";
import ItemsList from "./components/ItemList";
import AdminVerification from "./components/AdminVerification";
import AdminPanel from "./pages/AdminPanel";
import ItemDetails from "./components/ItemDetails";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/report-lost-item"
    element={
      <ProtectedRoute>
        <ReportLostItem />
      </ProtectedRoute>
    }
  />

  {/* Admin Routes */}
  <Route path="/admin" element={<AdminPanel />} />
  <Route
    path="/admin/verify-items"
    element={
      <ProtectedRoute adminOnly={true}>
        <AdminVerification />
      </ProtectedRoute>
    }
  />

  {/* Item Routes */}
  <Route path="/items/status/:status" element={<ItemsList />} />
  <Route path="/items/:id" element={<ItemDetails />} />
  <Route path="/items" element={<ItemsList />} />
</Routes>
    </>
  );
}

export default App;
  