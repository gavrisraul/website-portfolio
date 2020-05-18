import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import $ from "jquery";

import {
    getHeroRequest, blacklistTokenRequest,
    getPostsAdminRequest, getPortfolioAdminRequest, getEmailAdminRequest,
    postPortfolioAdminDeleteRequest, postEmailAdminDeleteRequest, postPostsAdminDeleteRequest,
} from '../../redux';

import styles from '../../styles/variables.scss';

import './Admin.scss';

import portfolioApi from '../../services/portfolioApi';
import AdminEditOnCancel from './AdminEditOnCancel';
import EmailToView from './EmailToView';
import PortfolioToEdit from './PortfolioToEdit';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dashboard_active: true,
            admin_stuff_active: false,
            hide_navbar_active: true,
            quote: 'mood - "Can\'t stop! Won\'t stop!"',
            posts: [],
            posts_active: false,
            portfolio_active: false,
            email_active: false,
            redirect: 0,
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
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
        this.postsHTML = [];
        this.portfolioHTML = [];
        this.emailHTML = [];

        this.getPostToEdit = this.getPostToEdit.bind(this);
        this.getPortfolioToEdit = this.getPortfolioToEdit.bind(this);
        this.getEmailToView = this.getEmailToView.bind(this);

        this.deletePost = this.deletePost.bind(this);
        this.deletePortfolio = this.deletePortfolio.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
    }

    getPostsHTML(rawPosts) {
        this.postsHTML = rawPosts.map(element =>
            <div className="posts-admin">
                <img alt={element.id} id={element.id} onClick={this.getPostToEdit} className="posts-image" src={element.image} />
                <div className="posts-title">
                    <div className="posts-id">{element.id}.</div>
                    <Link to={`/post/${element.id}`}>
                        {element.title}
                    </Link>
                </div>
                <div className="posts-date-likes">
                    <div className="posts-date">date: {element.date}</div>
                    <div className="posts-likes">likes: {element.likes}</div>
                </div>
                <br /> <br />
                <button id={element.id} onClick={this.deletePost} className="delete-admin">X</button>
            </div>
        );

        return this.postsHTML;
    }

    getPortfolioHTML(rawPortfolio) {
        this.portfolioHTML = rawPortfolio.map(element =>
            <div className="portfolio-admin">
                <img alt={element.id} id={element.id} onClick={this.getPortfolioToEdit} className="portfolio-image" src={element.portfolio_image} />
                <div className="portfolio-name">
                    <div className="portfolio-id">{element.id}.</div>
                    {element.name}
                </div>
                <button id={element.id} onClick={this.deletePortfolio} className="delete-admin">X</button>
            </div>
        );

        return this.portfolioHTML;
    }

    getEmailHTML(rawEmail) {
        this.emailHTML = rawEmail.map(element =>
            <div className="email-admin">
                <div id={element.id} onClick={this.getEmailToView} className="from-email">email: {element.email}</div>
                <div className="from-name">from: {element.name}</div>
                <div className="email-subject">subject: {element.subject}</div>
                <div className="email-datesend">date send: {element.date_send}</div>
                <button id={element.id} onClick={this.deleteEmail} className="delete-admin">X</button>
            </div>
        );

        return this.emailHTML;
    }

    getPostToEdit(element) {
        this.setState({
            post_to_edit: element.target.id,
            portfolio_to_edit: -1,
            email_to_view: -1,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
            dashboard_active: false,
            admin_stuff_active: false,
        });
    }

    getPortfolioToEdit(element) {
        this.setState({
            post_to_edit: -1,
            portfolio_to_edit: element.target.id,
            email_to_view: -1,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
            dashboard_active: false,
            admin_stuff_active: false,
        });
    }

    getEmailToView(element) {
        this.setState({
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: element.target.id,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
            dashboard_active: false,
            admin_stuff_active: false,
        });
    }

    deleteEmail(element) {
        this.props.email.splice(parseInt(element.target.id) - 1, 1);
        this.props.dispatch(postEmailAdminDeleteRequest(element.target.id, 'delete'));
    }

    deletePost(element) {
        this.props.posts.splice(parseInt(element.target.id) - 1, 1);
        this.props.dispatch(postPostsAdminDeleteRequest(element.target.id, 'delete'));
    }

    deletePortfolio(element) {
        this.props.portfolio.splice(parseInt(element.target.id) - 1, 1);
        this.props.dispatch(postPortfolioAdminDeleteRequest(element.target.id, 'delete'));
    }

    componentDidMount() {
        portfolioApi.getCredentials()
            .then(response => {
                this.setState({
                    redirect: response.status,
                })
            })
            .then(isLoggedIn => {
                if (this.state.redirect === 200) {
                    this.props.dispatch(getHeroRequest());
                    this.props.dispatch(getPostsAdminRequest());
                    this.props.dispatch(getPortfolioAdminRequest());
                    this.props.dispatch(getEmailAdminRequest());
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
                    return isLoggedIn;
                }
            })
    }

    logOut = () => {
        this.props.dispatch(blacklistTokenRequest());
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
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
        })
    }

    toggleDashboard = () => {
        this.setState({
            dashboard_active: true,
            admin_stuff_active: false,
            portfolio_active: false,
            email_active: false,
            posts_active: false,
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
    }

    toggleNavbar = () => {
        this.setState({
            hide_navbar_active: !this.state.hide_navbar_active,
        })
        $('.first').removeClass('rotate')
        $('.feat-show').removeClass('show')
    }

    togglePostsActive = () => {
        this.setState({
            posts_active: true,
            portfolio_active: false,
            email_active: false,
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
        })
    }

    toggleEmailActive = () => {
        this.setState({
            email_active: true,
            posts_active: false,
            portfolio_active: false,
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
        })
    }

    togglePortfolioActive = () => {
        this.setState({
            portfolio_active: true,
            email_active: false,
            posts_active: false,
            post_to_edit: -1,
            portfolio_to_edit: -1,
            email_to_view: -1,
        })
    }

    render() {
        if (this.state.loaded === false || this.state.redirect !== 200) {
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
                        this.state.email_to_view !== -1 &&
                        <EmailToView emailId={this.state.email_to_view}/>
                    }
                    {
                        this.state.post_to_edit !== -1 &&
                        <AdminEditOnCancel postId={this.state.post_to_edit}/>
                    }
                    {
                        this.state.portfolio_to_edit !== -1 &&
                        <PortfolioToEdit portfolioId={this.state.portfolio_to_edit}/>
                    }
                    {
                        this.state.dashboard_active && <div className="admin-quote">{this.state.quote}</div>
                    }
                    {
                        this.state.posts_active &&
                        <div>
                            {this.getPostsHTML(this.props.posts)}
                            <button onClick={() => {this.setState({post_to_edit: 0})}} className="add-post">Add Post!</button>
                        </div>
                    }
                    {
                        this.state.portfolio_active &&
                        <div>
                            {this.getPortfolioHTML(this.props.portfolio)}
                            <button onClick={() => {this.setState({portfolio_to_edit: 0})}} className="add-portfolio">Add Portfolio!</button>
                        </div>
                    }
                    {
                        this.state.email_active &&
                        <div>
                            {this.getEmailHTML(this.props.email)}
                        </div>
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
        posts: state.adminReducer.posts,
        portfolio: state.adminReducer.portfolio,
        email: state.adminReducer.email,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroRequest: () => dispatch(getHeroRequest()),
        blacklistTokenRequest: () => dispatch(blacklistTokenRequest()),
        getPostsAdminRequest: () => dispatch(getPostsAdminRequest()),
        getPortfolioAdminRequest: () => dispatch(getPortfolioAdminRequest()),
        getEmailAdminRequest: () => dispatch(getEmailAdminRequest()),
        postEmailAdminDeleteRequest: () => dispatch(postEmailAdminDeleteRequest()),
        postPortfolioAdminDeleteRequest: () => dispatch(postPortfolioAdminDeleteRequest()),
        postPostsAdminDeleteRequest: () => dispatch(postPostsAdminDeleteRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Admin));
