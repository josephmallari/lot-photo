import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import json from './data';
import Images from './Images';

class Names extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }

    this.keyVal = this.keyVal.bind(this);
    this.hoverArticle = this.hoverArticle.bind(this);

    console.log(this.props.index);
  }

  keyVal(i) {
    this.props.triggerArticle(i);
  }

  hoverArticle(i) {
    this.props.hover(i);

    this.setState((prevState) => {
      return { hover: true };
    });
  }

  render() {
    const dataClone = {...json.artists};
    const namesArray = [];

    for (const key in dataClone) {
      if (dataClone.hasOwnProperty(key)) {
        namesArray.push(dataClone[key].name);
      }
    }

    const name = namesArray.map((name, i) => (
      <a href="#" className="lot-photo__artist" data-index={i+1} key={i+1} onMouseEnter={() => {this.hoverArticle(i)} } onClick={() => {this.keyVal({i})}}>
         <span className="lot-photo__number">{i+1}</span>{name}
      </a>
    ))

    return (
      <div className="lot-photo__artists-list">
        <CSSTransitionGroup
          transitionName="animate"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={300}
          >
          {name}
        </CSSTransitionGroup>
        {/* add image component here */}
        {this.state.hover ? <Images /> : null}
      </div>
    )
  }
}

export default Names;
