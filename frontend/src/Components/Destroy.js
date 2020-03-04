import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';


class Destroy extends React.Component {
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
                    bgColor='#F7F2EF'
                    spinnerColor='#354654'
                    textColor='#0A100D'
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/public/loading.png'
                    text='Loading...'
                    children=''
                />
                Destroy
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Destroy;
