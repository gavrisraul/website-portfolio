import React from 'react';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';


class BlogArticle extends React.Component {
    constructor() {
        super();
        this.state = {
            hero: {},
            article: {},
            loaded: false,
        };
        this.exampleCode = `#include <iostream>
using namespace std;
int main() {
    cout << "First Blog Post!";
}`;
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/api/hero/')
            .then(res => {
                this.setState({
                    hero: res.data[0],
                })
            })
            .then(setTimeout(() => {
                this.setState({loaded: true})
            }, 500))
        axios.get(`http://127.0.0.1:8000/api/article/${params.id}/`)
            .then(res => {
                this.setState({
                    article: res.data,
                })
            })
    }

    firstArticle

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
                <Title>{this.state.article.title}</Title>
                <Text>{renderHTML(String(this.state.article.text))}</Text>
                <Center>
                    <SyntaxHighlighter language="cpp" style={darcula} showLineNumbers={true}>
                        {this.exampleCode}
                    </SyntaxHighlighter>
                </Center>
                <Link to='/blog'><Back>Go to articles</Back></Link>
                <div className="trademarks">{this.state.hero.trademarks}</div>
            </div>
        );
    };
}

const Center = styled.div`
    width: 400px;
    // height: 400px;
    margin-left: auto;
    margin-right: auto;

`;

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
    margin-top: 100px;
    margin-bottom: 100px;
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

export default BlogArticle;
