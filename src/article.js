import React, { Component } from 'react';
import Images from './images.js';
import './App.css';
import json from './data';

class Article extends Component {
  constructor(props) {
    super(props);
    const index = this.props.index;
    this.state = {
        index: index
    }
  }

  componentWillReceiveProps() {
    this.setState({
      index: this.state.index
    })
  }

  render() {
    const data = json.artists;
    let index = this.props.index;
    let dataIndex = data[index];

    return ( 
      <div className="lot-photo__article">
        <Images index={index} articleState={this.props.articleState} />
         <div className="lot-photo__article__info">
          <div className="lot-photo__article__info--left">
            <div className="lot-photo__article__info--left__name lot-photo__article__header">
               <span>{dataIndex.name}</span>
             </div> 
          </div> 
          <div className="lot-photo__article__info--right">
            <div className="lot-photo__article__info--stage-name lot-photo__article__header">
              SHOW NAME 
              <div className="lot-photo__article__answer">
                {dataIndex.show_name}
              </div>
           </div> 
           <div className="lot-photo__article__info--real-name lot-photo__article__header">
              REAL NAME 
            <div className="lot-photo__article__answer">
                {dataIndex.real_name}
             </div>
            </div> 
            <div className="lot-photo__article__info--hometown lot-photo__article__header">
              HOMETOWN 
               <div className="lot-photo__article__answer">
                {dataIndex.hometown}
               </div>
              </div> 
            </div> 
            <div className="lot-photo__article__info__desc">
              {dataIndex.info}
            </div>
            <div className="lot-photo__mixcloud">
              <iframe width = "100%"
                height = "60"
                src = "https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fthelotradio%2F"
                frameBorder = "0"
                title = "mixcloud-iframe">
              </iframe>
            </div>
          </div> 
          <div className="lot-photo__article__info__controls">
            <div className="lot-photo__article__info__controls__wrapper">
              <span className="lot-photo__article__info__controls--previous" onClick={() => {this.props.triggerPrev()}}>
                PREVIOUS 
              </span> 
              <span className="lot-photo__article__info__controls--next" onClick={() => {this.props.triggerNext()}}>
                NEXT 
              </span> 
            </div>
          </div>
        </div>
    )
  }
}

export default Article;