import AttendanceCard from './AttendanceCard.jsx';

function AttendanceList({ options, attendanceData, selectedStatus, onSelect }) {
  const grouped = options.map((option) => {
    const names = Object.entries(attendanceData)
      .filter(([, info]) => info.status === option.key)
      .map(([name]) => name)
      .sort((a, b) => a.localeCompare(b));
    return {
      ...option,
      names,
      count: names.length,
    };
  });

  return (
    <div className="attendance-grid">
      {grouped.map((group) => (
        <AttendanceCard
          key={group.key}
          option={group}
          count={group.count}
          names={group.names}
          selected={selectedStatus === group.key}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default AttendanceList;
