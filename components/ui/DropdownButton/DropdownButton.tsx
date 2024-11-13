import React, { FC } from 'react';
import { Dropdown, FlowbiteColors } from 'flowbite-react';
import type { DynamicStringEnumKeysOf } from 'flowbite-react/dist/types/types';

interface DropdownProps {
  label: string;
  menuItems: { label: string; onClick: () => void }[];
  color?: DynamicStringEnumKeysOf<FlowbiteColors>;
}

export const DropdownButton: FC<DropdownProps> = ({
  menuItems,
  label,
  color = 'light',
}) => {
  return (
    <Dropdown label={label} dismissOnClick={true} color={color}>
      {menuItems.map((item, index) => (
        <Dropdown.Item key={index} onClick={item.onClick}>
          {item.label}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
