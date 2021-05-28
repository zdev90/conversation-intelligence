import styled from 'styled-components';

import { buildStyledComponent } from 'style';

const Duration = styled.div``;
const Text = styled.div``;

const Component = ({ transcript, ...props }) => {
  return (
    <div {...props}>
      <Duration>{transcript.duration}</Duration>
      <Text>{transcript.text}</Text>
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
