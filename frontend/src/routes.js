import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Destroy from './components/Destroy';
import BlogPost from './components/BlogPost';
import MindMapCustom from './components/MindMapCustom';
import AdminLogin from './components/AdminLogin';
import Admin from './components/Admin';


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
            <Route exact path='/mindmap' component={MindMapCustom} />
            <Route exact path='/admin-login' component={AdminLogin} />
            <Route exact path='/admin' component={Admin} />
            <Route path='/' render={() => <div>404 not found</div>} />
        </Switch>
    </div>
);

export default BaseRouter;