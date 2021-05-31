import { useState } from 'react';
import styled from 'styled-components';
import Sound from './Sound';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectUrl,
  selectPlayStatus,
  setPlayStatus,
  selectPlayPosition,
  setPlayPosition,
  moveBackward,
  moveForward,
  selectPlaySpeed,
  increasePlaySpeed,
  setDuration,
} from 'redux/appSlice';
import assets from 'assets';
import { PLAY_STATUS } from 'redux/constants';

import PlayButton from './PlayButton';
import { Button } from 'common';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Player = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const url = useSelector(selectUrl);
  const playStatus = useSelector(selectPlayStatus);
  const playPosition = useSelector(selectPlayPosition);
  const playSpeed = useSelector(selectPlaySpeed);

  const updatePlayStatus = (status) => dispatch(setPlayStatus(status));

  return (
    <Container>
      <Button
        modifiers={['transparent', 'circle']}
        icon={assets.icons.rotateRefreshLeft}
        hoverIcon={assets.icons.rotateRefreshLeftBlue}
        onClick={() => dispatch(moveBackward())}
        disabled={loading}
      />
      <PlayButton
        status={playStatus}
        onChange={updatePlayStatus}
        disabled={loading}
      ></PlayButton>
      <Button
        modifiers={['transparent', 'circle']}
        icon={assets.icons.rotateRefreshRight}
        hoverIcon={assets.icons.rotateRefreshRightBlue}
        onClick={() => dispatch(moveForward())}
        disabled={loading}
      />
      <Button
        modifiers={['secondary', 'small', 'round']}
        onClick={() => dispatch(increasePlaySpeed())}
        disabled={loading}
      >
        {playSpeed}
      </Button>

      {url && (
        <Sound
          url={url}
          autoLoad
          playStatus={playStatus}
          position={playPosition}
          playbackRate={parseFloat(playSpeed.slice(0, -1))}
          onLoading={(sound) => setLoading(!sound.loaded)}
          onLoad={(sound) => {
            setLoading(!sound.loaded);
            dispatch(setDuration(sound.duration));
          }}
          onPlaying={(sound) => dispatch(setPlayPosition(sound.position))}
          onFinishedPlaying={() => updatePlayStatus(PLAY_STATUS.STOPPED)}
        />
      )}
    </Container>
  );
};

export default Player;
