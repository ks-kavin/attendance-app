import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employees } from '../data/employees.js';

function LoginPage() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee && savedEmployee.trim()) {
      navigate('/attendance', { replace: true });
    }
  }, [navigate]);

  const handleContinue = (event) => {
    event.preventDefault();
    if (!selectedEmployee) {
      setError('Please choose your name before continuing.');
      return;
    }

    localStorage.setItem('selectedEmployee', selectedEmployee);
    navigate('/attendance');
  };

  return (
    <div className="page-shell login-shell">
      <div className="card login-card">
        <h1>Select Your Name</h1>
        <p className="subtle-text">Pick your employee name to join the attendance poll.</p>
        <form onSubmit={handleContinue} className="form-stack">
          <label>
            Employee
            <select
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                setError('');
              }}
              className="select-input"
              autoFocus
            >
              <option value="">Select your name</option>
              {employees.map((employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="primary-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
