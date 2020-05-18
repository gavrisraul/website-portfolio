import React from 'react';

import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons"
import { Input, Button } from 'reactstrap';

import CodeBlock from '../CodeBlock';
import { getPostRequest, postPostsAdminAddRequest, postPostsAdminUpdateRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './AdminEditOnCancel.scss';


class AdminEditOnCancel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            text: 'Some text here',
            isInEditMode: false,
            new_id: null,
            new_title: null,
            new_text: 'Some text here',
            new_image: null,
            new_date: null,
            new_likes: null,
            was_updated: null,
        }
        this.updatePost = this.updatePost.bind(this);
        this.addPost = this.addPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            text: this.refs.theTextInput.value,
            new_text: this.refs.theTextInput.value
        })
    }

    componentDidMount() {
        if (parseInt(this.props.postId) !== 0) {
            this.props.dispatch(getPostRequest(this.props.postId));
        }

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded,
                text: this.props.post.text,
            })
        }, 500)
    }


    async addPost() {
        this.props.adminReducerPosts.push({
            id: parseInt(this.state.new_id),
            title: this.state.new_title,
            image: this.state.new_image,
            date: this.state.new_date,
            likes: this.state.new_likes,
            text: this.state.new_text,
        });
        this.props.dispatch(postPostsAdminAddRequest(
            parseInt(this.state.new_id),
            'add',
            this.state.new_title,
            JSON.stringify(this.state.new_text),
            this.state.new_image,
            this.state.new_date,
            this.state.new_likes,
        ));
    }

    async updatePost() {
        this.setState({
            was_updated: 1,
        })
        if ( this.state.new_title !== null && this.state.new_title !== '' ) {
            this.props.post.title = this.state.new_title;
            this.props.adminReducerPosts[parseInt(this.props.postId) - 1].title = this.state.new_title;
        }
        if ( this.state.new_image !== null && this.state.new_image !== '' ) {
            this.props.post.image = this.state.new_image;
            this.props.adminReducerPosts[parseInt(this.props.postId) - 1].image = this.state.new_image;
        }
        if ( this.state.new_date !== null && this.state.new_date !== '' ) {
            this.props.post.date = this.state.new_date;
            this.props.adminReducerPosts[parseInt(this.props.postId) - 1].date = this.state.new_date;
        }
        if ( this.state.new_likes !== null && this.state.new_likes !== '' ) {
            this.props.post.likes = this.state.new_likes;
            this.props.adminReducerPosts[parseInt(this.props.postId) - 1].likes = this.state.new_likes;
        }
        this.props.dispatch(postPostsAdminUpdateRequest (parseInt(this.props.postId), 'update', this.state.new_title, this.state.text, this.state.new_image, this.state.new_date, this.state.new_likes));
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
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
            {   this.state.isInEditMode &&
                <div className='input-post-holder-admin-page'>
                    <textarea
                        className="input-post-admin-page"
                        type="text"
                        defaultValue={this.state.text}
                        ref="theTextInput"
                    />
                    <br/>
                    <FontAwesomeIcon className="post-change-icon like" onClick={this.updateComponentValue} size="3x" icon={faThumbsUp} />
                    <FontAwesomeIcon className="post-change-icon dislike" onClick={this.changeEditMode} size="3x" icon={faThumbsDown} />
                </div>
            }
            { this.props.postId !== 0 &&
                    <div>
                        <div onClick={this.changeEditMode}>
                            <ReactMarkdown
                                className="blog-post"
                                source={this.state.text}
                                renderers={{
                                    code: CodeBlock,
                                }}
                                escapeHtml={false}
                                unwrapDisallowed={true}
                            />
                        Title: {this.props.post.title}
                        <br/>
                        Image: {this.props.post.image}
                        <br/>
                        Date: {this.props.post.date}
                        <br/>
                        Likes: {this.props.post.likes}
                        <br/>
                        </div>
                        New Title: <Input
                        className="new_title"
                        type="text"
                        name="new_title"
                        placeholder=""
                        onChange={this.handleChange} />
                        <br/>
                        New Image: <Input
                            className="new_image"
                            type="text"
                            name="new_image"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        New Date: <Input
                            className="new_date"
                            type="text"
                            name="new_date"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        New Likes: <Input
                            className="new_likes"
                            type="text"
                            name="new_likes"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        <Button onClick={this.updatePost}>Update Post!</Button>
                    </div>
            }
            {   this.props.postId === 0 && this.state.isInEditMode &&
                <div className='input-post-holder-admin-page'>
                    <textarea
                        className="input-post-admin-page"
                        type="new_text"
                        defaultValue={this.state.new_text}
                        ref="theTextInput"
                    />
                    <br/>
                    <FontAwesomeIcon className="post-change-icon like" onClick={this.updateComponentValue} size="3x" icon={faThumbsUp} />
                    <FontAwesomeIcon className="post-change-icon dislike" onClick={this.changeEditMode} size="3x" icon={faThumbsDown} />
                    New Id: <Input
                    className="new_id"
                    type="text"
                    name="new_id"
                    placeholder=""
                    onChange={this.handleChange} />
                    <br/>
                    New Title: <Input
                    className="new_title"
                    type="text"
                    name="new_title"
                    placeholder=""
                    onChange={this.handleChange} />
                    <br/>
                    New Image: <Input
                        className="new_image"
                        type="text"
                        name="new_image"
                        placeholder=""
                        onChange={this.handleChange} />
                    <br/>
                    New Date: <Input
                        className="new_date"
                        type="text"
                        name="new_date"
                        placeholder=""
                        onChange={this.handleChange} />
                    <br/>
                    New Likes: <Input
                        className="new_likes"
                        type="text"
                        name="new_likes"
                        placeholder=""
                        onChange={this.handleChange} />
                    <br/>
                </div>
            }
            {   this.props.postId === 0 && !this.state.isInEditMode &&
                <div>
                    <div onClick={this.changeEditMode}>
                        <h1>Add new post</h1>
                        New Id: {this.state.new_id} <br/>
                        New Title: {this.state.new_title} <br/>
                        New Image: {this.state.new_image} <br/>
                        New Date: {this.state.new_date} <br/>
                        New Likes: {this.state.new_likes} <br/>
                        <ReactMarkdown
                            className="blog-post"
                            source={this.state.new_text}
                            renderers={{
                                code: CodeBlock,
                            }}
                            escapeHtml={false}
                            unwrapDisallowed={true}
                        />
                    </div>
                    <Button onClick={this.addPost}>Add Post</Button>
                </div>
            }
            </div>
        );
    };
}

ReactMarkdown.propTypes = {
    text: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        post: state.postReducer.post,
        loaded: state.postReducer.post.loaded,
        adminReducerPosts: state.adminReducer.posts,
    };
};

const mapDispatchToProps = (dispatch, id) => {
    return {
        getPostRequest: () => dispatch(getPostRequest(id)),
        postPostsAdminAddRequest: () => dispatch(postPostsAdminAddRequest()),
        postPostsAdminUpdateRequest: () => dispatch(postPostsAdminUpdateRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditOnCancel);
