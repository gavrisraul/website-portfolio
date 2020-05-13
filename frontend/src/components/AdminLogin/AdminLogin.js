import React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { faUser } from "@fortawesome/free-solid-svg-icons"

import { getHeroRequest } from '../../redux';

import styles from '../../styles/variables.scss';

import './AdminLogin.scss';

import portfolioApi from '../../services/portfolioApi';


class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            username: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    

    componentDidMount() {
        this.props.dispatch(getHeroRequest());

        setTimeout(() => {
            this.setState({
                loaded: this.props.loaded
            })
        }, 500)
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e) {
        portfolioApi.postToken({
            username: this.state.username,
            password: this.state.password,
        })
        .then(response => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            const data = response.data;
            window.location.href = '/admin/'
            return data;
        })
        .catch(error => {
            throw error;
        })

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
            <div className="login-wrapper">
                <div className="login">
             
                    <Link to="/"><div className="login-home">To Home Page! I'm a coward!</div></Link>

                    <Form onSubmit={this.handleSubmit}>
                        <h1 className="contact-title-login">THE PATH TO THE ADMIN PAGE!</h1>
                        <h2 className="forbidden">YOU SHALL NOT PASS!</h2>
                        <h1>LOGIN</h1>
                        <FormGroup className="formgroup-login">
                            <Label for="username" className="label-login">What!? Do I really need a username?</Label>
                            <FontAwesomeIcon className="icon-login" size="1x" icon={faUser} />
                            <Input
                                className="input-login"
                                type="password"
                                name="username"
                                placeholder="username"
                                maxLength={20}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="formgroup-login">
                            <Label for="password" className="label-login">Another password to keep in mind...</Label>
                            <FontAwesomeIcon className="icon-login" size="1x" icon={faLock} />
                            <Input
                                className="input-login"
                                type="password"
                                name="password"
                                placeholder="password"
                                maxLength={20}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <Button className="submit-login" onClick={()=>{
                            this.handleSubmit()
                        }}>Login!</Button>
                    </Form>
                    
                    <h5 className="trademarks-login">{this.props.hero.trademarks}</h5>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        hero: state.heroReducer.hero,
        loaded: state.heroReducer.hero.loaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHeroDispatch: () => dispatch(getHeroRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);

