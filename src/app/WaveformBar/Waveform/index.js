import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  selectTranscript,
  selectDuration,
  selectPlayPosition,
} from 'redux/appSlice';
import { parseTime } from 'utils/helper';

import Label from './Label';
import Graph from './Graph/';

const YOU = 'you';
const PROSPECT = 'michael';

const Hr = styled.div(
  ({ theme }) => `
    width: 100%;
    border-bottom: 1px solid ${theme.colors.grey_4};
    margin: 6px 0;
  `
);

const GraphContainer = styled.div`
  flex-grow: 1;
`;

const Meter = styled.div(
  ({ theme }) => `
    display: flex;
    position: relative;
    width: 100%;
    border-left: 1px solid ${theme.colors.grey_4};
    border-right: 1px solid ${theme.colors.grey_4};
  `
);

const Progress = styled.div(
  ({ theme, percent }) => `
    position: absolute;
    top: 6px;
    left: 0px;
    width: ${percent}%;    
    border-bottom: 1px solid ${theme.colors.grey_3};
  `
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const Waveform = () => {
  const transcript = useSelector(selectTranscript);
  const duration = useSelector(selectDuration);
  const playPosition = useSelector(selectPlayPosition);

  if (!transcript) return null;

  const timings = [];
  transcript.word_timings.reduce((start, words, index) => {
    if (parseFloat(start) !== parseTime(words[0].startTime)) {
      timings.push({
        startTime: start,
        endTime: parseTime(words[0].startTime),
      });
    }
    timings.push({
      startTime: parseTime(words[0].startTime),
      endTime: parseTime(words[words.length - 1].endTime),
      user: index % 2 === 0 ? YOU : PROSPECT,
    });
    return parseTime(words[words.length - 1].endTime);
  }, 0);
  if (timings[timings.length - 1].endTime !== parseFloat(duration)) {
    timings.push({
      startTime: timings[timings.length - 1].endTime,
      endTime: duration,
    });
  }

  return (
    <Container>
      <div>
        <Label
          modifiers={['primary']}
          timings={timings}
          duration={duration}
          user={YOU}
        ></Label>
        <Hr />
        <Label timings={timings} duration={duration} user={PROSPECT}></Label>
      </div>
      <GraphContainer>
        <Graph
          timings={timings}
          playPosition={playPosition}
          duration={duration}
          user={YOU}
          primary
        />
        <Meter>
          <Hr />
          <Progress percent={(playPosition / duration) * 100} />
        </Meter>
        <Graph
          timings={timings}
          playPosition={playPosition}
          duration={duration}
          user={PROSPECT}
        />
      </GraphContainer>
    </Container>
  );
};

export default Waveform;
