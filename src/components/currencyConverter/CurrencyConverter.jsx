import React, { useState, useEffect } from "react";
import axios from "axios";
import "./converter.scss";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates));
        setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
        setError("");
      })
      .catch((error) => {
        setError("Failed to fetch currency data. Please try again later.");
        console.error(error);
      });
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="container text-center">
      <div className="card mt-3" id="card">
        <div className="section">
          <label className="label">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />
        </div>
        <div className="section">
          <label className="label">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="select"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="section">
          <label className="label">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="select"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {convertedAmount && (
          <p className="result text-primary">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
