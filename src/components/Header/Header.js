import { useMemo } from "react";
import PropTypes from "prop-types";

import { formatNumber } from "../../utils";

import styles from "./styles.module.css";

const currenciesToDisplay = ["USD", "EUR"];

const getCurrencies = rates =>
  currenciesToDisplay.reduce((result, currency) => {
    const record = `${currency} - ${formatNumber(
      rates["UAH"] / rates[currency]
    )}`;

    result.push(record);

    return result;
  }, []);

export const Header = ({ rates }) => {
  const currencies = useMemo(() => rates && getCurrencies(rates), [rates]);

  return (
    <header className={styles.header}>
      <h1>Let's exchange</h1>

      <div className={styles.currency}>
        {currencies
          ? currencies.map(currency => (
              <div key={currency} className={styles.currency__item}>
                {currency}
              </div>
            ))
          : "Loading..."}
      </div>
    </header>
  );
};

Header.propsTypes = {
  rates: PropTypes.object,
};
