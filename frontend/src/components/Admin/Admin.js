import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import $ from "jquery";

import { getHeroRequest, getPostsRequest, postPostRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './Admin.scss';

import AdminEditOnCancel from './AdminEditOnCancel';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        this.postsHTML = [];
    }

    getPostsHTML(rawPosts) {
        this.postsHTML = rawPosts.map(element =>
            <div>
                <Link key={element.id + Math.random()} to={`/post/${element.id}`}>
                    <div className="post-admin-page" key={element.id + Math.random()}>
                        <img key={element.id + Math.random()} className="blog-img-admin-page" alt="blog-img-admin-page" src={element.image} />
                        <span className="post-id-admin-page" key={element.id + Math.random()}>{element.id}.
                        </span>{element.title}
                    </div> 
                </Link>
                <div key={element.id + Math.random()} className="date-posted-admin-page">{element.date}</div>
                <div key={element.id + Math.random()} className="likes-blog-admin-page">likes: {element.likes}</div> 
            </div>
        );

        return this.postsHTML;
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());
        this.props.dispatch(getPostsRequest());

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded
            })
        }, 500)
    }

    toggleClassFeat() {
        $('.feat-show').toggleClass("show")
        $('.first').toggleClass("rotate")
    }
    toggleClassServ() {
        $('.serv-show').toggleClass("show1")
        $('.second').toggleClass("rotate")
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
        $('nav ul li').click(function(){
            $(this).addClass("active").siblings().removeClass("active")
        })

        $('.btn').click(function(){
            console.log("merge")
            $(this).toggleClass("click")
            $('.sidebar').toggleClass("show")
        })
        return (
            <div>
                <FontAwesomeIcon className="btn" size="2x" icon={faBars} />
                <nav className="sidebar">
                    <div className="text">Side Menu</div>
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li>
                            <a href="#" className="feat-btn" onClick={this.toggleClassFeat}>
                                Features
                                <FontAwesomeIcon className="caret-down first" size="1x" icon={faCaretDown} />
                            </a>
                            <ul className="feat-show">
                                <li><a href="#">Pages</a></li>
                                <li><a href="#">Elements</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="serv-btn" onClick={this.toggleClassServ}>
                                Services
                                <FontAwesomeIcon className="caret-down second" size="1x" icon={faCaretDown} />
                            </a>
                            <ul className="serv-show">
                                <li><a href="#">App Design</a></li>
                                <li><a href="#">Web Design</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Shortcuts</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                </nav>

                {/* <AdminEditOnCancel postId={1}/> */}
                {/* {this.getPostsHTML(this.props.posts)} */}
                {/* <h5 className="trademarks">{this.props.hero.trademarks}</h5> */}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        posts: state.postsReducer.posts.postsArray,
        loaded: state.postsReducer.posts.loaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        getPostsDispatch: () => dispatch(getPostsRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
