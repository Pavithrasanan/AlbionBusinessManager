export default function TopBar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <h2>🏰 Albion Business Manager</h2>

      <input
        placeholder="Search items..."
        style={{
          width: "300px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <span>🔔</span>

        <span>👤 Pavithrasanan</span>
      </div>
    </div>
  );
}