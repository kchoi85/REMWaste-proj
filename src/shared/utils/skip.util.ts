export function calculatePriceWithVat(
  priceBeforeVat: number,
  vatRate: number
): number {
  return parseFloat((priceBeforeVat * (1 + vatRate / 100)).toFixed(2));
}
