import React from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from './NavigationBar';


class About extends React.Component {
    state = {

    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <img height="400px" alt="hero" src="https://raw.githubusercontent.com/gavrisraul/dotfiles/master/.wallpapers/raul.png" />
                <h2>Hello, my name is Raul Gavriș. I'm a software developer.</h2>
                <h2>I have studied computer science for the last 5 years, and I can say that it is my passion.</h2>
                <h2>I am currently working at <a href="https://devnest.ro">Devnest</a> as a perl developer.</h2>
                <h2>Previously worked at <a href="https://spyhce.com/">Spyhce</a> as a python developer.</h2>
                <Link to="/contact"><h2>Contact me if you want something done in code!</h2></Link>
                <h5>Raul Gavriș © 2020</h5>
            </div>
        );
    };
}

export default About;
