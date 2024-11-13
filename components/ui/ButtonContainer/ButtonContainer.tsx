import React, { FC } from 'react';

export const ButtonContainer: FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="flex justify-end gap-4">{children}</div>;
};
