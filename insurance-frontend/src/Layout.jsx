export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      {children}
    </div>
  );
}
