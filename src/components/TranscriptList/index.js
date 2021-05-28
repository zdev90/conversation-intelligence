import styled from 'styled-components';

import { SearchBar } from 'common';
import Transcript from './Transcript';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

export const TranscriptList = () => {
  const transcripts = [
    {
      duration: '03:25',
      text: 'This is Brian Isaacson with Guardian mortgage company at the sound of the tone, please leave your name phone number and a brief message, and I will return your call. Thank you.',
    },
    {
      duration: '03:25',
      text: 'This is Brian Isaacson with Guardian mortgage company at the sound of the tone, please leave your name phone number and a brief message, and I will return your call. Thank you.',
    },
    {
      duration: '03:25',
      text: 'This is Brian Isaacson with Guardian mortgage company at the sound of the tone, please leave your name phone number and a brief message, and I will return your call. Thank you.',
    },
    {
      duration: '03:25',
      text: 'This is Brian Isaacson with Guardian mortgage company at the sound of the tone, please leave your name phone number and a brief message, and I will return your call. Thank you.',
    },
  ];
  return (
    <Container>
      <Wrapper>
        <SearchBar />
      </Wrapper>
      {transcripts.map((transcript, index) => (
        <Transcript
          modifiers={[
            index % 2 === 1 && 'secondary',
            index % 2 === 0 && 'active',
          ]}
          transcript={transcript}
          key={index}
        />
      ))}
    </Container>
  );
};

export default TranscriptList;
