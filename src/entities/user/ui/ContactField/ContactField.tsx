import styles from "./ContactField.module.css";

interface ContactFieldProps {
  field: string;
  value: string;
  valueColor?: string;
}

export const ContactField = ({
  field,
  value,
  valueColor,
}: ContactFieldProps) => {
  return (
    <div className={styles.wrapper}>
      <p>{field}</p>
      <p style={{ color: valueColor }}>{value}</p>
    </div>
  );
};
