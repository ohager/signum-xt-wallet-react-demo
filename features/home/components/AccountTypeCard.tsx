import styles from "@features/home/Home.module.css";

interface Props {
  watchOnly: boolean;
}

export const AccountTypeCard = ({ watchOnly }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.account}>
        <code className={styles.code}>
          {watchOnly && (
            <p>
              Detected a <b>watch-only account</b>, you will not be able to make
              transactions
            </p>
          )}

          {!watchOnly && (
            <p>
              You are connected to an <b>full-account</b> you are able to make
              transactions
            </p>
          )}
        </code>
      </div>
    </div>
  );
};
