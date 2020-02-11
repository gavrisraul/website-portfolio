import React from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import NavigationBar from './NavigationBar';

import '../ComponentsCSS/Contact.css';


class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            message: '',
            subject: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {name, email, message, subject} = this.state;

        const form = await axios.post('http://127.0.0.1:8000/api/send_email', {
            name, email, message, subject
        }).then((data) => {
            console.log(data, form);
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        axios.get('http://127.0.0.1:8000/api/send_email')
            .then(res => {
            this.setState({
                    hero: res.data[0],
                })
            })
    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Contact me!</h1>
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
                    <Button className="submit">Submit!</Button>
                </Form>
                <h5>Raul Gavriș © 2020</h5>
            </div>
        );
    };
}

export default Contact;
