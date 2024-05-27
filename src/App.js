import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRates();
  }, [amount, toCurrency]);

  const fetchExchangeRates = () => {
    fetch(
      `https://v6.exchangerate-api.com/v6/3e55e2db16acecc7e256b7f6/latest/${fromCurrency}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        return response.json();
      })
      .then((data) => {
        setExchangeRates(data.conversion_rates);
        setConvertedAmount(amount * data.conversion_rates[toCurrency]);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleExchange = () => {
    setConvertedAmount(amount * exchangeRates[toCurrency]);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input type="number" value={amount} onChange={handleAmountChange} />
      <select value={fromCurrency} onChange={handleFromCurrencyChange}>
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select value={toCurrency} onChange={handleToCurrencyChange}>
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={handleExchange}>Exchange</button>
      {error && <p>{error}</p>}
      <h3>
        Converted Amount:{" "}
        {convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
      </h3>
    </div>
  );
};

export default CurrencyConverter;
