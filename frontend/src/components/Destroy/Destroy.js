import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import styles from '../../styles/variables.scss';

import './Destroy.scss';


class Destroy extends React.Component {
    state = {
        hero: {},
        loaded: false,
    }

    componentDidMount() {
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
                404 Not found <br /> <br />Under development
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Destroy;
