import React from 'react';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
// import Post1 from '../ComponentsMD/Post1.md'; // for development purposese

import '../ComponentsCSS/BlogPost.css';


class BlogPost extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            markdown: '',
            hero: {},
            post: {},
            loaded: false,
        };
    }

    // componentWillMount() {
    //     fetch(Post1).then(res => res.text()).then(text => this.setState({ markdown: text }));
    // }

    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/api/hero/')
            .then(res => {
                this.setState({
                    hero: res.data[0],
                })
            })
        axios.get(`http://127.0.0.1:8000/api/post/${params.id}/`)
            .then(res => {
                this.setState({
                    post: res.data,
                })
            })
            .then(setTimeout(() => {
                this.setState({loaded: true})
            }, 500))
    }

  render() {
    return (
      <div className="blog-post">
        <LoadingScreen
            loading={!this.state.loaded}
            bgColor='#F7F2EF'
            spinnerColor='#354654'
            textColor='#0A100D'
            logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/website-ui/public/loading.png'
            text='Loading...'
            children=''
        />
        <Title>{this.state.post.title}</Title>
        <ReactMarkdown
            source={this.state.post.text}
            // source={this.state.markdown} //for development purposes
            renderers={{
                code: CodeBlock,
            }}
        />
        <Link to='/blog'><Back>Go to posts</Back></Link>
        <div className="trademarks">{this.state.hero.trademarks}</div>
      </div>
    );
  }
}

ReactMarkdown.propTypes = {
  value: PropTypes.string,
};

const Text = styled.div`
    font-size: 17px;
    font-family: 'Ubuntu Mono', monospace;
    color: #354654;
    margin-right: 200px;
    margin-left: 200px;
    @media (max-width: 650px) {
        margin-right: 100px;
        margin-left: 100px;
    }
    @media (max-width: 400px) {
        margin-right: 50px;
        margin-left: 50px;
    }
`;

const Title = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    font-family: 'Ubuntu Mono', monospace;
    font-weight: bold;
    font-size: 25px;
    opacity: .9;
    transition: .5s;
    color: #0A100D;
    &:hover {
        transform: scale(1.05);
        opacity: 1;
        color: #354654;
        text-decoration: underline;
    }
`;

const Back = styled.button`
    margin-top: 20px;
    margin-left: auto;
    margin-right:auto;
    height: 40px;
    width: 150px;
    background: #CCCCCC;
    border: 2px solid #0A100D;
    transition: .3s;
    opacity: .6;
    font-size: 18px;
    font-family: 'Ubuntu Mono', monospace;
    &:hover {
        background: #354654;
        transform: scale(1.1);
        border: 1.5px solid #0A100D;
        opacity: 0.8;
        cursor: pointer;
        color: #CCCCCC;
    }
`;

export default BlogPost;