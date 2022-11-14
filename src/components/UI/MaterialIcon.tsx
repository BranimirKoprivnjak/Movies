import React from 'react';
import classes from './MaterialIcon.module.css';

type Props = {
  type: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  className?: string;
};

const MaterialIcon = ({ type, onClick, className }: Props) => {
  return (
    <span
      onClick={onClick}
      className={`material-symbols-outlined ${classes.icon} ${className}`}
    >
      {type}
    </span>
  );
};

export default MaterialIcon;
