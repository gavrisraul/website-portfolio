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
            articles: [],
            loaded: false,
        }
        this.articlesHTML = [];
    }

    getArticlesHTML(rawArticles) {
        this.articlesHTML = rawArticles.map(element =>
            <Link key={element.id} to={`/article/${element.id}`}>
                <div className="article" key={element.id}>
                    <ArticleImage src={element.image}/>
                    <span className="article-id" key={element.id}>{element.id}.
                    </span>{element.title}
                </div>
            </Link>
        );

        return this.articlesHTML;
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/hero/')
        .then(res => {
            this.setState({
                hero: res.data[0],
            })
        })
        .then(setTimeout(() => {
            this.setState({loaded: true})
        }, 500))
        axios.get('http://127.0.0.1:8000/api/article/')
            .then(res => {
                this.setState({
                    articles: res.data,
                })
            })
    }

    render() {
        return (
            <div>
                <LoadingScreen
                    loading={!this.state.loaded}
                    bgColor='#F7F2EF'
                    spinnerColor='#354654'
                    textColor='#0A100D'
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/website-ui/public/loading.png'
                    text='Loading...'
                />
                <NavigationBar />
                <div className="box-articles">
                    {this.getArticlesHTML(this.state.articles)}
                </div>
                <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

const ArticleImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export default Blog;
