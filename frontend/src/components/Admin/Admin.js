import React from 'react';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';

import { getHeroRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './Admin.scss';


class Admin extends React.Component {
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
                404 Not found <br /> <br />Under development
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
