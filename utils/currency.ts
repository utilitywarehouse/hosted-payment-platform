export const formatGBP = (value?: number | null) => {
  if (typeof value === "undefined" || value === null || Number.isNaN(value))
    return "-";

  const parsedValue = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(parsedValue);
};
