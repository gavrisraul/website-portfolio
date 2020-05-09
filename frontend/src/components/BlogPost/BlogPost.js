import React from 'react';
import LoadingScreen from 'react-loading-screen';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import $ from "jquery";
import Disqus from 'disqus-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import CodeBlock from '../CodeBlock';

import { connect } from 'react-redux';
import { getHeroRequest, getPostRequest, postPostRequest } from '../../redux';


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
            loaded: false,
        };
    }

    handleSubmit() {
        let likes = parseInt(this.props.post.likes);
        likes = likes + 1;
        likes = String(likes);
        const { match: { params } } = this.props;
        this.props.dispatch(postPostRequest(params.id, likes))
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

        this.props.dispatch(getHeroRequest());
        this.props.dispatch(getPostRequest(params.id));

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded,
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
    if ( this.state.loaded === true ) {
        this.disqusShortname = 'raulgavris-com';
        this.disqusConfig = {
            url: "https://raulgavris.com",
            identifier: String(this.props.post.id),
            title: this.props.post.title,
        };
    }

    let likes = this.props.post.likes;
    if ( this.props.postLike.alreadyLiked === 'Thanks!') {
        likes = this.props.postLike.likes;
    }

    return (
        <div>
            <div className="summary"> { this.getSummary() } </div>
            <div className="title">{this.props.post.title}</div>
            <div className="likes">
                likes: { likes } { this.props.postLike.alreadyLiked }
                <br/><br/>
                <FontAwesomeIcon onClick={()=>{
                    this.handleSubmit();
                    document.getElementById("like-icon").style.pointerEvents = "none";
                }} className="like-icon" id="like-icon" size="2x" icon={faThumbsUp} />
            </div>
            
            <Link to='/blog'><button className="back-button">Go to posts</button></Link>
            <ReactMarkdown
                className="blog-post"
                source={this.props.post.text}
                // source={this.state.markdown} //for development purposes
                renderers={{
                    code: CodeBlock,
                }}
                escapeHtml={false}
                unwrapDisallowed={true}
            />
            <Link to='/blog'><button className="back-button">Go to posts</button></Link>

            <Disqus.DiscussionEmbed shortname={this.disqusShortname} config={this.disqusConfig} />

            <div className="trademarks">{this.props.hero.trademarks}</div>
        </div>
    );
  }
}

ReactMarkdown.propTypes = {
  value: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        post: state.postReducer.post,
        postLike: state.postReducer.postLike,
        loaded: state.postReducer.post.loaded,
    };
};

const mapDispatchToProps = ( dispatch, id ) => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        getPostRequest: () => dispatch(getPostRequest(id)),
        postPostRequest: () => dispatch(postPostRequest(id)),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);