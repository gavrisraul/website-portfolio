import React from 'react';
import styled from 'styled-components';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


export default class CustomNotification extends React.Component {
    constructor() {
        super();
        this.state = {
            currentContent: SuccessNotification,
        };
    }
    handleOnClick = () => {
        store.addNotification({
            // type: 'success',
            // title: 'title',
            // message: 'neeew',
            content: this.state.currentContent,
            container: 'top-right',
            insert: 'top',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
                duration: 2000,
                pauseOnHover: true,
            },
            width: 200,
            swipe: {
              duration: 400,
              timingFunction: 'ease-out',
              delay: 0,
            },
            fade: {
              duration: 400,
              timingFunction: 'ease-out',
              delay: 0
            },
        });
    };

    render() {
        return(
            <ReactNotification/>
        );
    };
}


export class SuccessNotification extends React.Component {
    render() {
        return (
            <SNotif>Success! Message was sent!</SNotif>
        );
    };
}
export class FailedNotification extends React.Component {
    render() {
        return (
            <FNotif>Error!<br/> Message wasn't sent!<br/>Check e-mail or wait 8 hours if you have sent 2 messages by now.</FNotif>
        );
    };
}

const SNotif = styled.div`
    font-size: 15px;
    text-align: center;
    color: #0A100D;
    opacity: 1;
    background-color: #F7F2EF;
    width: 100%;
    font-family: monospace;
    font-weight: bold;
    border: 1px solid #0A100D;
    font-weight: bold;
    border: 3px solid #0A100D;
    transition: .5s;
    &:hover {
        color: #000;
    }
`;

const FNotif = styled.div`
    font-size: 15px;
    text-align: center;
    color: #F7F2EF;
    opacity: 0.7;
    background-color: #800000;
    width: 100%;
    font-family: monospace;
    font-weight: bold;
    border: 3px solid #0A100D;
    transition: .5s;
    &:hover {
        opacity: 1;
    }
`;
