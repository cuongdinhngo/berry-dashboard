/**
 * Format a number to a readable string with K, M, B, T suffixes
 * @param num - The number to format
 * @param digits - Number of decimal places (default: 1)
 * @returns Formatted string
 * 
 * Examples:
 * formatNumber(12000) => "12K"
 * formatNumber(3450) => "3.4K"
 * formatNumber(1500000) => "1.5M"
 * formatNumber(2300000000) => "2.3B"
 */
export function formatNumber(num: number, digits: number = 1): string {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" }
  ];
  
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

/**
 * Format currency with appropriate suffixes
 * @param num - The number to format
 * @param currency - Currency symbol (default: "$")
 * @param digits - Number of decimal places (default: 1)
 * @returns Formatted currency string
 * 
 * Examples:
 * formatCurrency(12000) => "$12K"
 * formatCurrency(3450, "€") => "€3.4K"
 */
export function formatCurrency(num: number, currency: string = "$", digits: number = 1): string {
  return currency + formatNumber(num, digits);
}
