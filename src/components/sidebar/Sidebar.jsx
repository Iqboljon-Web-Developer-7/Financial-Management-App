import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const navItems = [
  { to: "/", label: "Overview", icon: "bi-grid" },
  { to: "/balances", label: "Balances", icon: "bi-wallet" },
  { to: "/transactions", label: "Transactions", icon: "bi-arrow-left-right" },
  {
    to: "/converter",
    label: "Converter",
    icon: "bi-arrow-repeat",
  },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <Container>
        <div className="mb-4 mt-4">
          <h4 className="fs-3 lh-1">Financial management</h4>
        </div>

        <nav className="flex-column d-flex gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-item active text-success" : "nav-item"
              }
            >
              <i className={`bi ${item.icon}`}></i> {item.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </div>
  );
}

export default Sidebar;
