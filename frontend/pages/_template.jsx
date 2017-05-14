import React from "react"
import { Link } from "react-router"
import { prefixLink } from "gatsby-helpers"
import Helmet from "react-helmet"
import { config } from "config"
import { rhythm } from "../utils/typography"
import '../css/style'
import imgIcon from '../images/icon.png'

module.exports = React.createClass({
  propTypes() {
    return {
      children: React.PropTypes.any,
    }
  },
  render() {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            { name: "description", content: "Turn your image into song suggestion" },
            { name: "keywords", content: "sample, something" },
            { name: "og:title", content: "TuneEye: Soundtracks for your favorite moments" },
            { name: "og:url", content: "https://tuneeye.soravis.com" },
            { name: "og:description", content: "Discover music based on your image." },
            { name: "og:image", content: "https://tuneeye.soravis.com/images/tuneeye-og-2.jpg" },
          ]}
        />
        <div
          style={{
            background: `#2ecc71`,
            marginBottom: rhythm(1),
          }}
        >
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            }}
          >
            <h1 style={{ margin: 0, fontFamily: 'Nunito' }}>
              <Link
                to={prefixLink("/")}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <img src={imgIcon} height={60} style={{ verticalAlign: 'middle', margin: 0 }}/> TuneEye
              </Link>
            </h1>
          </div>
        </div>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  },
})
