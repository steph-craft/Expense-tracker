const API_BASE_URL = "https://open.er-api.com/v6/latest";


export async function fetchRates(baseCurrency) {
  const url = `${API_BASE_URL}/${baseCurrency}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Exchange rate provider returned an unexpected response");
    }

    return {
      success: true,
      base: data.base_code,
      rates: data.rates
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch exchange rates"
    };
  }
}
