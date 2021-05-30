import styled from 'styled-components';

import { buildStyledComponent } from 'style';
import { hhmmss, isBetween } from 'utils/helper';
import { Button } from 'common';

const Duration = styled.div``;
const Text = styled.div``;
const Word = styled.span``;

const Component = ({ words, playPosition, onClickWord, ...props }) => {
  if (!words?.length) return null;

  return (
    <div {...props}>
      <Duration>{hhmmss(words[0].startTime)}</Duration>
      <Text>
        {words.map((word, index) => (
          <Word
            key={`word_${index}`}
            className={
              isBetween(playPosition, word.startTime, word.endTime) && 'active'
            }
            onClick={() => onClickWord(word.startTime)}
          >
            {word.word}
          </Word>
        ))}
        <Button
          modifiers={['action']}
          onClick={(e) => alert('Share button is clicked')}
        >
          Share
        </Button>
      </Text>
    </div>
  );
};

const modifierConfig = {
  secondary: ({ theme }) => `
  padding: 16px 20px 16px 70px;

    ${Duration} {
      color: ${theme.colors.green_1};
      border-color: ${theme.colors.green_1};
    }
  `,
  active: ({ theme }) => `
    background-color: ${theme.colors.blue_5};
  `,
};

const styles = ({ theme }) => `
  display: flex;
  margin: 0;
  padding: 16px 70px 16px 20px;

  button {
    display: none;
  }

  &:hover {
    background-color: ${theme.colors.blue_5};

    button {
      display: block;
    }
  }

  ${Duration} {
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    color: ${theme.colors.blue_1};
    padding: 0 10px 0 0;
    border-right: 1px solid ${theme.colors.blue_1};
  }

  ${Text} {
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    color: ${theme.colors.grey_2};
    margin: 0 0 0 10px;
    word-break: break-all;

    ${Word} {
      border-radius: 3px;
      padding: 0 2px;
      cursor: pointer;
  
      &:hover, &.active {
        background-color: ${theme.colors.blue_4};
  
      }
    }
  }
`;

export const Transcript = buildStyledComponent(
  'Transcript',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Transcript;
