import { useState } from 'react';
import styled from 'styled-components';
import Sound from 'react-sound';
import { useSelector, useDispatch } from 'react-redux';

import { selectStatus, setStatus, selectUrl } from 'redux/appSlice';
import PlayButton from './PlayButton';
import { Button } from 'common';
import assets from 'assets';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Player = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const url = useSelector(selectUrl);

  const updateStatus = (status) => dispatch(setStatus(status));

  return (
    <Container>
      {!loading && (
        <>
          <Button
            modifiers={['transparent', 'circle']}
            icon={assets.icons.rotateRefreshLeft}
            hoverIcon={assets.icons.rotateRefreshLeftBlue}
          />
          <PlayButton status={status} onChange={updateStatus}></PlayButton>
          <Button
            modifiers={['transparent', 'circle']}
            icon={assets.icons.rotateRefreshRight}
            hoverIcon={assets.icons.rotateRefreshRightBlue}
          />
          <Button modifiers={['secondary', 'small', 'round']}>1.0x</Button>
        </>
      )}

      {url && (
        <Sound
          url={url}
          autoLoad
          playStatus={status}
          playbackRate={1.0}
          onLoading={(sound) => setLoading(!sound.loaded)}
          onLoad={(sound) => setLoading(!sound.loaded)}
          onFinishedPlaying={() => updateStatus(Sound.status.STOPPED)}
        />
      )}
    </Container>
  );
};

export default Player;
