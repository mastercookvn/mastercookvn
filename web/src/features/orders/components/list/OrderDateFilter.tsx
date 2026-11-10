export function OrderDateFilter() {
  return (
    <div className="filter-bar">
      <input
        id="orders-from"
        type="text"
        className="input"
        defaultValue="01/10/2026"
        aria-label="Ngày tiệc từ"
      />
      <input
        id="orders-to"
        type="text"
        className="input"
        defaultValue="31/12/2026"
        aria-label="Ngày tiệc đến"
      />
    </div>
  );
}
