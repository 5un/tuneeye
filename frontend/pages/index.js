import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import Dropzone from 'react-dropzone'
//import request from 'superagent'
import ResultTrack from '../components/ResultTrack'
import styles from './index.module.scss'
import imgRecord from '../images/record-100.png'
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const SPOTIFY_API = 'https://api.spotify.com/v1';
const API_URL = 'https://us-central1-song-vision.cloudfunctions.net';

export default class Index extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { step: 0 };
  }

  getSpotifyMusic() {
    const request = require('superagent');
    request
      .get(SPOTIFY_API + '/search')
      .query({ type: 'track', q: 'bowie' })
      .end((err, res) => {
        const tracks = _.get(res.body, 'tracks.items', []);
        setTimeout(() => {
          this.setState({
            suggestions: tracks,
            step: 2
          });
        }, 2000);
        

      }); 
  }

  getMusicSuggestion(imageBase64String) {
    const request = require('superagent');
    request
      .post(API_URL + '/suggestmusic')
      .send({ image: imageBase64String })
      .end((err, res) => {
        const tracks = _.get(res.body, 'tracks.items', []);
        this.setState({
          suggestions: tracks,
          step: 2
        });
      }); 
  }

  onDrop(files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64String = e.target.result.split(',').pop();
      this.setState({
        imageDataUrl: e.target.result,
        imageBase64String,
        step: 1
      });
      this.getMusicSuggestion(imageBase64String);
    };
    reader.readAsDataURL(files[0]);
  }

  onResetClick() {
    this.setState({ 
      suggestions: undefined,
      step: 0 
    });
  }

  render() {
    const { suggestions, imageDataUrl, step } = this.state;
    const {
      FacebookShareButton,
      LinkedinShareButton,
      TwitterShareButton,
    } = ShareButtons;

    const FacebookIcon = generateShareIcon('facebook');
    const TwitterIcon = generateShareIcon('twitter');

    const sharingInfo = {
      url: 'https://tuneeye.soravis.com',
      title: 'TuneEye',
      description: 'Discover music base on your image.',
      ogImage: 'https://tuneeye.soravis.com/images/tuneeye-og-2.jpg'
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Nunito' }}>
          🎧 Soundtracks for your favorite moments 📸
        </h3>
        <p>Discover music based on your image</p>
        {(this.state.step === 0) &&
          <div>
            <Dropzone onDrop={this.onDrop.bind(this)} className={styles.dropzone}>
              <span><img src={imgRecord} /><br />Drop an image, or click to select a file to upload.</span>
            </Dropzone>
          </div>
        }
        <br />
        
        {(step !== 0) &&
          <ResultTrack userImage={imageDataUrl} tracks={suggestions} loading={step === 1} />
        }
        {(step === 2) &&
          <button className={styles.resetBtn} onClick={this.onResetClick.bind(this)}>Reset</button>
        }
        <div className={styles.shareSection}>
          <h4>Like what you saw? Share TuneEye to the world.</h4>
          <FacebookShareButton url={sharingInfo.url} title={sharingInfo.title} description={sharingInfo.description} className={styles.shareBtn} picture={sharingInfo.ogImage}>
            <FacebookIcon size={32} round={true}/>
          </FacebookShareButton>
          <TwitterShareButton url={sharingInfo.url} title={sharingInfo.title} via={'asunnotthesun'} className={styles.shareBtn}>
            <TwitterIcon size={32} round={true}/>
          </TwitterShareButton>
        </div>
        <br /><br />
        <p>We are not persistently keeping your image anywhere in our system.</p>
        {/*
          <Link to={prefixLink('/privacy')}>Privacy Policy</Link><br />
        */}
        <div className={styles.footer}>
          Thanks to <a href="https://codepen.io/pipozoft">Jose L Pimienta</a> for his <a href="https://codepen.io/pipozoft/pen/wLyvs">CSS Spinning Vinyl Codepen</a><br/>
          Powered by Serverless, Google Cloud Vision API, Spotify API, Icons8 and GatsbyJS<br />
          Made with 💚 by <a href="https://soravis.com">Soravis</a><br />
        </div>
      </div>
    )
  }
}
