function formatCurrency(value: number): string {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatter.format(value);
}

function formatPercent(value: number): string {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}
export { formatCurrency, formatPercent };
