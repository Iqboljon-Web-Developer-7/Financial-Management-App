import React, { useState } from "react";
import { useStateValue } from "@/context/index";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { v4 as uuid } from "uuid";

const Balances = () => {
  const { state, dispatch } = useStateValue();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardBalance, setCardBalance] = useState("");

  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (cardName && cardBalance && cardNumber) {
      const newCard = {
        id: uuid(),
        name: cardName,
        balance: cardBalance,
        number: cardNumber,
      };

      dispatch({
        type: "ADD_CARD",
        item: newCard,
      });

      const updatedCards = [...state.cards, newCard];
      localStorage.setItem("cards", JSON.stringify(updatedCards));

      setCardName("");
      setCardNumber("");
      setCardBalance("");
    }
  };

  return (
    <Container fluid className="py-5 bg-dark text-light">
      <h4 className="my-4 text-center">Add Card Information</h4>

      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Name</Form.Label>
              <Form.Control
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Enter card name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                value={cardNumber}
                onChange={(e) => {
                  if (e.target.value.length <= 19) {
                    setCardNumber(formatCardNumber(e.target.value));
                  }
                }}
                placeholder="Enter card number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Balance $</Form.Label>
              <Form.Control
                type="number"
                value={cardBalance}
                onChange={(e) => setCardBalance(e.target.value)}
                placeholder="Card balance"
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={handleAddCard}
              variant="primary"
              className="w-100 mb-3"
            >
              Add Card
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="text-center mt-5">
        <Col xs={12}>
          <h3>Saved Cards</h3>
          <ul>
            {state?.cards?.map((card, index) => (
              <li key={index}>
                <strong>{card.name}</strong> - Balance: {card.balance}$
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Balances;
