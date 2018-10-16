import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import json from './data';

class Images extends Component {
  constructor(props) {
    super(props);

    this.artist = document.querySelector('.lot-photo__image img');
    
    let artistIndex = json.artists;
    this.state = {
      index: 0,
      counter: 0,
      images: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState((state, props) => {
      return {
        index: props.index,
        images: [json.artists[props.index].image_one, json.artists[props.index].image_two, json.artists[props.index].image_three]
      }
    });
  }

  componentWillMount() {
    let randomIndex = Math.floor(Math.random() * 27);
    this.setState({
      index: randomIndex
    })
  }

  componentDidUpdate() {
    if (this.props.articleState) {
      const img = document.querySelector('.lot-photo__image img');
      img.src = process.env.PUBLIC_URL + this.state.images[this.state.counter];
    }
  }

  nextImage() {
    if (!this.props.articleState) {
      let randomIndex = Math.floor(Math.random() * 27);
      this.setState((prevState) => {
        return { index: randomIndex, counter: prevState.counter + 1 };
      });

      this.newPos();
      this.props.clickCounter();
    } else {
      this.setState((prevState, props) => {
        if (prevState.counter === 2) {
          return { counter: 0 };
        }
        return { counter: prevState.counter + 1 };
    });
    }
  }

  newPos() {
    const artistImg = document.querySelector('.lot-photo__image');
    let randomPositionX = Math.random() * 600;
    let randomPositionY = Math.random() * 75;

    setTimeout(() => {
      artistImg.style.marginLeft = `${randomPositionX}px`;
      artistImg.style.marginTop = `${randomPositionY}px`;
    }, 0);
  }

  componentDidMount() {
    if (!this.props.articleState) {
      this.newPos();
    }
  }

  render() {
    const data = json.artists;
    let dataIndex;

    this.state.index ? dataIndex = this.state.index : dataIndex = 0;
    let imagesPath = data[dataIndex];
    let images = [imagesPath.image_one, imagesPath.image_two, imagesPath.image_three];
    let imageVal = process.env.PUBLIC_URL + images[0];

    const toggleNextImage = this.props.toggleNextImage;

    return (
      <div className="lot-photo__image" onClick={() => {this.nextImage()}}>
        <CSSTransitionGroup
          transitionName="animate"
          transitionAppear={true}
          transitionAppearTimeout={700}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={0}
          transitionLeave={false}
          >
          <img src={imageVal} key={dataIndex} alt={dataIndex} />
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Images;
