// Pure utility functions — no fetch, no DOM. These are what we unit test.

export function convertAmount(amount, rate) {
  if (typeof rate !== 'number' || rate <= 0) {
    return amount; // if rate missing or invalid, return original amount
  }
  return amount * rate;
}

export function calculateTotal(expenses, rates,) {
  return expenses.reduce((sum, expense) => {
    const rate = rates[expense.currency];
    return sum + convertAmount(expense.amount, rate);
  }, 0);
}

export function filterByCategory(expenses, category) {
  if (category === 'All') {
    return expenses;
  }
  return expenses.filter((expense) => expense.category === category);
}

export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
