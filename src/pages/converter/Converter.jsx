import React from "react";
import CurrencyConverter from "@/components/currencyConverter/CurrencyConverter";

import "./converter.scss";
const Converter = () => {
  return (
    <div className="converter bg-dark w-100 d-flex justify-content-center align-items-center flex-column">
      <h2 className="header fs-1 text-white">Currency Converter</h2>
      <p className="subHeader text-secondary">
        Check live rates of any currency you want!
      </p>
      <CurrencyConverter />
    </div>
  );
};

export default Converter;
