import React from 'react';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';

// import { Link } from 'react-router-dom';

import { getHeroRequest } from '../../redux';

import NavigationBar from '../NavigationBar';
import styles from '../../styles/variables.scss';

import './Portfolio.scss';


class Portfolio extends React.Component {
    state = {
        loaded: false,
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded
            })
        }, 500)
    }

    render() {
        if (this.state.loaded === false) {
            return (
                <LoadingScreen
                    loading={!this.state.loaded}
                    bgColor={styles.color1}
                    spinnerColor={styles.color2}
                    textColor={styles.color4}
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                    text='Loading...'
                    children=''
                />
            )
        }
        return (
            <div>
         
                <NavigationBar />
                <div className="content">
                    <a className="porfolio-item-one" href="https://github.com/raulgavris/website-portfolio"><div className="text-item">Website-Portfolio</div></a>
                    <a className="porfolio-item-two" href="https://github.com/raulgavris/dotfiles"><div className="text-item">vim (neovim) / zsh-(Developer tools)</div></a>
                    <a className="porfolio-item-three" href="https://github.com/raulgavris/rg.ai"><div className="text-item">Arch-Linux-Cutomization</div></a>
                    <a className="porfolio-item-four" href="/portfolio"><div className="text-item">Sorting-algorithms-visualization</div></a>
                    <a className="porfolio-item-five" href="/portfolio"><div className="text-item">Path-finding-algorithm-visualization</div></a>
                    <a className="porfolio-item-six" href="/portfolio"><div className="text-item">Javascript-games</div></a>
                    <a className="porfolio-item-seven" href="/portfolio"><div className="text-item">Unity-engine-games</div></a>
                    <a className="porfolio-item-eight" href="/portfolio"><div className="text-item">AI-made-in-p5js</div></a>
                    <a className="porfolio-item-nine" href="/portfolio"><div className="text-item">Programming-language-implementation</div></a>
                    <a className="porfolio-item-ten" href="/portfolio"><div className="text-item">Linux-distro-implementation</div></a>
                </div>
                <h5 className="trademarks">{this.props.hero.trademarks}</h5>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        loaded: state.heroReducer.hero.loaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

