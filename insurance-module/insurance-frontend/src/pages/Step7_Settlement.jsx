import Layout from "../Layout"; // Import Layout

export default function Step7() {
  return (
    <Layout>
      <h2>Step 7: Settlement</h2>

      <p>Claim approved and settled.</p>
      <p>Insurer pays hospital directly.</p>

      <button onClick={() => alert("Cashless settlement completed")}>
        Finish Process
      </button>
    </Layout>
  );
}