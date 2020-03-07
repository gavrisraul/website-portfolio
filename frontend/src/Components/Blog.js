import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import styled from 'styled-components';

import NavigationBar from './NavigationBar';

import '../ComponentsCSS/Blog.css';


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
                        <PostImage className="blog-img" src={element.image} />
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
                    bgColor='#F7F2EF'
                    spinnerColor='#354654'
                    textColor='#0A100D'
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/public/loading.png'
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

const PostImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export default Blog;
