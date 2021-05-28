import styled from 'styled-components';

import PlayButton from './PlayButton';
import { Button } from 'common';
import assets from 'assets';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Player = () => {
  return (
    <Container>
      <Button
        modifiers={['transparent', 'circle']}
        icon={assets.icons.rotateRefreshLeft}
        hoverIcon={assets.icons.rotateRefreshLeftBlue}
      />
      <PlayButton></PlayButton>
      <Button
        modifiers={['transparent', 'circle']}
        icon={assets.icons.rotateRefreshRight}
        hoverIcon={assets.icons.rotateRefreshRightBlue}
      />
      <Button modifiers={['secondary', 'small', 'round']}>1.0x</Button>
    </Container>
  );
};

export default Player;
