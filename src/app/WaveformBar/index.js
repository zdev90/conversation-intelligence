import styled from 'styled-components';

import Timer from './Timer';
import Waveform from './Waveform';

const Container = styled.div(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
    background: ${theme.colors.grey_6};
  `
);

export const WaveformBar = () => {
  return (
    <Container>
      <Timer />
      <Waveform />
    </Container>
  );
};

export default WaveformBar;
