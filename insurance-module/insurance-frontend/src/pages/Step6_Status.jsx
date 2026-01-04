import { useNavigate } from "react-router-dom";
import Layout from "../Layout"; // Import Layout

export default function Step6() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Step 6: Update Claim Status</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
        <button onClick={() => alert("Status set to PENDING")} style={{background: '#94a3b8'}}>
          Set PENDING
        </button>

        <button onClick={() => alert("Status set to QUERY")} style={{background: '#f59e0b'}}>
          Set QUERY
        </button>

        <button onClick={() => navigate("/settlement")}>
          APPROVE CLAIM
        </button>

        <button onClick={() => alert("Status set to REJECTED")} style={{background: '#ef4444'}}>
          REJECT CLAIM
        </button>
      </div>
    </Layout>
  );
}