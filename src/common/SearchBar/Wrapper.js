import styled from 'styled-components';

import { buildStyledComponent } from 'style';
import assets from 'assets';

const styles = ({ theme }) => `
  display: flex;
  align-items: center;
  height: 30px;
  margin: 0px;
  position: relative;
  padding: 4px 12px;
  background-color: ${theme.colors.white};
  background-image: url(${assets.icons.search});
  background-repeat: no-repeat;
  background-position: 14px center;
  background-size: 14px auto;
  border: 1px solid ${theme.colors.grey_4};
  border-radius: 3px;

  >input {
    width: 100%;
    margin: 0px;
    padding: 0 0 0 26px;
    background-color: ${theme.colors.transparent};
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: ${theme.colors.grey_2};
  }

  >input:focus {
    outline: none;
  }
`;

export const SearchBar = buildStyledComponent(
  'SearchBar_Wrapper',
  styled.div,
  styles
);

export default SearchBar;
