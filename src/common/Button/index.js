import styled from 'styled-components';

import { buildStyledComponent } from 'style';

const Component = ({ type, children, icon, hoverIcon, ...props }) => {
  return (
    <button type={type || 'button'} {...props}>
      {children}
    </button>
  );
};

const modifierConfig = {
  primary: ({ theme }) => `
    background: ${theme.colors.blue_1};
    border-color: ${theme.colors.blue_1};
    color: ${theme.colors.white};
  `,
  secondary: ({ theme }) => `
    background: ${theme.colors.white};
    border-color: ${theme.colors.grey_4};
    color: ${theme.colors.grey_2};
  `,
  transparent: ({ theme }) => `
    background: ${theme.colors.transparent};
  `,
  circle: () => `
    border-radius: 50%;
    width: 30px;
    height: 30px;
    padding: 0px;
  `,
  round: () => `
    border-radius: 100px;
  `,
  small: () => `
    padding: 2px 8px;
    font-size: 12px;
    line-height: 16px;
  `,
  action: ({ theme }) => `
    background: ${theme.colors.transparent};
    border-color: ${theme.colors.transparent};
    color: ${theme.colors.blue_1};
    padding: 4px 0;
  `,
};

const styles = ({ theme, icon, hoverIcon, children }) => `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;
  
  border: 1px solid ${theme.colors.transparent};
  box-sizing: border-box;
  border-radius: 3px;

  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: ${theme.colors.grey_2};

  ${
    icon
      ? `
      &:before {
        margin-right: ${(children && '6px') || '0px'};
        display: block;
        content: '';
        width: 15px;
        height: 15px;
        background: url(${icon}) center no-repeat;
      }
    `
      : ''
  }

  ${
    hoverIcon
      ? `
      &:hover:before {
        background: url(${hoverIcon}) center no-repeat;
      }
    `
      : ''
  }
`;

export const Button = buildStyledComponent(
  'Button',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Button;
