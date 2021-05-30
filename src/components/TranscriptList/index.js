import styled from 'styled-components';

import { SearchBar } from 'common';
import Transcript from './Transcript';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

export const TranscriptList = () => {
  const data = {
    transcript_text: [
      'This is Brian Isaacson with Guardian mortgage company at the sound of the tone, please leave your name phone number and a brief message, and I will return your call. Thank you.',
      'Sounds good',
    ],
    word_timings: [
      [
        { startTime: '2.400s', endTime: '2.800s', word: 'This' },
        { startTime: '2.800s', endTime: '3s', word: 'is' },
        { startTime: '3s', endTime: '3.400s', word: 'Brian' },
        { startTime: '3.400s', endTime: '3.900s', word: 'Isaacson' },
        { startTime: '3.900s', endTime: '4.100s', word: 'with' },
        { startTime: '4.100s', endTime: '4.500s', word: 'Guardian' },
        { startTime: '4.500s', endTime: '4.500s', word: 'mortgage' },
        { startTime: '4.500s', endTime: '5.400s', word: 'company' },
        { startTime: '5.400s', endTime: '5.700s', word: 'at' },
        { startTime: '5.700s', endTime: '5.900s', word: 'the' },
        { startTime: '5.900s', endTime: '6.100s', word: 'sound' },
        { startTime: '6.100s', endTime: '6.200s', word: 'of' },
        { startTime: '6.200s', endTime: '6.300s', word: 'the' },
        { startTime: '6.300s', endTime: '6.500s', word: 'tone,' },
        { startTime: '6.500s', endTime: '6.900s', word: 'please' },
        { startTime: '6.900s', endTime: '7.200s', word: 'leave' },
        { startTime: '7.200s', endTime: '7.300s', word: 'your' },
        { startTime: '7.300s', endTime: '7.600s', word: 'name' },
        { startTime: '7.600s', endTime: '8.200s', word: 'phone' },
        { startTime: '8.200s', endTime: '8.300s', word: 'number' },
        { startTime: '8.300s', endTime: '8.600s', word: 'and' },
        { startTime: '8.600s', endTime: '8.700s', word: 'a' },
        { startTime: '8.700s', endTime: '8.800s', word: 'brief' },
        { startTime: '8.800s', endTime: '9s', word: 'message,' },
        { startTime: '9s', endTime: '9.600s', word: 'and' },
        { startTime: '9.600s', endTime: '10s', word: 'I' },
        { startTime: '10s', endTime: '10s', word: 'will' },
        { startTime: '10s', endTime: '10.400s', word: 'return' },
        { startTime: '10.400s', endTime: '10.600s', word: 'your' },
        { startTime: '10.600s', endTime: '10.900s', word: 'call.' },
        { startTime: '10.900s', endTime: '11.400s', word: 'Thank' },
        { startTime: '11.400s', endTime: '11.500s', word: 'you.' },
      ],
      [
        { startTime: '12.0s', endTime: '12.800s', word: 'Sounds' },
        { startTime: '12.800s', endTime: '12.9s', word: 'good' },
      ],
    ],
  };
  return (
    <Container>
      <Wrapper>
        <SearchBar />
      </Wrapper>
      {data.word_timings.map((words, index) => (
        <Transcript
          modifiers={[index % 2 === 1 && 'secondary']}
          words={words}
          key={index}
        />
      ))}
    </Container>
  );
};

export default TranscriptList;
