import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { api } from "../api";

export default function Step2() {
  const navigate = useNavigate();

  const submit = async () => {
    try {
      // HARD FIX: admission must exist in backend
      const admission_id = "ADM123";

      const res = await api.post("/insurance/preauth", {
        admission_id,
        insurer_name: "ABC Insurance",
        policy_number: "POL123",
        policy_type: "Health",
        sum_insured: 500000,
        estimated_cost: 120000,
      });

      // DEFENSIVE extraction (no guessing anymore)
      const claim_id =
        res?.data?.claim?.claim_id ||
        res?.data?.claim_id;

      if (!claim_id) {
        alert("Claim created but claim_id missing");
        return;
      }

      // STORE properly
      localStorage.setItem("claim_id", claim_id);

      // POPUP AS YOU ASKED
      alert(`✅ Claim Created Successfully\nClaim ID: ${claim_id}`);

      // MOVE TO STEP 3
      navigate("/upload");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create claim");
    }
  };

  return (
    <Layout>
      <h2>Step 2: Create Pre-Authorization</h2>
      <p>Admission ID: ADM123</p>

      <button onClick={submit}>
        Create Claim (Backend)
      </button>
    </Layout>
  );
}
