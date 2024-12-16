import React, { useState } from "react";
import { useStateValue } from "@/context/index";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionsPage = () => {
  const { state, dispatch } = useStateValue();
  const [income, setIncome] = useState("");
  const [outcome, setOutcome] = useState("");
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");
  const categories = state.categories;

  const errorMsg = (msg) =>
    toast.error(msg, {
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
  const successMsg = () =>
    toast.success("Transaction created!", {
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
    if (income && category && description) {
      dispatch({
        type: "ADD_TRANSACTION",
        item: {
          type: "income",
          value: parseFloat(income),
          date: new Date().toISOString(),
          category,
          description,
        },
      });
      setIncome("");
      setCategory("");
      setDescription("");
      successMsg();
    } else {
      errorMsg("Fill all inputs please!");
    }
  };

  const handleAddOutcome = (e) => {
    e.preventDefault();
    if (outcome && category && description) {
      dispatch({
        type: "ADD_TRANSACTION",
        item: {
          type: "outcome",
          value: parseFloat(outcome),
          date: new Date().toISOString(),
          category,
          description,
        },
      });
      setOutcome("");
      setCategory("");
      successMsg();
    } else {
      errorMsg("Fill all inputs please!");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      dispatch({ type: "ADD_CATEGORY", item: newCategory });
      setNewCategory("");
      setShowModal(false);
    } else {
      errorMsg("This category exists");
    }
  };

  return (
    <Container className="pt-4 bg-dark text-light">
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
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
            <Form.Control
              className="mt-2"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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

      <h4 className="mt-5">Add Category</h4>
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
    </Container>
  );
};

export default TransactionsPage;
