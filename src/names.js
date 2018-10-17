import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import json from './data';

class Names extends Component {
  constructor(props) {
    super(props);

    this.keyVal = this.keyVal.bind(this);
  }

  keyVal(i) {
    this.props.triggerArticle(i);
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
      <a href="#" className="lot-photo__artist" data-index={i+1} key={i+1} onClick={() => {this.keyVal({i})}}>
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
      </div>
    )
  }
}

export default Names;
