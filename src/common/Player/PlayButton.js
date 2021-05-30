import Sound from 'react-sound';

import assets from 'assets';
import { Button } from 'common';

const PlayButton = ({ status, onChange }) => {
  const handleClick = () => {
    if (status === Sound.status.PAUSED || status === Sound.status.STOPPED) {
      onChange(Sound.status.PLAYING);
    } else {
      onChange(Sound.status.PAUSED);
    }
  };

  return (
    <Button
      modifiers={['primary', 'circle']}
      icon={
        status === Sound.status.PLAYING ? assets.icons.pause : assets.icons.play
      }
      onClick={handleClick}
    ></Button>
  );
};

export default PlayButton;
