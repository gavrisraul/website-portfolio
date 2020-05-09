import React from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';
import { getHeroRequest, getPostsRequest } from '../../redux';

import NavigationBar from '../NavigationBar';
import styles from '../../styles/variables.scss';

import './Blog.scss';


class Blog extends React.Component {
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
                    <div className="post" key={element.id + Math.random()}>
                        <img key={element.id + Math.random()} className="blog-img" alt="blog-img" src={element.image} />
                        <span className="post-id" key={element.id + Math.random()}>{element.id}.
                        </span>{element.title}
                    </div> 
                </Link>
                <div key={element.id + Math.random()} className="date-posted">{element.date}</div>
                <div key={element.id + Math.random()} className="likes-blog">likes: {element.likes}</div> 
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
                <NavigationBar />
                <div className="box-posts">
                    {this.getPostsHTML(this.props.posts)}
                </div>
                <h5 className="trademarks">{this.props.hero.trademarks}</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
