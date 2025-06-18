require("dotenv").config();
// exchangeRate.js
const express = require("express");
const axios = require("axios");

const router = express.Router();
const EXCHANGE_RATE_API_URL = "https://api.exchangerate-api.com/v4/latest/";
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";
const COHERE_API_URL = "https://api.cohere.ai/generate";

// Map crypto symbols to CoinGecko IDs
const symbolToId = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
};

router.post("/insight", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  try {
    const response = await axios.post(COHERE_API_URL,
      {
        model: "command",
        prompt: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Try to get the reply from generations[0].text or from text
    let reply = null;
    if (
      response.data &&
      response.data.generations &&
      response.data.generations[0] &&
      response.data.generations[0].text
    ) {
      reply = response.data.generations[0].text;
    } else if (response.data && response.data.text) {
      reply = response.data.text;
    } else {
      console.error("Cohere API unexpected response:", response.data);
      return res.status(500).json({
        success: false,
        error: "Cohere API returned an unexpected response.",
      });
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error("Cohere API error:", error.response?.data || error.message || error);
    res.status(500).json({
      success: false,
      error: "Error communicating with Cohere API.",
    });
  }
});

router.get("/", async (req, res) => {
  const { target_currency, target_crypto } = req.query;
  if (!target_currency || !target_crypto) {
    return res.json({
      success: false,
      error: "Missing target currency or target crypto.",
    });
  }

  try {
    // Currency-to-currency using ExchangeRate API (USD to target_currency)
    const response_curr = await axios.get(`${EXCHANGE_RATE_API_URL}USD`);
    const rate_currency =
      response_curr.data.rates[target_currency.toUpperCase()];

    // Crypto-to-currency using CoinGecko (target_crypto to USD)
    const coinId = symbolToId[target_crypto.toUpperCase()];
    let rate_crypto = null;
    if (coinId) {
      const response_coin = await axios.get(COINGECKO_API_URL, {
        params: {
          ids: coinId,
          vs_currencies: "usd",
        },
      });
      rate_crypto = response_coin.data[coinId]?.usd;
    }

    if (!rate_currency) {
      return res.json({ success: false, error: "Invalid target currency." });
    }
    if (!rate_crypto) {
      return res.json({ success: false, error: "Invalid crypto symbol." });
    }

    return res.json({ success: true, rate_currency, rate_crypto });
  } catch (error) {
    res.json({ success: false, error: "Error fetching exchange rates." });
  }
});

module.exports = router;
