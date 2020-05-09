import React from 'react';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';

import convert from 'htmr';

import { getHeroRequest } from '../../redux';

import NavigationBar from '../NavigationBar';

import styles from '../../styles/variables.scss';

import './About.scss';


class About extends React.Component {
    state = {
        loaded: false,
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());

        setTimeout(() => {
            this.setState({
                loaded: true
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
                <div style={{
                    backgroundImage: "url(" + this.props.hero.hero_image + ")",
                }} className="hero-img"></div>
                <div className="hero-description">{ convert(String(this.props.hero.hero_description)) }</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

