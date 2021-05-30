import assets from 'assets';
import { PLAY_STATUS } from 'redux/constants';

import { Button } from 'common';

const PlayButton = ({ status, onChange }) => {
  const handleClick = () => {
    if (status === PLAY_STATUS.PAUSED || status === PLAY_STATUS.STOPPED) {
      onChange(PLAY_STATUS.PLAYING);
    } else {
      onChange(PLAY_STATUS.PAUSED);
    }
  };

  return (
    <Button
      modifiers={['primary', 'circle']}
      icon={
        status === PLAY_STATUS.PLAYING ? assets.icons.pause : assets.icons.play
      }
      onClick={handleClick}
    ></Button>
  );
};

export default PlayButton;
