import TransactionsHistory from "@/components/transactionsHistory/TransactionsHistory";
import React, { useState, useEffect } from "react";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useFetch } from "@/hooks/useFetch";
import { useStateValue } from "@/context/index";

const Home = () => {
  const { state, dispatch } = useStateValue();

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [error, setError] = useState("");

  const { data } = useFetch("USD");
  useEffect(() => {
    if (data) {
      const rates = data?.conversion_rates;
      setCurrencies(Object.keys(rates));
      setError("");
    } else {
      setError("Failed to fetch currency data. Please try again later.");
    }
  }, [data]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    dispatch({ type: "SET_MAIN_CURRENCY", currency: event.target.value });
  };

  return (
    <section className="wrapper w-100 d-grid bg-dark">
      <Row>
        <Col>
          <TransactionsHistory selectedCurrency={selectedCurrency} />
        </Col>
        <Col className="p-3">
          <h3 className="mb-4 fs-3 text-light">
            Balance: {state?.balance?.value}
          </h3>
          <Container>
            <h3 className="mb-4 fs-3 text-light">Currency Selector</h3>
            {error && <p className="text-danger">{error}</p>}
            <Form>
              <Form.Group controlId="currencySelect">
                <Form.Label className="text-light">Select Currency</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCurrency}
                  onChange={handleCurrencyChange}
                >
                  {currencies.length > 0 ? (
                    currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          </Container>
        </Col>
      </Row>
    </section>
  );
};

export default Home;
