import React, { ReactElement, useState } from 'react';
import classes from './Dropdown.module.css';

type Props = {
  trigger: ReactElement<any, any>;
  items: JSX.Element[];
  shouldCloseImmediately?: boolean;
};

const Dropdown = ({ trigger, items, shouldCloseImmediately }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={classes.dropdown}>
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      <ul className={classes.menu}>
        {isOpen &&
          items.map((item, idx) => (
            <li key={idx}>
              {React.cloneElement(item, {
                onClick: () => {
                  item.props.onClick && item.props.onClick();
                  shouldCloseImmediately && setIsOpen(false);
                },
              })}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dropdown;
