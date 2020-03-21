import React from 'react';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './CustomNotification.scss';


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
            <div className="success">Success! Message was sent!</div>
        );
    };
}
export class FailedNotification extends React.Component {
    render() {
        return (
            <div className="failed">Error!<br/> Message wasn't sent!<br/>Check e-mail or wait 8 hours if you have sent 2 messages by now.</div>
        );
    };
}