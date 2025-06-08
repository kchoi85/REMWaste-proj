import './step-header.css';

export function StepHeader() {
  return (
    <nav className="step-nav">
      <span className="step">Postcode</span>
      <span className="step">Waste Type</span>
      <span className="step active">Select Skip</span>
      <span className="step">Permit Check</span>
      <span className="step">Choose Date</span>
      <span className="step">Payment</span>
    </nav>
  );
}
