import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import LoadingScreen from 'react-loading-screen';

import NavigationBar from './NavigationBar';
import CustomNotification, {SuccessNotification, FailedNotification}  from './CustomNotification';

import '../ComponentsCSS/Contact.css';


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            subject: '',
            client_ip:'',
            count: 0,
            email_config: [],
            hero: {},
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
        if (this.state.email_config.length > 0) {
            client_ip_bk = this.state.email_config[0].fields.client_ip;
            count_bk = this.state.email_config[0].fields.count;
            date_send_bk = this.state.email_config[0].fields.date_send;
        }

        this.setState({count: this.state.count + 1});

        let {name, email, message, subject, client_ip, count} = this.state;

        let reset_count = false;
        if (this.state.email_config.length > 0) {
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
            await axios.post('http://127.0.0.1:8000/api/send_email/', {
                name, email, message, subject, client_ip, count
            }).then((data) => {
                // console.log(data, form);
            }).catch((err) => {
                // console.log(err);
            })
        }
        // e.preventDefault();
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/api/send_email/')
            .then(res => {
                this.setState({
                    email_config: JSON.parse(res.data),
                })
            })
        axios.get('http://127.0.0.1:8000/api/hero/')
            .then(res => {
                this.setState({
                    hero: res.data[0],
                })
            })
        axios.get('https://jsonip.com')
            .then(res => {
                this.setState({
                    client_ip: res.data.ip,
                });
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
                    logoSrc='https://raw.githubusercontent.com/gavrisraul/website-portfolio/master/frontend/assets/loading.png'
                    text='Loading...'
                    children=''
                />
                <CustomNotification ref={this.customNotification}/>
                <NavigationBar />
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="contact-title ">Contact me!</h1>
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
            <h5 className="trademarks">{this.state.hero.trademarks}</h5>
            </div>
        );
    };
}

export default Contact;
