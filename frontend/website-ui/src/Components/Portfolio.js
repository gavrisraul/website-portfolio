import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import '../ComponentsCSS/Portfolio.css';


class Portfolio extends React.Component {
    state = {

    }

    // componentDidMount() {
        // const { match: { params } } = this.props;
        // axios.get('http://127.0.0.1:8000/api/hero/')
        //     .then(res => {
        //         this.setState({
        //             hero: res.data[0],
        //         })
        //     })
    // }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
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
                <h5>Raul Gavriș © 2020</h5>
            </div>
        );
    };
}

export default Portfolio;
