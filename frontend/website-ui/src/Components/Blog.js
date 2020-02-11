import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

import NavigationBar from './NavigationBar';


class Blog extends React.Component {
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
                <h5>Raul Gavriș © 2020</h5>
            </div>
        );
    };
}

export default Blog;
