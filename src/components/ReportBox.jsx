function ReportBox({ reportText, onGenerate, onCopy, message }) {

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');

    textArea.value = text;

    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');

      if (successful) {
        alert('Report copied successfully');

        if (onCopy) {
          onCopy();
        }
      } else {
        alert('Failed to copy report');
      }
    } catch (err) {
      alert('Failed to copy report');
    }

    document.body.removeChild(textArea);
  };

  const handleCopy = async () => {

    if (!reportText || reportText.trim() === '') {
      alert('Generate report first');
      return;
    }

    // Try modern clipboard API first
    try {

      if (navigator.clipboard && window.isSecureContext) {

        await navigator.clipboard.writeText(reportText);

        alert('Report copied successfully');

        if (onCopy) {
          onCopy();
        }

      } else {

        // Fallback for mobile/local network/non-https
        fallbackCopyTextToClipboard(reportText);

      }

    } catch (err) {

      // If modern API fails, fallback
      fallbackCopyTextToClipboard(reportText);

    }
  };

  return (
    <div className="report-card">

      <div className="report-header">
        <h2>DAILY REPORT</h2>
        <p>Generate and copy the attendance summary instantly.</p>
      </div>

      <div className="report-actions">

        <button
          className="secondary-button"
          onClick={onGenerate}
          type="button"
        >
          Generate Report
        </button>

        <button
          className="primary-button"
          onClick={handleCopy}
          type="button"
        >
          Copy Report
        </button>

      </div>

      <textarea
        readOnly
        value={reportText}
        placeholder="Your generated report will appear here..."
        className="report-textarea"
      />

    </div>
  );
}

export default ReportBox;