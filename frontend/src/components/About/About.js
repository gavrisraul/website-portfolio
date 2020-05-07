import React from 'react';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import convert from 'htmr';

import NavigationBar from '../NavigationBar';

import styles from '../../styles/variables.scss';

import './About.scss';


class About extends React.Component {
    state = {
        hero: {},
        loaded: false,
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        axios.get('https://api.raulgavris.com/hero/')
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
                <div style={{
                    backgroundImage: "url(" + this.state.hero.hero_image + ")",
                }} className="hero-img"></div>
                <div className="hero-description">{ convert(String(this.state.hero.hero_description)) }</div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default About;
