import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Login from './Pages/views/Login';
import Forms from './Pages/views/Forms';

function ProtectedRoute() {
  let isAuthenticated = localStorage.getItem("survey_management_token")
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
        <Route element={<ProtectedRoute />}>
          <Route path="/form" element={<Forms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;