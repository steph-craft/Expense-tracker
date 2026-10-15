export function convertToBase(amount, fromCurrency, rates) {
  if (!rates || typeof rates[fromCurrency] !== "number" || rates[fromCurrency] === 0) {
    return null;
  }
  return amount / rates[fromCurrency];
}

export function calculateTotal(expenses, rates) {
  return expenses.reduce((total, expense) => {
    const converted = convertToBase(expense.amount, expense.currency, rates);
    return total + (converted ?? 0);
  }, 0);
}

export function filterByCategory(expenses, category) {
  if (!category || category === "All") {
    return expenses;
  }
  return expenses.filter((expense) => expense.category === category);
}


export function formatCurrency(value, currencyCode) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return `0.00 ${currencyCode}`;
  }
  return `${value.toFixed(2)} ${currencyCode}`;
}


export function sortCurrencyCodes(rates) {
  if (!rates) {
    return [];
  }
  return Object.keys(rates).sort();
}