// state.js
//  Builds a new expense object with a unique id.
export function createExpense({ description, amount, currency, category }) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return { id, description, amount, currency, category };
}

// Adds a new expense to the array WITHOUT mutating the original array.
//   Spread operator use #1: array spread.
 
export function addExpense(expenses, newExpense) {
  return [...expenses, newExpense];
}

// Removes an expense by id, returning a new filtered array.
export function removeExpense(expenses, id) {
  return expenses.filter((expense) => expense.id !== id);
}

//  Updates a single field (category) on one expense, without mutating
//  the original expense object or array.
//  Spread operator use #2: object spread, inside an array map.

export function updateExpenseCategory(expenses, id, newCategory) {
  return expenses.map((expense) =>
    expense.id === id ? { ...expense, category: newCategory } : expense
  );
}