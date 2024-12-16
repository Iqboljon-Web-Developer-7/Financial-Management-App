import React, { useState } from "react";
import { useStateValue } from "@/context/index";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Modal,
} from "react-bootstrap";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionsPage = () => {
  const { state, dispatch } = useStateValue();
  const [income, setIncome] = useState("");
  const [outcome, setOutcome] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const categories = state.categories;

  const oldCategory = () =>
    toast.error("This category exists", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (income && category) {
      dispatch({
        type: "ADD_TRANSACTION",
        item: {
          type: "income",
          value: parseFloat(income),
          date: new Date().toISOString(),
          category,
        },
      });
      setIncome("");
      setCategory("");
    }
  };

  const handleAddOutcome = (e) => {
    e.preventDefault();
    if (outcome && category) {
      dispatch({
        type: "ADD_TRANSACTION",
        item: {
          type: "outcome",
          value: parseFloat(outcome),
          date: new Date().toISOString(),
          category,
        },
      });
      setOutcome("");
      setCategory("");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      dispatch({ type: "ADD_CATEGORY", item: newCategory });
      setNewCategory("");
      setShowModal(false);
    } else {
      oldCategory();
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Transactions</h3>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="incomeInput">
            <Form.Control
              type="number"
              placeholder="Enter income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <Form.Select
              className="mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            <Button
              type="submit"
              variant="success"
              className="mt-2"
              onClick={handleAddIncome}
            >
              Add Income
            </Button>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="outcomeInput">
            <Form.Control
              type="number"
              placeholder="Enter outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
            <Form.Select
              className="mt-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
            <Button
              type="submit"
              variant="danger"
              className="mt-2"
              onClick={handleAddOutcome}
            >
              Add Outcome
            </Button>
          </Form.Group>
        </Col>
      </Row>

      <Button
        variant="info"
        className="mb-4"
        onClick={() => setShowModal(true)}
      >
        Add New Category
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <h3>Transaction History</h3>
        <ListGroup>
          {state.transactions.map((transaction, index) => (
            <ListGroup.Item key={index}>
              <strong>{transaction.type.toUpperCase()}:</strong> $
              {transaction.value.toFixed(2)}{" "}
              <em>({new Date(transaction.date).toLocaleString()})</em>{" "}
              <strong>Category:</strong> {transaction.category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default TransactionsPage;
