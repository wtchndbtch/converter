import styles from "./styles.module.css";

export const Message = ({ children }) => {
  return <p className={styles.p}>{children}</p>;
};
