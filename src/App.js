import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { CurrencyInput } from "./components/CurrencyInput";
import { Card } from "./components/UI/Card/Card";
import { Header } from "./components/Header";
import { formatNumber } from "./utils";

import styles from "./styles.module.css";
import { Message } from "./components/UI/Message";

const apikey = "jmbzir1tv8piQIEYLTobvyOpI7pPCKlf";

const fetchRates = () => {
  return axios.get("https://api.apilayer.com/exchangerates_data/latest", {
    params: {
      base: "EUR",
      apikey,
    },
  });
};

const App = () => {
  const [firstAmount, setFirstAmount] = useState("1");
  const [secondAmount, setSecondAmount] = useState("1");

  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("UAH");

  const [rates, setRates] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRates()
      .then(response => {
        if (response.status === 200) {
          setError(false);
        }
        setRates(response.data.rates);
      })
      .catch(error => setError(true));
  }, []);

  useEffect(() => {
    if (rates) {
      handleFirstAmountChange("1");
    }
  }, [rates]);

  const currencies = useMemo(() => Object.keys(rates || {}), [rates]);

  const handleFirstAmountChange = amount => {
    setFirstAmount(amount);
    setSecondAmount(
      formatNumber((amount * rates[secondCurrency]) / rates[firstCurrency])
    );
  };

  const handleFirstCurrencyChange = currency => {
    setFirstCurrency(currency);
    setSecondAmount(
      formatNumber((firstAmount * rates[secondCurrency]) / rates[currency])
    );
  };

  const handleSecondAmountChange = amount => {
    setSecondAmount(amount);
    setFirstAmount(
      formatNumber((amount * rates[firstCurrency]) / rates[secondCurrency])
    );
  };

  const handleSecondCurrencyChange = currency => {
    setSecondCurrency(currency);
    setFirstAmount(
      formatNumber((secondAmount * rates[currency]) / rates[firstCurrency])
    );
  };

  let message = error
    ? "Sorry, something went wrong :("
    : `You can get ${firstAmount} ${firstCurrency} for ${secondAmount} ${secondCurrency}`;

  return (
    <>
      <Header rates={rates} />

      <Card>
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <CurrencyInput
              amount={firstAmount}
              currency={firstCurrency}
              currencies={currencies}
              onAmountChange={handleFirstAmountChange}
              onCurrencyChange={handleFirstCurrencyChange}
            />

            <CurrencyInput
              amount={secondAmount}
              currency={secondCurrency}
              currencies={currencies}
              onAmountChange={handleSecondAmountChange}
              onCurrencyChange={handleSecondCurrencyChange}
            />
          </div>
          <Message>{message}</Message>
        </main>
      </Card>
    </>
  );
};

export default App;
