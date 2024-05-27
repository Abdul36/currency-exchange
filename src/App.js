import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [convertedTo, setConvertedTo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRates = () => {
    if (!fromCurrency || !toCurrency) return;
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
      const converted = amount * exchangeRates[toCurrency];
      setConvertedAmount(converted);
      setConvertedTo(toCurrency);
    } else {
      setConvertedAmount(null);
      setConvertedTo("");
      setError("Please enter a valid amount");
    }
  };

  return (
    <Container className="pt-5">
      <h2 className="pb-2 text-center">Currency Converter</h2>
      <Form>
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Control
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </Col>
          <Col xs={6} md={4}>
            <Form.Select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="">Select currency</option>
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={4}>
            <Form.Select value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="">Select currency</option>
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={4}>
            <Button
              className="w-100"
              variant="primary"
              onClick={handleExchange}
            >
              Exchange
            </Button>
          </Col>
        </Row>
      </Form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      <h3 className="mt-3 text-center">
        {convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
        {convertedTo && ` ${toCurrency}`}
      </h3>
    </Container>
  );
};

export default CurrencyConverter;
