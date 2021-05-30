import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setPlayPosition, setCursorPosition } from 'redux/appSlice';
import { buildStyledComponent } from 'style';
import assets from 'assets';

const Cover = styled.div(
  ({ theme }) => `
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${theme.colors.transparent};
  `
);

const Cursor = styled.div(
  ({ theme, position }) => `
    display: none;
    position: absolute;
    top: 0;
    left: ${position}%;
    width: 2px;
    height: 100%;
    background-color: ${theme.colors.white};
    background-image: url(${assets.images.greenBar});
    background-repeat: no-repeat;
  `
);

const Elapsed = styled.div(
  ({ percent }) => `
    background-image: url(${assets.images.greyBar});
    background-repeat: repeat-x;
    width: ${percent}%;
    height: 100%;
    overflow: hidden;
  `
);

const Component = ({ transcript, playPosition, user, ...props }) => {
  const [cursorPosition, setPosition] = useState(0);
  const dispatch = useDispatch();

  const handleMouseMove = (event) => {
    event.preventDefault();

    const position =
      ((event.clientX - event.target.getBoundingClientRect().left) /
        event.target.offsetWidth) *
      100;

    setPosition(position);

    const seconds =
      transcript.startTime +
      ((transcript.endTime - transcript.startTime) * position) / 100;

    dispatch(setCursorPosition(seconds));
  };

  const handleMouseLeave = (event) => {
    dispatch(setCursorPosition(0));
  };

  const handleClick = () => {
    dispatch(
      setPlayPosition(
        transcript.startTime +
          ((transcript.endTime - transcript.startTime) * cursorPosition) / 100
      )
    );
  };

  return (
    <div {...props}>
      {transcript.user === user && (
        <>
          <Elapsed
            percent={
              ((playPosition - transcript.startTime) /
                (transcript.endTime - transcript.startTime)) *
              100
            }
          >
            <Cursor position={cursorPosition}></Cursor>
          </Elapsed>
          <Cover
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />
        </>
      )}
    </div>
  );
};

const modifierConfig = {
  primary: ({ theme }) => `
    background-image: url(${assets.images.blueBar});
    background-repeat: repeat-x;

    ${Cursor} {
      background-image: url(${assets.images.blueBar});
    }
  `,
  empty: ({ theme }) => `
    background-image: unset;
    cursor: default;
  `,
};

const styles = ({ theme, width }) => `
  display: flex;
  overflow: hidden;
  width: ${width}%;
  height: 100%;
  position: relative;
  cursor: pointer;
  background-image: url(${assets.images.greenBar});
  background-repeat: repeat-x;

  &:hover {
    ${Cursor} {
      display: block;
    }
  }
`;

export const Bar = buildStyledComponent(
  'Waveform_Bar',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Bar;
