import styled from 'styled-components';

import { buildStyledComponent } from 'style';

const Component = (props) => {
  return <div {...props}></div>;
};

const modifierConfig = {};

const styles = ({ theme }) => `
`;

export const Waveform = buildStyledComponent(
  'Waveform',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Waveform;
