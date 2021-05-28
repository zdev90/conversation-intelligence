import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { ControlBar } from 'components';

import theme from 'style/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ControlBar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
