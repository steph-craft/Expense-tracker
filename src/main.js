// main.js
// The entry point: wires api.js, state.js, utils.js and ui.js

import { fetchRates } from "./api.js";
import { addExpense, removeExpense, createExpense } from "./state.js";
import { filterByCategory, sortCurrencyCodes } from "./utils.js";
import {
  populateCurrencySelect,
  renderExpenseList,
  renderTotal,
  showStatus,
  hideStatus
} from "./ui.js";


let expenses = [];
let rates = {};
let homeCurrency = "USD";
let activeFilter = "All";

// ---------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------
const homeCurrencySelect = document.getElementById("home-currency");
const currencySelect = document.getElementById("currency");
const categoryFilterSelect = document.getElementById("category-filter");
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const emptyMessage = document.getElementById("empty-message");
const totalDisplay = document.getElementById("total-display");
const statusBanner = document.getElementById("status-banner");


async function loadRates(baseCurrency) {
  hideStatus(statusBanner);
  totalDisplay.textContent = "Loading rates...";

  const result = await fetchRates(baseCurrency);

  if (!result.success) {
    showStatus(
      statusBanner,
      `Could not load exchange rates (${result.error}). Totals may be inaccurate until this is resolved.`,
      "error"
    );
    return;
  }

  rates = result.rates;

  const currencyCodes = sortCurrencyCodes(rates);
  populateCurrencySelect(homeCurrencySelect, currencyCodes, homeCurrency);
  populateCurrencySelect(currencySelect, currencyCodes, currencySelect.value || "USD");

  refreshUI();
}

function refreshUI() {
  const visibleExpenses = filterByCategory(expenses, activeFilter);
  renderExpenseList(expenseList, emptyMessage, visibleExpenses, rates, homeCurrency, handleDelete);
  renderTotal(totalDisplay, expenses, rates, homeCurrency);
}

function handleDelete(id) {
  expenses = removeExpense(expenses, id);
  refreshUI();
}


expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = currencySelect.value;
  const category = document.getElementById("category").value;

  if (!description || Number.isNaN(amount) || amount <= 0) {
    showStatus(statusBanner, "Please enter a valid description and a positive amount.", "error");
    return;
  }

  const newExpense = createExpense({ description, amount, currency, category });
  expenses = addExpense(expenses, newExpense);

  expenseForm.reset();
  hideStatus(statusBanner);
  refreshUI();
});

categoryFilterSelect.addEventListener("change", (event) => {
  activeFilter = event.target.value;
  refreshUI();
});

homeCurrencySelect.addEventListener("change", (event) => {
  homeCurrency = event.target.value;
  loadRates(homeCurrency);
});


loadRates(homeCurrency);