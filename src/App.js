import React, { Component } from 'react';
import Images from './images.js';
import Article from './article.js';
import Nav from './Nav.js';
import Info from './Info.js';
import './App.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuActive: false,
            namesVisible: false,
            imagesVisible: true,
            articleVisible: false,
            isInfoVisible: false,
            index: 0
        }

        this.toggleArticle = this.toggleArticle.bind(this);
        this.prevArticle = this.prevArticle.bind(this);
        this.nextArticle = this.nextArticle.bind(this);
        // this.toggleNextImage= this.toggleNextImage.bind(this);
    }

    toggleArticle(key) {    
        this.setState({ articleVisible: true, namesVisible: false, imagesVisible: false, index: key.i });
    }

    // toggleNextImage() {
    //     if (!this.state.articleVisible) {
    //         console.log('clicking home');
    //     } else {
    //         console.log('clicking article');
    //     }
    // }

    prevArticle() {
        this.setState((prevState, props) => {
            if (prevState.index === 0) {
                return { index: 26 }
            }
            return { index: prevState.index - 1 }
        });
    }

    nextArticle() {
        this.setState((prevState, props) => {
            if (prevState.index === 26) {
                return { index: 0 }
            }
            return { index: prevState.index + 1 };
        });
    }

    render() {
        const index = this.state.index;
        return ( 
            <section className="lot-photo__container">
                <CSSTransitionGroup 
                    transitionName="animate-nav"
                    transitionAppear={true}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={2000}>
                    <Nav key="nav" triggerArticle={this.toggleArticle} namesState={this.state.namesVisible} /> 
                </CSSTransitionGroup >
                <div className="lot-photo__body">
                    <CSSTransitionGroup transitionName="animate"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300} >
                        {this.state.imagesVisible ? <Images index={index} articleState={this.state.articleVisible} toggleNextImage={this.toggleNextImage} /> : null} 
                        {this.state.articleVisible ? <Article articleState={this.state.articleVisible} index={this.state.index} triggerPrev={this.prevArticle} triggerNext={this.nextArticle} /> : null} 
                        {this.state.isInfoVisible ? <Info/> : null } 
                    </CSSTransitionGroup>
                </div> 
            </section>
        );
    }
}

export default App;