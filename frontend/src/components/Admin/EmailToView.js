import React from 'react';
// import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';

// import { getHeroRequest } from '../../redux';

import styles from '../../styles/variables.scss';


class EmailToView extends React.Component {
    state = {
        loaded: false,
        email: '',
        name: '',
        subject: '',
        message: '',
        client_ip: '',
        count: 0,
        date_send: '',
    }

    componentDidMount() {
        // this.props.dispatch(getHeroRequest());

        this.setState({
            email: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].email,
            name: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].name,
            subject: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].subject,
            message: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].message,
            client_ip: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].client_ip,
            count: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].count,
            date_send: this.props.adminReducerEmail[parseInt(this.props.emailId) - 1].date_send,
        })

        setTimeout(() => {
            this.setState({
                loaded: true
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

        return (
            <div>
                <div>Email: {this.state.email}</div>
                <div>Name: {this.state.name}</div>
                <div>Subject: {this.state.subject}</div>
                <div>Message: {this.state.message}</div>
                <div>Client Ip: {this.state.client_ip}</div>
                <div>Count: {this.state.count}</div>
                <div>Date Send: {this.state.date_send}</div>

                {/* <h5 className="trademarks">{this.props.hero.trademarks}</h5> */}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        // hero: state.heroReducer.hero,
        // loaded: state.heroReducer.hero.loaded,
        adminReducerEmail: state.adminReducer.email,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getHeroDispatch: () => dispatch(getHeroRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailToView);
