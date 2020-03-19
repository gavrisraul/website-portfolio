import React from 'react';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import $ from "jquery";
import Disqus from 'disqus-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import CodeBlock from './CodeBlock';


// import Post2 from '../ComponentsMD/Post2.md'; // for development purposese

import '../ComponentsCSS/BlogPost.css';


$.fn.isInViewport = function() {
    var elementTop = $(this).position().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).innerHeight();

    return (elementBottom > viewportTop) && (elementTop < viewportBottom);
};

$(window).scroll(function () {
    $('.goHere').each(function(i, el){
       if ($(this).isInViewport()) {
            $('.'+$(this).attr('id')).attr({'class': 'active_anchor ' + $(this).attr('id')});
       } else {
            $('.'+$(this).attr('id')).attr({'class': 'inactive_anchor ' + $(this).attr('id')});
       }
    })
 });

class BlogPost extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            markdown: '',
            hero: {},
            post: {},
            loaded: false,
            alreadyLiked: '',
        };
        this.disqusShortname = 'raulgavris-com';
        this.disqusConfig = {
            url: "http://localhost:3000",
            identifier: this.state.post.id,
            title: this.state.post.title,
        };
    }

    async handleSubmit() {
        let likes = parseInt(this.state.post.likes);
        likes = likes + 1;
        likes = String(likes)
        const { match: { params } } = this.props;
        await axios.post(`http://127.0.0.1:8000/api/post/${params.id}/`, {
            likes
        }).then((data) => {
            if ( data.request.status === 200 ) {
                this.setState(prevState => ({
                    post: {
                        ...prevState.post,
                        likes: likes,
                    },
                    alreadyLiked: 'Thanks!',

                }));
            } else if ( data.request.status === 210 ) {
                this.setState({
                    alreadyLiked: 'You already liked!',
                });
            }
        }).catch((err) => {
            // console.log(err);
        })
    }

    getSummary() {
        let div_with_ids = Array.from(document.querySelectorAll('div[id][class*="goHere"]'));
        let summary = [];
        for ( let i = 0; i < div_with_ids.length; ++i) {
            let element = div_with_ids[i];
            summary.push(element);
        }
        summary = summary.map(element =>
            <a 
                className={ window.location.href.includes(element.id)? "active_anchor " + element.id : "inactive_anchor " + element.id }
                href={ "#" + element.id }>{element.id.replace(/\_/g, ' ')}<br/>
            </a>
        );
        return summary;
    }

    // componentWillMount() {
    //     fetch(Post2).then(res => res.text()).then(text => this.setState({ markdown: text }));
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
            <div className="summary"> { this.getSummary() } </div>
            <Title>{this.state.post.title}</Title>
            <div className="likes">likes: {this.state.post.likes} {this.state.alreadyLiked} <FontAwesomeIcon onClick={()=>{
                this.handleSubmit();
            }} className="like-icon" size="2x" icon={faThumbsUp} /></div>
            
            <Link to='/blog'><Back>Go to posts</Back></Link>
            <ReactMarkdown
                className="blog-post"
                source={this.state.post.text}
                // source={this.state.markdown} //for development purposes
                renderers={{
                    code: CodeBlock,
                }}
                escapeHtml={false}
                unwrapDisallowed={true}
            />
            <Link to='/blog'><Back>Go to posts</Back></Link>

            <Disqus.DiscussionEmbed shortname={this.disqusShortname} config={this.disqusConfig} />

            <div className="trademarks">{this.state.hero.trademarks}</div>
        </div>
    );
  }
}

ReactMarkdown.propTypes = {
  value: PropTypes.string,
};

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