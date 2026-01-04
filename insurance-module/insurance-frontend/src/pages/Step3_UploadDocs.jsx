import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { api } from "../api";

export default function Step3() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    const claim_id = localStorage.getItem("claim_id");

    if (!claim_id) {
      alert("❌ Claim ID missing. Go back to Step 2.");
      return;
    }

    if (!file) {
      alert("❌ Please select a file");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("document", file);

      await api.post(
        `/insurance/claim/${claim_id}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Document uploaded & OCR completed");
      navigate("/risk");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload document");
    }
  };

  return (
    <Layout>
      <h2>Step 3: Upload Medical Documents</h2>

      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={upload}>
        Upload & Run OCR
      </button>
    </Layout>
  );
}
