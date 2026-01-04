import { useNavigate } from "react-router-dom";

export default function Step5() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Step 5: ML Risk Assessment</h2>

      <p>Approval Probability: 0.72</p>
      <p>Risk Level: MEDIUM</p>

      <button onClick={() => navigate("/status")}>
        Proceed →
      </button>
    </div>
  );
}
