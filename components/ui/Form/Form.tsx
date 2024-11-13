import React, { DOMAttributes, FC } from 'react';

export const Form: FC<
  React.PropsWithChildren<DOMAttributes<HTMLFormElement>>
> = ({ children, ...rest }) => {
  return (
    <form {...rest} noValidate>
      {children}
    </form>
  );
};
