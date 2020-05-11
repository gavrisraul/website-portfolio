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
            dashboard_active: false,
            admin_stuff_active: false,
            hide_navbar_active: true,
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

    toggleClassShowFeat = () => {
        $('.feat-show').toggleClass('show')
        $('.first').toggleClass('rotate')
        this.setState({
            dashboard_active: false,
            admin_stuff_active: true,
        })
    }

    toggleDashboard = () => {
        this.setState({
            dashboard_active: true,
            admin_stuff_active: false,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
    }

    toggleNavbar = () => {
        this.setState({
            hide_navbar_active: !this.state.hide_navbar_active,
            dashboard_active: false,
            admin_stuff_active: false,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
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
           <div className="navbar-wrapper">
               <div className="top-bar">
                    <div className="top-bar-header">Raul Gavriș - Admin Page</div>
               </div>
               <FontAwesomeIcon className={this.state.hide_navbar_active ? 'hide-navbar click-hide-navbar' : "hide-navbar"} size="2x" icon={faBars} onClick={this.toggleNavbar} />
               <div className={this.state.hide_navbar_active ? 'navbar show-only-navbar' : 'navbar'}>
                   <div className="navbar-header">Admin Page</div>
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
                                    <div className="list-item-div-inside">Posts</div>
                                </div>
                                <div className="list-item-inside">
                                    <div className="list-item-div-inside">Portfolio</div>
                                </div>
                                <div className="list-item-inside">
                                    <div className="list-item-div-inside">Emails</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="now-component">
                    <AdminEditOnCancel postId={1}/>
                </div>
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
