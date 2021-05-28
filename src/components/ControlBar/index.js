import styled from 'styled-components';

import assets from 'assets';
import { Button, Player } from 'common';

const Container = styled.div(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    height: 54px;
    background: ${theme.colors.grey_5};
  `
);

export const ControlBar = () => {
  return (
    <Container>
      <Player />
      <Button modifiers={['secondary']} icon={assets.icons.share}>
        Share
      </Button>
    </Container>
  );
};

export default ControlBar;
