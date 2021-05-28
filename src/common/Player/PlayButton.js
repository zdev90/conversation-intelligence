import assets from 'assets';
import { Button } from 'common';

const PlayButton = () => {
  return (
    <Button modifiers={['primary', 'circle']} icon={assets.icons.play}></Button>
  );
};

export default PlayButton;
