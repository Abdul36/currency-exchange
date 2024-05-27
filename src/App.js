import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [convertedTo, setConvertedTo] = useState(""); // State to hold the currency it is converted to
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRates();
  }, [toCurrency]); // Fetch exchange rates only when "toCurrency" changes

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
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleExchange = () => {
    if (!isNaN(amount)) {
      // Check if the amount is a valid number
      const converted = amount * exchangeRates[toCurrency];
      setConvertedAmount(converted);
      setConvertedTo(toCurrency); // Set the currency it is converted to
    } else {
      setConvertedAmount(null);
      setConvertedTo("");
      setError("Please enter a valid amount");
    }
  };

  return (
    <div className="container">
      <h2 className="pb-2">Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
      />
      <select
        className="ms-2"
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        className="ms-2"
        value={toCurrency}
        onChange={handleToCurrencyChange}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
      <button className="ms-2 mt-1 btn btn-primary" onClick={handleExchange}>
        Exchange
      </button>
      {error && <p>{error}</p>}
      <h3 className="mt-2">
        {convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
        {convertedTo && ` ${toCurrency}`}{" "}
        {/* Display the currency it is converted to */}
      </h3>
    </div>
  );
};

export default CurrencyConverter;
