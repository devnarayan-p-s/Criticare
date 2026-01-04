import { useNavigate } from "react-router-dom";
import Layout from "../Layout"; // Import Layout

export default function Step5() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Step 5: ML Risk Assessment</h2>

      <p>Approval Probability: <strong>0.72</strong></p>
      <p>Risk Level: <strong style={{color: 'orange'}}>MEDIUM</strong></p>

      <button onClick={() => navigate("/status")}>
        Proceed →
      </button>
    </Layout>
  );
}