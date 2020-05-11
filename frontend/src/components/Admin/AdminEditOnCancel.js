import React from 'react';

import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons"

import CodeBlock from '../CodeBlock';
import { getHeroRequest, getPostRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './AdminEditOnCancel.scss';


class AdminEditOnCancel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            value: "Some text here",
            isInEditMode: false,
        }
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());
        this.props.dispatch(getPostRequest(this.props.postId));

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded,
                value: this.props.post.text,
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
        return this.state.isInEditMode ?
            <div className='input-post-holder-admin-page'>
                <textarea
                    className="input-post-admin-page"
                    type="text"
                    defaultValue={this.state.value}
                    ref="theTextInput"
                />
                <br/>
                <FontAwesomeIcon className="post-change-icon like" onClick={this.updateComponentValue} size="3x" icon={faThumbsUp} />
                <FontAwesomeIcon className="post-change-icon dislike" onClick={this.changeEditMode} size="3x" icon={faThumbsDown} />
            </div>
            :
            <div onDoubleClick={this.changeEditMode}>
                <ReactMarkdown
                className="blog-post"
                source={this.state.value}
                renderers={{
                    code: CodeBlock,
                }}
                escapeHtml={false}
                unwrapDisallowed={true}
            />
            </div>
    };
}

ReactMarkdown.propTypes = {
    value: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        post: state.postReducer.post,
        loaded: state.postReducer.post.loaded,
    };
};

const mapDispatchToProps = (dispatch, id) => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        getPostRequest: () => dispatch(getPostRequest(id)),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditOnCancel);
