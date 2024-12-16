import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch"; // Assuming you are using this custom hook

const useCurrencyConverter = () => {
  const [conversionRates, setConversionRates] = useState({});
  const [error, setError] = useState("");

  // Fetch conversion rates from the API with USD as the base
  const { data } = useFetch("USD"); // Assuming this API returns conversion rates for USD

  useEffect(() => {
    if (data && data.result === "success") {
      const rates = data?.conversion_rates;
      setConversionRates(rates); // Save conversion rates in state
      setError("");
    } else {
      setError("Failed to fetch currency data. Please try again later.");
    }
  }, [data]);

  // currencyConverter function
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

    return null; // Return null if any conversion rate is missing
  };

  return { currencyConverter, error };
};

export default useCurrencyConverter;
