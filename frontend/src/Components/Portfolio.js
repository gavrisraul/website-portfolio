import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import NavigationBar from './NavigationBar';
import '../ComponentsCSS/Portfolio.css';


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
                    bgColor='#F7F2EF'
                    spinnerColor='#354654'
                    textColor='#0A100D'
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                    text='Loading...'
                    children=''
                />
                <NavigationBar />
                <div className="content">
                    <div className="porfolio-item-one">one</div>
                    <div className="porfolio-item-two">two</div>
                    <div className="porfolio-item-three">three</div>
                    <div className="porfolio-item-four">four</div>
                    <div className="porfolio-item-five">five</div>
                    <div className="porfolio-item-six">six</div>
                    <div className="porfolio-item-seven">seven</div>
                    <div className="porfolio-item-eight">eight</div>
                    <div className="porfolio-item-nine">nine</div>
                    <div className="porfolio-item-ten">ten</div>
                </div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Portfolio;
