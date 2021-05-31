// Clone component of react-sound: https://www.npmjs.com/package/react-sound
// Set custom interval(PLAYER_POLL_INTERVAL) for fast polling.
import React from 'react';
import PropTypes from 'prop-types';

import { PLAY_STATUS, PLAYER_POLL_INTERVAL } from 'redux/constants';

const pendingCalls = [];
let initialized = false;

let soundManager;
// Allow server side rendering
if (typeof window !== 'undefined') {
  if (process.env.NODE_ENV !== 'production') {
    ({ soundManager } = require('soundmanager2'));
  } else {
    ({ soundManager } = require('soundmanager2/script/soundmanager2-nodebug'));
  }

  soundManager.onready(() => {
    soundManager.setup({
      flashPollingInterval: PLAYER_POLL_INTERVAL,
      html5PollingInterval: PLAYER_POLL_INTERVAL,
    });
    pendingCalls.slice().forEach((cb) => cb());
  });
}

function createSound(options, cb) {
  if (soundManager.ok()) {
    cb(soundManager.createSound(options));
    return () => {};
  } else {
    if (!initialized) {
      initialized = true;
      soundManager.beginDelayedInit();
    }

    const call = () => {
      cb(soundManager.createSound(options));
    };

    pendingCalls.push(call);

    return () => {
      pendingCalls.splice(pendingCalls.indexOf(call), 1);
    };
  }
}

function noop() {}

export default class Sound extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    playStatus: PropTypes.oneOf(Object.keys(PLAY_STATUS)).isRequired,
    position: PropTypes.number,
    playFromPosition: PropTypes.number,
    volume: PropTypes.number,
    playbackRate: PropTypes.number,
    onError: PropTypes.func,
    onLoading: PropTypes.func,
    onLoad: PropTypes.func,
    onPlaying: PropTypes.func,
    onPause: PropTypes.func,
    onResume: PropTypes.func,
    onStop: PropTypes.func,
    onFinishedPlaying: PropTypes.func,
    onBufferChange: PropTypes.func,
    autoLoad: PropTypes.bool,
    loop: PropTypes.bool,
  };

  static defaultProps = {
    volume: 100,
    playbackRate: 1,
    onError: noop,
    onLoading: noop,
    onPlaying: noop,
    onLoad: noop,
    onPause: noop,
    onResume: noop,
    onStop: noop,
    onFinishedPlaying: noop,
    onBufferChange: noop,
    autoLoad: false,
    loop: false,
  };

  componentDidMount() {
    this.createSound((sound) => this.updateSound(sound));
  }

  componentWillUnmount() {
    this.removeSound();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.createSound((sound) => this.updateSound(sound, prevProps));
    } else {
      this.updateSound(this.sound, prevProps);
    }
  }

  updateSound(sound, prevProps = {}) {
    if (!sound) {
      return;
    }

    if (this.props.playStatus === PLAY_STATUS.PLAYING) {
      if (sound.playState === 0) {
        sound.play();
      }

      if (sound.paused) {
        sound.resume();
      }
    } else if (this.props.playStatus === PLAY_STATUS.STOPPED) {
      if (sound.playState !== 0) {
        sound.stop();
      }
    } else {
      // this.props.playStatus === PLAY_STATUS.PAUSED
      if (!sound.paused) {
        sound.pause();
      }
    }

    if (this.props.playFromPosition != null) {
      if (this.props.playFromPosition !== prevProps.playFromPosition) {
        sound.setPosition(this.props.playFromPosition);
      }
    }

    if (this.props.position != null) {
      if (
        sound.position !== this.props.position &&
        Math.round(sound.position) !== Math.round(this.props.position)
      ) {
        sound.setPosition(this.props.position);
      }
    }

    if (this.props.volume !== prevProps.volume) {
      sound.setVolume(this.props.volume);
    }

    if (this.props.playbackRate !== prevProps.playbackRate) {
      sound.setPlaybackRate(this.props.playbackRate);
    }
  }

  createSound(callback) {
    this.removeSound();

    const instance = this;

    if (!this.props.url) {
      return;
    }

    this.stopCreatingSound = createSound(
      {
        url: this.props.url,
        autoLoad: this.props.autoLoad,
        volume: this.props.volume,
        position: this.props.playFromPosition || this.props.position || 0,
        playbackRate: this.props.playbackRate,
        whileloading() {
          instance.props.onLoading(this);
        },
        whileplaying() {
          instance.props.onPlaying(this);
        },
        onerror(errorCode, description) {
          instance.props.onError(errorCode, description, this);
        },
        onload() {
          instance.props.onLoad(this);
        },
        onpause() {
          instance.props.onPause(this);
        },
        onresume() {
          instance.props.onResume(this);
        },
        onstop() {
          instance.props.onStop(this);
        },
        onfinish() {
          if (
            instance.props.loop &&
            instance.props.playStatus === PLAY_STATUS.PLAYING
          ) {
            instance.sound.play();
          } else {
            instance.props.onFinishedPlaying();
          }
        },
        onbufferchange() {
          instance.props.onBufferChange(this.isBuffering);
        },
      },
      (sound) => {
        this.sound = sound;
        callback(sound);
      }
    );
  }

  removeSound() {
    if (this.stopCreatingSound) {
      this.stopCreatingSound();
      delete this.stopCreatingSound;
    }

    if (this.sound) {
      try {
        this.sound.destruct();
      } catch (e) {} // eslint-disable-line

      delete this.sound;
    }
  }

  render() {
    return null;
  }
}
