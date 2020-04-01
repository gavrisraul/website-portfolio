import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

import styles from '../../styles/variables.scss';

import './Home.scss';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            quote: '"I work hard everyday." - Logic',
            loaded: false,
        }
        this.timer = undefined;
        this.quotesArray = [
            '"Great spirits have always encountered opposition from mediocre minds." - Albert Einstein',
            '"So the last will be first, and the first will be last." - Matthew',
            '"I work hard everyday." - Logic',
            '"Your limitation, it’s only your imagination."',
            '"Great things never come from comfort zones."',
            '"The harder you work for something, the greater you’ll feel when you achieve it."',
            '"Learn something new everyday."'
        ];
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                quote: this.quotesArray[Math.floor(Math.random() * this.quotesArray.length)]
            });
        }, 5000);


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
            .then(setTimeout(() => {
                this.setState({loaded: true})
            }, 500))

        // clearTimeout(this.timer);
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

                <div style={{
                    backgroundImage: "url(" + this.state.hero.hero_image + ")",
                }} className="hero"><Link to="/about"><div className="hero-link"></div></Link></div>
                <Link to="/mindmap"><div className="hero-name">{this.state.hero.surname} {this.state.hero.name}</div></Link>
                <div className="hero-profession">{this.state.hero.hero_profession}</div>
                <div className="hero-resume"><a href={this.state.resume.url}>{this.state.hero.resume_label}</a></div>
                <hr />
                <div className="container">
                    <Link to="/about"><div className="box"><h1>{this.state.about.label}</h1></div></Link>
                    <Link to="/blog"><div className="box"><h1>{this.state.blog.label}</h1></div></Link>
                    <Link to="/portfolio"><div className="box"><h1>{this.state.portfolio.label}</h1></div></Link>
                    <Link to="/contact"><div className="box"><h1>{this.state.contact.label}</h1></div></Link>
                    <Link to="/destroy"><div className="box boxd"><h1>{this.state.destroy.label}</h1></div></Link>
                </div>
                <hr />
                <div className="containericons">
                    <a className="container-icon" href={this.state.github.url}><FontAwesomeIcon className="icon" size="2x" icon={faGithub} /></a>
                    <a className="container-icon" href={this.state.linkedin.url}><FontAwesomeIcon className="icon" size="2x" icon={faLinkedin} /></a>
                    <a className="container-icon" href={this.state.facebook.url}><FontAwesomeIcon className="icon" size="2x" icon={faFacebookSquare} /></a>
                    <a className="container-icon" href={this.state.instagram.url}><FontAwesomeIcon className="icon" size="2x" icon={faInstagram} /></a>
                    <a className="container-icon" href={this.state.youtube.url}><FontAwesomeIcon className="icon" size="2x" icon={faYoutube} /></a>
                </div>
                <div className="quote">{this.state.quote}</div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Home;
