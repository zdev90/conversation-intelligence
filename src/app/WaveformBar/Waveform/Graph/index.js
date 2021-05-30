import styled from 'styled-components';

import { buildStyledComponent } from 'style';

import Bar from './Bar';

const Component = ({
  timings,
  playPosition,
  duration,
  user,
  primary,
  onChangeCursor,
  ...props
}) => {
  return (
    <div {...props}>
      {timings.map((transcript, index) => (
        <Bar
          key={user + '_bar_' + index}
          width={((transcript.endTime - transcript.startTime) / duration) * 100}
          modifiers={[
            primary && 'primary',
            transcript.user !== user && 'empty',
          ]}
          transcript={transcript}
          playPosition={playPosition}
          user={user}
        ></Bar>
      ))}
    </div>
  );
};

const modifierConfig = {};

const styles = ({ theme }) => `
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  height: 25px;
  width: 100%;
  position: relative;
`;

export const Graph = buildStyledComponent(
  'Waveform_Graph',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Graph;
