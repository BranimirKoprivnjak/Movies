import classes from './Input.module.css';

type Props = {
  type: string;
  placeholder?: string;
  className?: string;
  defaultChecked?: boolean;
  onChange?: () => void;
};

const Input = ({
  type,
  placeholder,
  className,
  defaultChecked,
  onChange,
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${classes.input} ${className}`}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );
};

export default Input;
