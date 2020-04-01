import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import NavigationBar from '../NavigationBar';
import styles from '../../styles/variables.scss';

import './Portfolio.scss';


class Portfolio extends React.Component {
    state = {
        hero: {},
        loaded: false,
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/hero/')
        .then(res => {
            this.setState({
                hero: res.data[0],
            })
        })
        .then(setTimeout(() => {
            this.setState({loaded: true})
        }, 500))
    }

    render() {
        return (
            <div>
                <LoadingScreen
                    loading={!this.state.loaded}
                    bgColor={styles.color1}
                    spinnerColor={styles.color2}
                    textColor={styles.color4}
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                    text='Loading...'
                    children=''
                />
                <NavigationBar />
                <div className="content">
                    <a className="porfolio-item-one" href="https://github.com/raulgavris/website-portfolio"><div className="text-item">Website Portfolio</div></a>
                    <a className="porfolio-item-two" href="https://github.com/raulgavris/dotfiles"><div className="text-item">vim (neovim) / zsh <br/>(Developer tools)</div></a>
                    <a className="porfolio-item-three" href="https://github.com/raulgavris/rg.ai"><div className="text-item">Arch Linux Cutomization</div></a>
                    <a className="porfolio-item-four" href="/portfolio"><div className="text-item">Sorting algorithms visualization</div></a>
                    <a className="porfolio-item-five" href="/portfolio"><div className="text-item">Path finding algorithm visualization</div></a>
                    <a className="porfolio-item-six" href="/portfolio"><div className="text-item">Javascript games</div></a>
                    <a className="porfolio-item-seven" href="/portfolio"><div className="text-item">Unity engine games</div></a>
                    <a className="porfolio-item-eight" href="/portfolio"><div className="text-item">AI made in p5js</div></a>
                    <a className="porfolio-item-nine" href="/portfolio"><div className="text-item">Programming language implementation</div></a>
                    <a className="porfolio-item-ten" href="/portfolio"><div className="text-item">Linux distro implementation</div></a>
                </div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Portfolio;
