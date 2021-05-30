import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { ControlBar, TranscriptList } from 'app';
import { loadData, selectLoading } from 'redux/appSlice';

import theme from 'style/theme';

const Container = styled.div`
  width: 930px;
  margin: 0 auto;
`;

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  if (loading) return <div>loading...</div>;

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
