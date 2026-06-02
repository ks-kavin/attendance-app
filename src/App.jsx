import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';

function ProtectedRoute({ children }) {
  const selectedEmployee =
    localStorage.getItem('selectedEmployee');

  if (!selectedEmployee) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
