import React, { useState, useEffect } from "react";
// import "./CurrencyExchange.css"; // Import CSS file for styling

const CurrencyExchange = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetch(
      "http://data.fixer.io/api/latest?access_key=ce1474595ef8a8831f801460a457a6e8"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExchangeRates(data.rates);
        setCurrencyOptions(Object.keys(data.rates));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);
    const converted = newAmount * exchangeRates[toCurrency];
    setConvertedAmount(isNaN(converted) ? 0 : converted);
  };

  const handleExchange = () => {
    const converted = amount * exchangeRates[toCurrency];
    setConvertedAmount(isNaN(converted) ? 0 : converted);
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-section">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="currency-select"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="arrow">→</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="currency-select"
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleExchange} className="exchange-btn">
        Exchange
      </button>
      <p className="converted-amount">
        Converted Amount: {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default CurrencyExchange;
