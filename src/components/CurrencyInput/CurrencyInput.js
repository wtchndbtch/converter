import PropTypes from "prop-types";

import styles from "./styles.module.css";

import { getValidValue } from "../../utils";

export const CurrencyInput = props => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={props.amount}
        onChange={event => props.onAmountChange(getValidValue(event))}
      />

      <select
        value={props.currency}
        onChange={event => props.onCurrencyChange(event.target.value)}
      >
        {props.currencies.map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};
