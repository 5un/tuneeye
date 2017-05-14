import React from 'react'
import _ from 'lodash'
import ReactAudioPlayer from 'react-audio-player';
import styles from './ResultTrack.module.scss'
import cn from 'classnames';

export default class ResultTrack extends React.Component {

  render() {
    const { userImage, tracks } = this.props;
    let track, albumArtUrl, artist, coverShouldSlideOpen = false;
    const hasTrack = tracks && (tracks.length > 0);
    if (hasTrack) {
      track = tracks[0];
      albumArtUrl = _.get(track, 'album.images[0].url');
      artist = _.get(track, 'artists[0].name');
      coverShouldSlideOpen = true;
    }
    return (
      <div>
        <div className={styles.coverAndVinylContainer}>
          <div className={cn(styles.cover, {[styles.coverOpen]: coverShouldSlideOpen, [styles.coverXray]: !coverShouldSlideOpen })} style={{backgroundImage: `url(${userImage})`}} />
          <div className={cn(styles.vinylContainer, {[styles.vinylContainerOpen]: coverShouldSlideOpen})}>
          {hasTrack &&
            <img className={cn(styles.picture, styles.vinyl1)} src={albumArtUrl} />
          }
          </div>
        </div>
        {!coverShouldSlideOpen &&
          <span>Your image is being analysed by some robots...</span>
        }
        {hasTrack &&
          <div>
            <h3>{track.name} - {artist}</h3>
            <ReactAudioPlayer
              src={tracks[0].preview_url}
              autoPlay
              controls
            />
          </div>
        }
        {/*
          <div>
          {_.map(tracks, (track) => (
            <div>
              {track.name} ({track.popularity}) <a href={`https://open.spotify.com/track/${track.id}`}>Link</a>
            </div>
          ))}
          </div>
        */}
      </div>
    )
  }

}