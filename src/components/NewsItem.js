import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/2/6/6/0/8/1/gallery_true_tone__fftldozqe8ae_large_2x-4b7a1d0365e9adc8.png"
            }
            className="card-img-top"
            alt="Nothing to show"
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={url} target="-blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
