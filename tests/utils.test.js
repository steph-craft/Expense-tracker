import { convertAmount, calculateTotal, filterByCategory } from '../src/utils.js';

describe('convertAmount', () => {
  test('converts using the rate', () => {
    expect(convertAmount(100, 0.85)).toBe(85);
  });

  test('returns original amount when rate is missing', () => {
    expect(convertAmount(50, undefined)).toBe(50);
  });

  test('returns original amount when rate is zero', () => {
    expect(convertAmount(50, 0)).toBe(50);
  });
});

describe('calculateTotal', () => {
  test('sums all expenses converted to home currency', () => {
    const expenses = [
      { id: 1, amount: 100, currency: 'EUR' },
      { id: 2, amount: 50, currency: 'GBP' },
    ];
    const rates = { EUR: 1.1, GBP: 1.3 };
    expect(calculateTotal(expenses, rates, 'USD')).toBeCloseTo(175);
  });

  test('returns 0 for empty list', () => {
    expect(calculateTotal([], {}, 'USD')).toBe(0);
  });
});

describe('filterByCategory', () => {
  test('returns only matching category', () => {
    const expenses = [
      { id: 1, category: 'Food' },
      { id: 2, category: 'Transport' },
    ];
    expect(filterByCategory(expenses, 'Food')).toHaveLength(1);
  });

  test('returns everything when category is All', () => {
    const expenses = [
      { id: 1, category: 'Food' },
      { id: 2, category: 'Transport' },
    ];
    expect(filterByCategory(expenses, 'All')).toHaveLength(2);
  });
});
