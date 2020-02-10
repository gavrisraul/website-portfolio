import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"


import '../ComponentsCSS/Home.css';


class Home extends React.Component {
    state = {
        hero: {},
        about: {},
        blog: {},
        portfolio: {},
        contact: {},
        destroy: {},
        github: {},
        linkedin: {},
        youtube: {},
        facebook: {},
        instagram: {},
        resume: {},
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/api/hero/')
            .then(res => {
                this.setState({
                    hero: res.data[0],
                })
            })
        axios.get('http://127.0.0.1:8000/api/links/')
            .then(res => {
                this.setState({
                    about: res.data[0],
                    blog: res.data[1],
                    portfolio: res.data[2],
                    contact: res.data[3],
                    destroy: res.data[4],
                    github: res.data[5],
                    linkedin: res.data[6],
                    facebook: res.data[7],
                    instagram: res.data[8],
                    youtube: res.data[9],
                    resume: res.data[10],
                })
            })
    }

    render() {
        return (
            <div>
                <Link to="/about"><div style={{  
                    backgroundImage: "url(" + this.state.hero.hero_image + ")",
                }} className="hero"></div></Link>
                <div className="hero-name">{this.state.hero.surname} {this.state.hero.name}</div>
                <div className="hero-profession">{this.state.hero.hero_profession}</div>
                <div className="hero-resume"><a href={this.state.resume.url}>{this.state.hero.resume_label}</a></div>
                <hr />
                <div className="container">
                    <div className="box"><h1><Link to="/about">{this.state.about.label}</Link></h1></div>
                    <div className="box"><h1><Link to="/blog">{this.state.blog.label}</Link></h1></div>
                    <div className="box"><h1><Link to="/portfolio">{this.state.portfolio.label}</Link></h1></div>
                    <div className="box"><h1><Link to="/contact">{this.state.contact.label}</Link></h1></div>
                    <div className="box boxd"><h1><Link to="/destroy">{this.state.destroy.label}</Link></h1></div>
                </div>
                <hr />
                <div className="containericons">
                    <a href={this.state.github.url}><FontAwesomeIcon className="icon" size="2x" color="#fff" icon={faGithub} /></a>
                    <a href={this.state.linkedin.url}><FontAwesomeIcon className="icon" size="2x" color="#fff" icon={faLinkedin} /></a> 
                    <a href={this.state.facebook.url}><FontAwesomeIcon className="icon" size="2x" color="#fff" icon={faFacebookSquare} /></a>
                    <a href={this.state.instagram.url}><FontAwesomeIcon className="icon" size="2x" color="#fff" icon={faInstagram} /></a>
                    <a href={this.state.youtube.url}><FontAwesomeIcon className="icon" size="2x" color="#fff" icon={faYoutube} /></a>
                </div>
                <h5>{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Home;
