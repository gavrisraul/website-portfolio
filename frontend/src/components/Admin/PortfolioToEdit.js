import React from 'react';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';

// import { getHeroRequest } from '../../redux';

import styles from '../../styles/variables.scss';


class PortfolioToEdit extends React.Component {
    state = {
        loaded: false,
        name: '',
        image: '',
        description: ''
    }

    componentDidMount() {
        // this.props.dispatch(getHeroRequest());

        this.setState({
            name: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].name,
            image: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_image,
            description: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_description,
        })

        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 500)
    }

    updatePortfolio() {
        portfolioApi.postPortfolioAdmin({
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password'),
            portfolio_id: parseInt(this.props.portfolioId) - 1,
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            operation: 'update',
        })
        .then(response => {
            return response.data;
        })
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
                <div>Name: {this.state.name}</div>
                <div>Image: {this.state.image}</div>
                <div>Description: {this.state.description}</div>
                {/* <h5 className="trademarks">{this.props.hero.trademarks}</h5> */}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        // hero: state.heroReducer.hero,
        // loaded: state.heroReducer.hero.loaded,
        adminReducerPortfolio: state.adminReducer.portfolio,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getHeroDispatch: () => dispatch(getHeroRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioToEdit);
