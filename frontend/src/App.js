import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Register from './Pages/views/Register';
import Login from './Pages/views/Login';

function ProtectedRoute() {
  let isAuthenticated = localStorage.getItem("task_management_token")
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;