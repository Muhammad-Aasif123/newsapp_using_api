import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-danger" style={{left:'93%',zIndex:'1'}}>
               {source}
              </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}...
             
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text ">
              <small className="text-danger">
                {!author ? "unKnown" : author} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
