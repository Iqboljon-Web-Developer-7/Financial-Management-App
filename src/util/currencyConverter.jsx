import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
const useCurrencyConverter = () => {
  const [conversionRates, setConversionRates] = useState({});
  const [error, setError] = useState("");

  const { data } = useFetch("USD");

  useEffect(() => {
    if (data && data.result === "success") {
      const rates = data?.conversion_rates;
      setConversionRates(rates);
      setError("");
    } else {
      setError("Failed to fetch currency data. Please try again later.");
    }
  }, [data]);

  const currencyConverter = (amount, toCurrency) => {
    if (!conversionRates || Object.keys(conversionRates).length === 0) {
      return null;
    }

    const fromCurrency = "USD";
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const fromRate = conversionRates[fromCurrency];
    const toRate = conversionRates[toCurrency];

    if (fromRate && toRate) {
      const amountInUSD = amount / fromRate;
      return (amountInUSD * toRate).toFixed(2);
    }

    return null;
  };

  return { currencyConverter, error };
};

export default useCurrencyConverter;
