import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { ControlBar, TranscriptList } from 'components';

import theme from 'style/theme';

const Container = styled.div`
  width: 930px;
  margin: 0 auto;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ControlBar />
        <TranscriptList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
