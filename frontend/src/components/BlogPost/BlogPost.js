import React from 'react';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import $ from "jquery";
import Disqus from 'disqus-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import CodeBlock from '../CodeBlock';


// import Post2 from '../../componentsMD/Post2.md'; // for development purposese

import styles from '../../styles/variables.scss';

import './BlogPost.scss';


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
                href={ "#" + element.id }>{element.id.replace(/_/g, ' ')}<br/>
            </a>
        );
        return summary;
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        // fetch(Post2).then(res => res.text()).then(text => this.setState({ markdown: text })); // dev purposes

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
                bgColor={styles.color1}
                spinnerColor={styles.color2}
                textColor={styles.color4}
                logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                text='Loading...'
                children=''
            />
            <div className="summary"> { this.getSummary() } </div>
            <div className="title">{this.state.post.title}</div>
            <div className="likes">likes: {this.state.post.likes} {this.state.alreadyLiked} <FontAwesomeIcon onClick={()=>{
                this.handleSubmit();
            }} className="like-icon" size="2x" icon={faThumbsUp} /></div>
            
            <Link to='/blog'><button className="back-button">Go to posts</button></Link>
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
            <Link to='/blog'><button className="back-button">Go to posts</button></Link>

            <Disqus.DiscussionEmbed shortname={this.disqusShortname} config={this.disqusConfig} />

            <div className="trademarks">{this.state.hero.trademarks}</div>
        </div>
    );
  }
}

ReactMarkdown.propTypes = {
  value: PropTypes.string,
};

export default BlogPost;