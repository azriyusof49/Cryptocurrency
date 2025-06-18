document
  .getElementById("exchange-rate-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const target_currency = document
      .getElementById("target-currency")
      .value.trim();
    const target_crypto = document.getElementById("target-crypto").value;
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "Loading...";

    const url = `/api/exchange-rate?target_currency=${encodeURIComponent(
      target_currency
    )}&target_crypto=${encodeURIComponent(target_crypto)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const rateCrypto = data.rate_crypto;
        const rateCurrency = data.rate_currency;
        const result = rateCrypto * rateCurrency;

        resultDiv.innerHTML = `
          <div class="result-display bg-white bg-opacity-10 rounded-xl p-5 text-center">
              <p class="text-blue-100 mb-2">Conversion Result</p>
              <div class="flex items-center justify-center">
                  <span class="text-3xl font-bold text-white">1 ${target_crypto.toUpperCase()}</span>  =
                  <span class="text-3xl font-bold text-green-400 ml-2">${target_currency.toUpperCase()} ${result.toFixed(2)}</span>
              </div>
              <p class="text-blue-200 mt-2"><span id="resultCurrencyName">1 USD = ${target_currency.toUpperCase()} ${rateCurrency}</span></p>
          </div>
      `;
      } else {
        resultDiv.textContent = data.error || "Error fetching exchange rate.";
      }
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "Network error.";
    }
  });

document
  .getElementById("insightBtn")
  .addEventListener("click", async function () {
    const target_currency = document
      .getElementById("target-currency")
      .value.trim();
    const target_crypto = document.getElementById("target-crypto").value;
    const resultDiv = document.getElementById("result_insight");

    const message = `Provide a detailed insight into recent trends and changes in global currency values and 
cryptocurrency markets. Focus on major global currencies ${target_currency} and popular cryptocurrencies ${target_crypto}. 
Highlight the economic, political, or technological factors driving these changes. Include comparisons, notable shifts in exchange 
rates or market caps, and any predictions or expert analyses about future trends in fiat and crypto currencies.`;

    resultDiv.textContent = "Loading...";

    try {
      const response = await fetch("/api/exchange-rate/insight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.success) {
        resultDiv.innerHTML = `
          <div class="bg-white bg-opacity-10 rounded-xl p-5 text-center">
              <h2 class="text-xl font-bold mb-2">Insight</h2>
              <p>${data.reply}</p>
          </div>
      `;
      } else {
        resultDiv.textContent = data.error || "Error fetching insight.";
      }
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "Network error.";
    }
  });

  const now = new Date();
  document.getElementById('updateTime').textContent = now.toLocaleString();