import styled from 'styled-components';

import assets from 'assets';
import { ShareButton, Player } from 'common';

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
      <ShareButton
        modifiers={['secondary']}
        icon={assets.icons.share}
        value="Share"
        shareUrl={window.location.href}
      />
    </Container>
  );
};

export default ControlBar;
