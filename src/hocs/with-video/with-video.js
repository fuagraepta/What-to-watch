import React from 'react';
import {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();
      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
      };
      this._videoReset = this._videoReset.bind(this);
      this._playButtonClickHandler = this._playButtonClickHandler.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;
      const {
        poster,
        preview,
        muted
      } = this.props;

      if (video) {
        video.muted = muted;
        video.src = preview;
        video.poster = poster;

        video.oncanplay = () => this.setState({
          isLoading: false
        });
        //
        // video.onplay = () => this.setState({
        //   isPlaying: true
        // });
        //
        // video.onpause = () => this.setState({
        //   isPlaying: false
        // });
      }
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      return (this.props.isPlaying) ? video.play() : video.pause();
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.poster = null;
      video.load = null;
      // video.src = ``;
    }

    render() {
      const {
        // isLoading,
        // isPlaying,
      } = this.state;

      const {style} = this.props;

      return (
        <Component
          {...this.props}
          // isLoading = {isLoading}
          // isPlaying = {isPlaying}
          onVideoReset = {this._videoReset}
          onPlayButtonClick = {this._playButtonClickHandler}
        >
          <video style={style}
            ref={this._videoRef}
          />
        </Component>
      );
    }

    _videoReset() {
      const video = this._videoRef.current;

      if (video) {
        video.load();
      }
    }

    _playButtonClickHandler() {
      this.props.onPlayButtonClick();
      this.setState({
        isPlaying: !this.state.isPlaying
      });
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func,
    poster: PropTypes.string,
    preview: PropTypes.string,
    muted: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
    ])
  };

  return WithVideo;
};

export default withVideo;
