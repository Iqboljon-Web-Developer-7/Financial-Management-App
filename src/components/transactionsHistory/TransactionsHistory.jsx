import React, { useState } from "react";
import { useStateValue } from "@/context";
import { ListGroup, Form, Row, Col, Card, Container } from "react-bootstrap";

const TransactionsHistory = () => {
  const { state } = useStateValue();
  const [filters, setFilters] = useState({
    category: "",
    dateRange: "all",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filterTransactions = (transactions) => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const today = new Date();

      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      switch (filters.dateRange) {
        case "day":
          return transactionDate.toDateString() === today.toDateString();
        case "week":
          const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          return transactionDate >= startOfWeek;
        case "month":
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const filteredTransactions = filterTransactions(state.transactions);

  return (
    <div className="p-3">
      <h3 className="mb-4 fs-3 text-light">Transaction History</h3>

      <Container className="p-3 shadow-sm mb-4 bg-light rounded-2">
        <Row>
          <Col md={6}>
            <Form.Group controlId="filterCategory">
              <Form.Label className="text-secondary">
                Filter by Category
              </Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {[...new Set(state.transactions.map((t) => t.category))].map(
                  (category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="filterDateRange">
              <Form.Label className="text-secondary">
                Filter by Date Range
              </Form.Label>
              <Form.Control
                as="select"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
              >
                <option value="all">All Time</option>
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Container>

      <ListGroup>
        {filteredTransactions?.map((transaction, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center shadow-sm mb-2 p-3"
          >
            {transaction.type.toUpperCase() == "INCOME" ? (
              <div className="bg-success p-1 rounded-3 text-white">
                <i className="bs bi-arrow-down fs-6"></i>
              </div>
            ) : (
              <div className="bg-danger p-1 rounded-3 text-white">
                <i className="bs bi-arrow-up fs-6"></i>
              </div>
            )}
            ${transaction.value.toFixed(2)}
            <div className="text-muted">
              <em>{new Date(transaction.date).toLocaleString()}</em>
            </div>
            <div className="text-success">{transaction.category}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {filteredTransactions.length === 0 && (
        <div className="text-center text-muted">No transactions found.</div>
      )}
    </div>
  );
};

export default TransactionsHistory;
