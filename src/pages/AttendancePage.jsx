import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAttendance, subscribeAttendance } from '../services/attendanceService.js';
import { getTodayDate } from '../utils/dateUtils.js';
import { generateAttendanceReport } from '../utils/reportGenerator.js';
import AttendanceList from '../components/AttendanceList.jsx';
import ReportBox from '../components/ReportBox.jsx';

const statusOptions = [
  { key: 'Present in office', label: 'Present in office', color: 'green' },
  { key: 'Present in yard', label: 'Present in yard', color: 'blue' },
  { key: 'Late arrival', label: 'Late arrival', color: 'yellow' },
  { key: 'On leave', label: 'On leave', color: 'orange' },
  { key: 'Sick leave', label: 'Sick leave', color: 'red' },
  { key: 'Half day leave', label: 'Half day leave', color: 'purple' },
];

function AttendancePage() {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState({});
  const [reportText, setReportText] = useState('');
  const [message, setMessage] = useState('');
  const selectedEmployee = localStorage.getItem('selectedEmployee') || '';
  const today = getTodayDate();

  useEffect(() => {
    if (!selectedEmployee || !selectedEmployee.trim()) {
      navigate('/', { replace: true });
      return;
    }

    const unsubscribe = subscribeAttendance((data) => {
      setAttendanceData(data);
    });
    return () => unsubscribe();
  }, [navigate, selectedEmployee]);

  const selectedStatus = useMemo(() => {
    return attendanceData[selectedEmployee]?.status || '';
  }, [attendanceData, selectedEmployee]);

  const handleSelect = async (status) => {
    if (!selectedEmployee) return;
    await updateAttendance(selectedEmployee, status);
  };

  const handleGenerateReport = () => {
    const formatted = generateAttendanceReport(attendanceData, today);
    setReportText(formatted);
    setMessage('Report generated.');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleCopyReport = async () => {
    if (!reportText) {
      setMessage('Generate the report first.');
      setTimeout(() => setMessage(''), 2500);
      return;
    }
    await navigator.clipboard.writeText(reportText);
    setMessage('Report copied to clipboard.');
    setTimeout(() => setMessage(''), 2500);
  };

  

  return (
    <div className="page-shell attendance-shell">
      <header className="header-section">
        <div className="header-content">
          <h1 className="header-title">Daily Attendance</h1>
          <div className="header-info">
            <p><strong>Date:</strong> {today}</p>
            <p><strong>Name:</strong> {selectedEmployee}</p>
          </div>
        </div>
      </header>

      <section className="attendance-section">
        <h2 className="section-title">Enter Your Attendance</h2>

        <AttendanceList
          options={statusOptions}
          attendanceData={attendanceData}
          selectedStatus={selectedStatus}
          onSelect={handleSelect}
        />

        <ReportBox
          reportText={reportText}
          onGenerate={handleGenerateReport}
          onCopy={handleCopyReport}
          message={message}
        />

       
      </section>
    </div>
  );
}

export default AttendancePage;
