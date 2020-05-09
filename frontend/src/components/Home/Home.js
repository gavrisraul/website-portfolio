import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

import { getHeroRequest, getLinksRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './Home.scss';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: 'mood - "Can\'t stop! Won\'t stop!"',
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
            '"Learn something new everyday."',
            '"I will not stop until I master everything in the field of computer science and mathematics."',
            'mood - "Can\'t stop! Won\'t stop!"'
        ];
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());
        this.props.dispatch(getLinksRequest());

        this.timer = setInterval(() => {
            this.setState({
                quote: this.quotesArray[Math.floor(Math.random() * this.quotesArray.length)]
            });
        }, 5000);

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded
            })
          }, 500);

        // clearTimeout(this.timer);
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
                <div style={{
                    backgroundImage: "url(" + this.props.hero.hero_image + ")",
                }} className="hero"><Link to={this.props.links.about.url}><div className="hero-link"></div></Link></div>
                <Link to={this.props.links.mindmap.url}><div className="hero-name">{this.props.hero.surname} {this.props.hero.name}</div></Link>
                <a className="container-icon" href={this.props.links.admin_login.url}><div className="hero-profession">{this.props.hero.hero_profession}</div></a>
                <div className="hero-resume"><a href={this.props.links.resume.url}>{this.props.hero.resume_label}</a></div>
                <hr />
                <div className="container">
                    <Link to={this.props.links.about.url}><div className="box"><h1>{this.props.links.about.label}</h1></div></Link>
                    <Link to={this.props.links.blog.url}><div className="box"><h1>{this.props.links.blog.label}</h1></div></Link>
                    <Link to={this.props.links.portfolio.url}><div className="box"><h1>{this.props.links.portfolio.label}</h1></div></Link>
                    <Link to={this.props.links.contact.url}><div className="box"><h1>{this.props.links.contact.label}</h1></div></Link>
                    <Link to={this.props.links.destroy.url}><div className="box boxd"><h1>{this.props.links.destroy.label}</h1></div></Link>
                </div>
                <hr />
                <div className="containericons">
                    <a className="container-icon" href={this.props.links.github.url}><FontAwesomeIcon className="icon" size="2x" icon={faGithub} /></a>
                    <a className="container-icon" href={this.props.links.linkedin.url}><FontAwesomeIcon className="icon" size="2x" icon={faLinkedin} /></a>
                    <a className="container-icon" href={this.props.links.facebook.url}><FontAwesomeIcon className="icon" size="2x" icon={faFacebookSquare} /></a>
                    <a className="container-icon" href={this.props.links.instagram.url}><FontAwesomeIcon className="icon" size="2x" icon={faInstagram} /></a>
                    <a className="container-icon" href={this.props.links.youtube.url}><FontAwesomeIcon className="icon" size="2x" icon={faYoutube} /></a>
                </div>
                <div className="quote">{this.state.quote}</div>
                <h5 className="trademarks">{this.props.hero.trademarks}</h5>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        loaded: state.linksReducer.links.loaded,
        links: state.linksReducer.links,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        getLinksDispatch: () => dispatch(getLinksRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
