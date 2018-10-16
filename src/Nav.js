import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './App.css';
import Names from './Names.js';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuActive: false,
      namesVisible: false,
      imagesVisible: true,
      articleVisible: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      namesVisible: this.props.namesState
    })
  }

  render() {
    let menuClassName = `lot-photo__nav` + (this.state.isMenuActive ? ` lot-photo__nav--active` : ``);

    return (
      <nav className={menuClassName} key="navs">
        <ul>
          <li className="lot-photo__home" onClick={() => {this.props.resetHome()}}>the lot photo</li>
          <li className="lot-photo__menu" onClick={() =>
            this.setState({isMenuActive: !this.state.isMenuActive})}>
              menu
          </li>
          <li className="lot-photo__names" onClick={() => this.setState({namesVisible: !this.state.namesVisible})}>articles</li>
          <CSSTransitionGroup
            transitionName="animate"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            >
            {this.state.namesVisible ? <Names triggerArticle={this.props.triggerArticle} /> : null}
          </CSSTransitionGroup>
          {/* <li className="lot-photo__book">book</li> */}
          <li className="lot-photo__information">information</li>
        </ul>
        <div className="lot-photo__menu-mobile">
          <ul>
            <li onClick={() => this.setState({isMenuActive: false})}>x</li>
            <li onClick={() => this.setState({namesVisible: true, isMenuActive: false, imagesVisible: false})}>
              artists
            </li>
            {/* <li>book</li> */}
            <li>photo</li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav
