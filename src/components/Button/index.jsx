import React from "react";
import styles from "./button.module.css";

function Button({ text, children, className, onClick, ...rest }) {
  let containerClass = styles.container;
  if (containerClass) containerClass += ` ${className}`;
  return (
    <button onClick={onClick} className={containerClass} {...rest}>
      {text || children}
    </button>
  );
}

export { Button };
