import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import $ from "jquery";

import { getHeroRequest, getPostsRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './Admin.scss';

import AdminEditOnCancel from './AdminEditOnCancel';

import portfolioApi from '../../services/portfolioApi';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dashboard_active: true,
            admin_stuff_active: false,
            hide_navbar_active: true,
            is_authenticated: false,
            access_token: undefined,
            refresh_token: undefined,
            quote: 'mood - "Can\'t stop! Won\'t stop!"',
            posts: [],
            posts_active: false,
            portfolio_active: false,
            email_active: false,
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
        // this.postsHTML = [];
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
        if (localStorage.getItem('access_token')) {
            this.setState({
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token'),
            })
            this.setState({
                is_authenticated: true,
            })
            // this.props.dispatch(getPostsRequest());
            portfolioApi.getPostsAdmin()
                .then(response => {
                    this.setState({
                        posts: response.data
                    })
                })
            this.props.dispatch(getHeroRequest());
            this.timer = setInterval(() => {
                this.setState({
                    quote: this.quotesArray[Math.floor(Math.random() * this.quotesArray.length)]
                });
            }, 5000);
            setTimeout(() => {
                this.setState({
                    loaded: this.props.loaded
                })
            }, 500)
        }
    }

    logOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    toggleClassShowFeat = () => {
        $('.feat-show').toggleClass('show')
        $('.first').toggleClass('rotate')
        this.setState({
            dashboard_active: false,
            admin_stuff_active: true,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
        })
    }

    toggleDashboard = () => {
        this.setState({
            dashboard_active: true,
            admin_stuff_active: false,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
    }

    toggleNavbar = () => {
        this.setState({
            hide_navbar_active: !this.state.hide_navbar_active,
            // dashboard_active: false,
            // admin_stuff_active: false,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
    }

    togglePostsActive = () => {
        this.setState({
            posts_active: true,
            portfolio_active: false,
            email_active: false,
        })
    }

    toggleEmailActive = () => {
        this.setState({
            email_active: true,
            posts_active: false,
            portfolio_active: false,
        })
    }

    togglePortfolioActive = () => {
        this.setState({
            portfolio_active: true,
            email_active: false,
            posts_active: false,
        })
    }

    render() {
        if (this.state.loaded === false || this.state.is_authenticated === false) {
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
           <div className="navbar-wrapper">
               <div className="top-bar">
                    <div className="top-bar-header">Raul Gavriș - Admin Page</div>
                    <button className="logout" onClick={this.logOut}>Log Out</button>
               </div>
               <FontAwesomeIcon className={this.state.hide_navbar_active ? 'hide-navbar click-hide-navbar' : "hide-navbar"} size="2x" icon={faBars} onClick={this.toggleNavbar} />
               <div className={this.state.hide_navbar_active ? 'navbar show-only-navbar' : 'navbar'}>
                   <div className="navbar-header">Admin Page</div>
                   <div className="trademarks-admin">{this.props.hero.trademarks}</div>
                   <div className="ul-list-item">
                       <div className="list-item">
                           <div className={this.state.dashboard_active ? 'list-item-div active-panel' : 'list-item-div'} onClick={this.toggleDashboard}>Dashboard</div>
                        </div>
                        <div className="list-item">
                           <div className={this.state.admin_stuff_active ? 'list-item-div active-panel' : 'list-item-div'} onClick={this.toggleClassShowFeat}>
                               Admin Stuff
                                <FontAwesomeIcon className="caret-down first" size="2x" icon={faCaretDown} />
                            </div>
                            <div className="ul-list-item-inside feat-show">
                               <div className="list-item-inside">
                                    <div onClick={this.togglePostsActive} className="list-item-div-inside">Posts</div>
                                </div>
                                <div className="list-item-inside">
                                    <div onClick={this.togglePortfolioActive} className="list-item-div-inside">Portfolio</div>
                                </div>
                                <div className="list-item-inside">
                                    <div onClick={this.toggleEmailActive} className="list-item-div-inside">Emails</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="now-component">
                    {
                        this.state.dashboard_active && <div className="admin-quote">{this.state.quote}</div>
                    }
                    {
                        this.state.posts_active && <div className="posts-admin">{this.getPostsHTML(this.state.posts)}</div>
                    }
                    {
                        this.state.portfolio_active && <div className="portfolio-admin">{this.getPostsHTML(this.state.posts)}</div>
                    }
                    {
                        this.state.email_active && <div className="email-admin">{this.getPostsHTML(this.state.posts)}</div>
                    }
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        loaded: state.heroReducer.hero.loaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
