import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';


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
                <nav>
                    <div className="nav_links">
                        <div className="link_nav"><Link to="/">Home</Link></div>
                        <div className="link_nav"><Link to="/about">About</Link></div>
                        <div className="link_nav"><Link to="/portfolio">Potrfolio</Link></div>
                        <div className="link_nav"><Link to="/contact">Contact</Link></div>
                    </div>
                </nav>
            </div>
        );
    };
}

export default Blog;
