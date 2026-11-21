export function OrderDateFilter() {
  return (
    <div className="filter-bar">
      <input
        id="orders-from"
        type="text"
        className="input"
        placeholder="dd/MM/yyyy"
        aria-label="Ngày tiệc từ"
      />
      <input
        id="orders-to"
        type="text"
        className="input"
        placeholder="dd/MM/yyyy"
        aria-label="Ngày tiệc đến"
      />
    </div>
  );
}
