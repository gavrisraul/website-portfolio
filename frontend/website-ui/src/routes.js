import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home';
import About from './Components/About';
import Blog from './Components/Blog';
import Portfolio from './Components/Portfolio';
import Contact from './Components/Contact';
import Destroy from './Components/Destroy';
import BlogPost from './Components/BlogPost';


const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/blog' component={Blog} />
            <Route exact path='/portfolio' component={Portfolio} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/destroy' component={Destroy} />
            <Route exact path='/post/:id' component={BlogPost} />
            <Route path='/' render={() => <div>404 not found</div>} />
        </Switch>
    </div>
);

export default BaseRouter;