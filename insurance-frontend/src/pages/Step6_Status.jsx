import { useNavigate } from "react-router-dom";

export default function Step6() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Step 6: Update Claim Status</h2>

      <button onClick={() => alert("Status set to PENDING")}>
        PENDING
      </button>

      <button onClick={() => alert("Status set to QUERY")}>
        QUERY
      </button>

      <button onClick={() => navigate("/settlement")}>
        APPROVE
      </button>

      <button onClick={() => alert("Status set to REJECTED")}>
        REJECT
      </button>
    </div>
  );
}
