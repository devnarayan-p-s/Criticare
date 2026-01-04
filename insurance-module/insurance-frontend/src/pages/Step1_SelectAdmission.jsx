import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

export default function Step1() {
  const navigate = useNavigate();

  const selectAdmission = () => {
    localStorage.setItem("admission_id", "ADM123"); // ✅ FIX
    navigate("/preauth");
  };

  return (
    <Layout>
      <h2>Step 1: Select Admission</h2>
      <p>Mock Admission: ADM123</p>

      <button onClick={selectAdmission}>
        Continue
      </button>
    </Layout>
  );
}
