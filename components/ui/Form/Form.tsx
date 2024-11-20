import React, { DOMAttributes, FC } from 'react';

export const Form: FC<
  React.PropsWithChildren<
    DOMAttributes<HTMLFormElement> & { className?: string }
  >
> = ({ children, className, ...rest }) => {
  return (
    <form {...rest} noValidate className={className}>
      {children}
    </form>
  );
};
