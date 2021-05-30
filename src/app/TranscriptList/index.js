import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectTranscript,
  selectPlayPosition,
  setPlayPosition,
  setPlayStatus,
} from 'redux/appSlice';
import { PLAY_STATUS } from 'redux/constants';
import { parseTime, isBetween } from 'utils/helper';

import { SearchBar } from 'common';
import Transcript from './Transcript';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

export const TranscriptList = () => {
  const dispatch = useDispatch();
  const transcript = useSelector(selectTranscript);
  const playPosition = useSelector(selectPlayPosition);

  const updatePosition = (time) => {
    dispatch(setPlayPosition(parseTime(time)));
    dispatch(setPlayStatus(PLAY_STATUS.PLAYING));
  };

  return (
    <Container>
      <Wrapper>
        <SearchBar />
      </Wrapper>
      {transcript?.word_timings.map((words, index) => (
        <Transcript
          key={`transcript_${index}`}
          modifiers={[
            index % 2 === 1 && 'secondary',
            isBetween(
              playPosition,
              words[0].startTime,
              words[words.length - 1].endTime
            ) && 'active',
          ]}
          words={words}
          playPosition={playPosition}
          onClickWord={updatePosition}
        />
      ))}
    </Container>
  );
};

export default TranscriptList;
