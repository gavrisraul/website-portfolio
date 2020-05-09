import React from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import LoadingScreen from 'react-loading-screen';

import { connect } from 'react-redux';

import { getHeroRequest, getSendEmailRequest, postSendEmailRequest, getClientIpRequest } from '../../redux';

import NavigationBar from '../NavigationBar';
import CustomNotification from '../CustomNotification';
import {SuccessNotification, FailedNotification} from '../CustomNotification/CustomNotification';

import styles from '../../styles/variables.scss';

import './Contact.scss';


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            subject: '',
            count: 0,
            can_send: true,
            loaded: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.customNotification = React.createRef();
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
        let client_ip_bk, count_bk, date_send_bk;
        if (this.props.email_config.email_config.length > 0) {
            client_ip_bk = this.props.email_config.email_config[0].fields.client_ip;
            count_bk = this.props.email_config.email_config[0].fields.count;
            date_send_bk = this.props.email_config.email_config[0].fields.date_send;
        }

        this.setState({count: this.state.count + 1});

        let client_ip = this.props.client.clientIp;
        let {name, email, message, subject, count} = this.state;

        let reset_count = false;
        if (this.props.email_config.email_config[0].length > 0) {
            if ((count_bk + count >= 2) && (client_ip_bk === client_ip)) {
                this.state.can_send = false;
            }
        }
        if (count > 2) {
            this.state.can_send = false;
        }

        if (!email.includes('@')) {
            this.state.can_send = false;
        }

        let dt = new Date(date_send_bk);
        let dt_hours = dt.getHours();
        let dt_now = new Date();
        dt_now = dt_now.getHours();
        if ((dt_now >= dt_hours + 8) && (count <= 2)) {
            this.state.can_send = true;
            reset_count = true;
        }

        if (reset_count === true) {
            this.state.count = 0;
            count = 0;
        }

        if (this.state.can_send === true) {
            this.props.dispatch(postSendEmailRequest(name, email, message, subject, client_ip, count))
        }
        // e.preventDefault();
    }

    componentDidMount() {
        this.props.dispatch(getHeroRequest());
        this.props.dispatch(getSendEmailRequest());
        this.props.dispatch(getClientIpRequest());

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded
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
                <CustomNotification ref={this.customNotification}/>
                <NavigationBar />
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="contact-title">Contact me!</h1>
                    <FormGroup className="formgroup">
                        <Label for="name" className="label">Your Name</Label>
                        <Input
                            className="input"
                            type="text"
                            name="name"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="formgroup">
                        <Label for="subject" className="label">Subject</Label>
                        <Input
                            className="input"
                            type="text"
                            name="subject"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="formgroup">
                        <Label for="email" className="label">Email</Label>
                        <Input
                            className="input"
                            type="email"
                            name="email"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup className="formgroup">
                        <Label for="message" className="label">Message</Label>
                        <Input
                            className="input textarea"
                            type="textarea"
                            name="message"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="submit" onClick={()=>{
                        this.handleSubmit();
                        if (this.state.can_send === false) {
                            this.customNotification.current.state.currentContent = FailedNotification;
                        } else {
                            this.customNotification.current.state.currentContent = SuccessNotification;
                        }
                        this.customNotification.current.handleOnClick();
                    }}>Submit!</Button>
                </Form>
            <h5 className="trademarks">{this.props.hero.trademarks}</h5>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        loaded: state.heroReducer.hero.loaded,
        email_config: state.sendEmailReducer.sendEmail,
        client: state.sendEmailReducer.client,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        getSendEmailRequest: () => dispatch(getSendEmailRequest()),
        postSendEmailRequest: () => dispatch(postSendEmailRequest()),
        getClientIpRequest: () => dispatch(getClientIpRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
