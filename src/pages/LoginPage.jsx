import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employees as employeesFallback } from '../data/employees.js';
import { APP_VERSION } from '../config.js';

function LoginPage() {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [error, setError] = useState('');
  const [employeeList, setEmployeeList] = useState(employeesFallback || []);

  useEffect(() => {
    const savedEmployee = localStorage.getItem('selectedEmployee');
    if (savedEmployee && savedEmployee.trim()) {
      navigate('/attendance', { replace: true });
    }
  }, [navigate]);

  // Attempt to fetch a fresh employee list from the server to avoid bundle caching.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/employees.json', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.employees) && json.employees.length > 0) {
            setEmployeeList(json.employees);
          }
        }
      } catch (e) {
        // ignore fetch errors and continue using fallback
      }
    })();
  }, []);

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
              {employeeList.map((employee) => (
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
