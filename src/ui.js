import { convertToBase, formatCurrency, calculateTotal } from "./utils.js";

export function populateCurrencySelect(selectEl, currencyCodes, selectedValue) {
  selectEl.innerHTML = "";

  currencyCodes.forEach((code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = code;
    if (code === selectedValue) {
      option.selected = true;
    }
    selectEl.appendChild(option);
  });
}
export function renderExpenseList(listEl, emptyMessageEl, expenses, rates, homeCurrency, onDelete) {
  listEl.innerHTML = "";

  if (expenses.length === 0) {
    emptyMessageEl.hidden = false;
    return;
  }
  emptyMessageEl.hidden = true;

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.className = "expense-item";

    const info = document.createElement("div");
    info.className = "expense-info";

    const desc = document.createElement("p");
    desc.className = "expense-desc";
    desc.textContent = expense.description;

    const meta = document.createElement("p");
    meta.className = "expense-meta";
    meta.textContent = `${expense.category} \u2022 ${formatCurrency(expense.amount, expense.currency)}`;

    info.appendChild(desc);
    info.appendChild(meta);

    const converted = convertToBase(expense.amount, expense.currency, rates);
    const convertedText = document.createElement("p");
    convertedText.className = "expense-converted";
    convertedText.textContent =
      converted === null ? "Rate unavailable" : formatCurrency(converted, homeCurrency);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => onDelete(expense.id));

    li.appendChild(info);
    li.appendChild(convertedText);
    li.appendChild(deleteBtn);

    listEl.appendChild(li);
  });
}

export function renderTotal(totalEl, expenses, rates, homeCurrency) {
  const total = calculateTotal(expenses, rates);
  totalEl.textContent = formatCurrency(total, homeCurrency);
}

export function showStatus(bannerEl, message, type = "error") {
  bannerEl.textContent = message;
  bannerEl.className = `status-banner status-${type}`;
  bannerEl.hidden = false;
}

export function hideStatus(bannerEl) {
  bannerEl.hidden = true;
}
