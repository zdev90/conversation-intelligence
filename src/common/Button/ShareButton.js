import { useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import styled from 'styled-components';

import { Button } from 'common';

const ICON_SIZE = 24;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;

  button {
    margin: 0 2px;
  }
`;

export const ShareButton = ({ value, shareUrl, ...props }) => {
  const [shared, setShared] = useState(false);

  if (shared) {
    return (
      <Container onMouseLeave={(event) => setShared(false)}>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={ICON_SIZE} round={true} />
        </EmailShareButton>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={ICON_SIZE} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={ICON_SIZE} round={true} />
        </LinkedinShareButton>
        <PinterestShareButton url={shareUrl}>
          <PinterestIcon size={ICON_SIZE} round={true} />
        </PinterestShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={ICON_SIZE} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={ICON_SIZE} round={true} />
        </WhatsappShareButton>
      </Container>
    );
  } else {
    return (
      <Button
        modifiers={['action']}
        onClick={(e) => setShared(true)}
        {...props}
      >
        {value}
      </Button>
    );
  }
};

export default ShareButton;
