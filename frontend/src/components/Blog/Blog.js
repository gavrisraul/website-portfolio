import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

import NavigationBar from '../NavigationBar';

import styles from '../../styles/variables.scss';

import './Blog.scss';


class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hero: {},
            posts: [],
            loaded: false,
        }
        this.postsHTML = [];
    }

    getPostsHTML(rawPosts) {
        this.postsHTML = rawPosts.map(element =>
            <div>
                <Link key={element.id + Math.random()} to={`/post/${element.id}`}>
                    <div className="post" key={element.id + Math.random()}>
                        <img className="blog-img" alt="blog-img" src={element.image} />
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
        axios.get('http://127.0.0.1:8000/api/hero/')
        .then(res => {
            this.setState({
                hero: res.data[0],
            })
        })
        axios.get('http://127.0.0.1:8000/api/post/')
            .then(res => {
                this.setState({
                    posts: res.data,
                })
            })
            .then(setTimeout(() => {
                this.setState({loaded: true})
            }, 500))
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
                <NavigationBar />
                <div className="box-posts">
                    {this.getPostsHTML(this.state.posts)}
                </div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Blog;
