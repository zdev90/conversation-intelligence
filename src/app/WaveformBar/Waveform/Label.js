import styled from 'styled-components';

import { buildStyledComponent } from 'style';

const Component = ({ timings, duration, user, ...props }) => {
  return (
    <div {...props}>
      {Math.floor(
        (timings.reduce((total, transcript) => {
          if (transcript.user === user) {
            return total - transcript.startTime + transcript.endTime;
          } else return total;
        }, 0) /
          duration) *
          100
      )}
      % {user}
    </div>
  );
};

const modifierConfig = {
  primary: ({ theme }) => `
    color: ${theme.colors.blue_1};
  `,
};

const styles = ({ theme }) => `
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  height: 25px;
  color: ${theme.colors.green_1};
  text-transform: uppercase;
`;

export const Label = buildStyledComponent(
  'Waveform_Label',
  styled(Component),
  styles,
  {
    modifierConfig,
  }
);

export default Label;
