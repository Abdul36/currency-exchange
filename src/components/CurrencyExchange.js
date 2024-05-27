import React, { useState, useEffect } from "react";

const CurrencyExchange = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data.rates);
        setCurrencyOptions(Object.keys(data.rates));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleExchange = () => {
    const converted = amount * exchangeRates[toCurrency];
    setConvertedAmount(converted);
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <button onClick={handleExchange}>Exchange</button>
      <p>
        Converted Amount: {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default CurrencyExchange;
