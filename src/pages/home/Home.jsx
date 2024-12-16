import React, { useState, useEffect } from "react";
import { useStateValue } from "@/context/index";
import TransactionsHistory from "@/components/transactionsHistory/TransactionsHistory";
import { Col, Row, Form, Container, Card } from "react-bootstrap";
import {
  MdOutlineAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";
import { useFetch } from "../../hooks/useFetch";
import AnimatedChart from "@/components/animatedChart/AnimatedChart";

import useCurrencyConverter from "@/util/currencyConverter";

const Home = () => {
  const { state, dispatch } = useStateValue();
  const { currencyConverter } = useCurrencyConverter();

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(
    state?.mainCurrency || "USD"
  );
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

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
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    dispatch({ type: "SET_MAIN_CURRENCY", currency: newCurrency });
  };

  const filterTransactions = (transactions) => {
    if (filter === "all") return transactions;

    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (filter === "weekly") return transactionDate >= startOfWeek;
      if (filter === "monthly") return transactionDate >= startOfMonth;
      if (filter === "yearly") return transactionDate >= startOfYear;
      return true;
    });
  };

  const filteredTransactions = filterTransactions(state.transactions);

  const groupedData = filteredTransactions.reduce((acc, txn) => {
    const month = new Date(txn.date).toLocaleString("default", {
      month: "short",
    });
    if (!acc[month]) {
      acc[month] = { income: 0, outcome: 0 };
    }
    if (txn.type === "income") {
      acc[month].income += txn.value;
    } else if (txn.type === "outcome") {
      acc[month].outcome += txn.value;
    }
    return acc;
  }, {});

  const months = Object.keys(groupedData).sort(
    (a, b) => new Date(`${a} 1, 2024`) - new Date(`${b} 1, 2024`)
  );
  const incomeData = months.map((month) => groupedData[month].income);
  const outcomeData = months.map((month) => groupedData[month].outcome);

  const balanceInMainCurrency = currencyConverter(
    state?.balance?.value,
    selectedCurrency
  );
  const totalIncomeInMainCurrency = incomeData.reduce(
    (sum, val) => sum + currencyConverter(val, selectedCurrency),
    0
  );
  const totalOutcomeInMainCurrency = outcomeData.reduce(
    (sum, val) => sum + currencyConverter(val, selectedCurrency),
    0
  );

  return (
    <section className="wrapper w-100 d-grid bg-dark text-light min-vh-100">
      <Container fluid>
        <Row>
          <Col md={8}>
            <TransactionsHistory transactions={filteredTransactions} />
            <AnimatedChart
              incomeData={incomeData}
              outcomeData={outcomeData}
              labels={months}
              currencyConverter={currencyConverter}
              selectedCurrency={selectedCurrency}
            />
          </Col>

          <Col md={4}>
            <Card className="bg-black text-light border-0 shadow-sm mb-4 mt-4">
              <Card.Body className="p-3">
                <h6 className="mb-3 d-flex align-items-center">
                  <MdOutlineAccountBalanceWallet className="me-2" />
                  {balanceInMainCurrency} {selectedCurrency}
                </h6>
                <p className="text-success d-flex align-items-center mb-2">
                  <MdTrendingUp className="me-2" /> Total Income:{" "}
                  {totalIncomeInMainCurrency} {selectedCurrency}
                </p>
                <p className="text-danger d-flex align-items-center m-0">
                  <MdTrendingDown className="me-2" /> Total Outcome:{" "}
                  {totalOutcomeInMainCurrency} {selectedCurrency}
                </p>
              </Card.Body>
            </Card>

            <Card className="bg-black text-light border-0 shadow-sm">
              <Card.Body className="p-3">
                <h5>Filter Transactions</h5>
                <Form.Group controlId="filterSelect" className="mb-3">
                  <Form.Label className="small">Time Range</Form.Label>
                  <Form.Control
                    as="select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    size="sm"
                  >
                    <option value="all">All Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </Form.Control>
                </Form.Group>

                <h5 className="mt-4">Main Currency</h5>
                {error && <p className="text-danger small">{error}</p>}
                <Form.Group controlId="currencySelect">
                  <Form.Label className="small">Select Currency</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    size="sm"
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
