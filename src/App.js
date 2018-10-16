import React, { Component } from 'react';
import Images from './Images.js';
import Article from './Article.js';
import Nav from './Nav.js';
import Info from './Info.js';
import './App.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import json from './data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuActive: false,
            namesVisible: false,
            imagesVisible: true,
            articleVisible: false,
            isInfoVisible: false,
            index: 0,
            counter: 1
        }

        this.toggleArticle = this.toggleArticle.bind(this);
        this.prevArticle = this.prevArticle.bind(this);
        this.nextArticle = this.nextArticle.bind(this);
        this.resetHome = this.resetHome.bind(this);
        this.clickCounter = this.clickCounter.bind(this);
        this.count = 1;
        this.hover = this.hover.bind(this);
    }

    toggleArticle(key) {    
        this.setState({ articleVisible: true, namesVisible: false, imagesVisible: false, index: key.i });
    }

    prevArticle() {
        this.setState((prevState, props) => {
            if (prevState.index === 0) {
                return { index: 26 }
            }
            return { index: prevState.index - 1 }
        });
    }

    hover(key) {
        console.log(key);
    }

    nextArticle() {
        this.setState((prevState, props) => {
            if (prevState.index === 26) {
                return { index: 0 }
            }
            return { index: prevState.index + 1 };
        });
    }

    resetHome() {
        this.setState((prevState) => {
            return { articleVisible: false, imagesVisible: true }
        });
    }

    // TODO: reset when 0
    clickCounter() {
        this.count ++;
        document.querySelector('.counter').innerHTML = this.count;
    }

    render() {
        const index = this.state.index;

        // TODO: optimize images
        let imageArray = [];

        json.artists.map((artist) => {
          imageArray.push(artist.image_one);
          imageArray.push(artist.image_two);
          imageArray.push(artist.image_three);
        });
    
        // TODO: optimize images
        imageArray.forEach((picture) => {
            const img = new Image();
            img.src = picture
            img.src = process.env.PUBLIC_URL + picture;

            console.log(img);

            img.onload = () => {
                console.log('image loaded');
            }
        });

        return ( 
            <section className="lot-photo__container">
                <CSSTransitionGroup 
                    transitionName="animate-nav"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={2000}>
                    <Nav key="nav" hover={this.hover} triggerArticle={this.toggleArticle} namesState={this.state.namesVisible} resetHome={this.resetHome} /> 
                </CSSTransitionGroup >
                <div className="lot-photo__body">
                    <CSSTransitionGroup transitionName="animate"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300} >
                        {this.state.imagesVisible ? <Images clickCounter={this.clickCounter} index={index} articleState={this.state.articleVisible} toggleNextImage={this.toggleNextImage} /> : null} 
                        {this.state.articleVisible ? <Article articleState={this.state.articleVisible} index={this.state.index} triggerPrev={this.prevArticle} triggerNext={this.nextArticle} /> : null} 
                        {this.state.isInfoVisible ? <Info/> : null } 
                    </CSSTransitionGroup>
                </div> 
                <div className="lot-photo__counter" onClick={() => {this.clickCounter()}}>
                    <span className="counter">1</span> / 27
                </div>
            </section>
        );
    }
}

export default App;