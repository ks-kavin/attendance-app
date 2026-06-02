function AttendanceCard({ option, count, names, selected, onSelect }) {
  return (
    <button
      className={`attendance-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(option.key)}
      type="button"
    >
      <div className="card-title-row">
        <span className={`status-dot ${option.color}`}></span>
        <div>
          <h3>{option.label}</h3>
          <p className="status-count">{count} {count === 1 ? 'member' : 'members'}</p>
        </div>
      </div>
      {names.length > 0 ? (
        <ul className="user-list">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-text">No entries yet</p>
      )}
    </button>
  );
}

export default AttendanceCard;
