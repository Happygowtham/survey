import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Login from './Pages/views/Login';
import CreateForm from './Pages/views/CreateForm';
import FormsLandingPage from './Pages/views/FormsLandingPage';
import ResponseForm from './Pages/views/ResponseForm.js';
import ViewResponses from './Pages/views/ViewResponses.js';


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
        <Route path="/form-response/:id" element={<ResponseForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/form" element={<FormsLandingPage />} />
          <Route path="/add-form/:id" element={<CreateForm />} />
          <Route path="/responses" element={<ViewResponses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;