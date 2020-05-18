import React from 'react';
import LoadingScreen from 'react-loading-screen';
import { connect } from 'react-redux';
import { Input, Button } from 'reactstrap';

import { postPortfolioAdminUpdateRequest, postPortfolioAdminAddRequest } from '../../redux';

import styles from '../../styles/variables.scss';


class PortfolioToEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            name: null,
            image: null,
            description: null,
            new_name: null,
            new_image: null,
            new_description: null,
            new_id: null,
        };
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.addPortfolio = this.addPortfolio.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (parseInt(this.props.portfolioId) !== 0) {
            this.setState({
                name: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].name,
                image: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_image,
                description: this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_description,
            })
        }

        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 500)
    }

    async addPortfolio() {
        this.props.adminReducerPortfolio.push({id: parseInt(this.state.new_id), name: this.state.new_name, portfolio_image: this.state.new_image, portfolio_description: this.state.new_description});
        this.props.dispatch(postPortfolioAdminAddRequest(parseInt(this.state.new_id), 'add', this.state.new_name, this.state.new_image, this.state.new_description));
    }

    async updatePortfolio() {
        this.setState({
            name: this.state.new_name,
            image: this.state.new_image,
            description: this.state.new_description,
        })
        this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].name = this.state.new_name;
        this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_image = this.state.new_image;
        this.props.adminReducerPortfolio[parseInt(this.props.portfolioId) - 1].portfolio_description = this.state.new_description;
        this.props.dispatch(postPortfolioAdminUpdateRequest(parseInt(this.props.portfolioId), 'update', this.state.new_name, this.state.new_image, this.state.new_description));
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
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
                    { parseInt(this.props.portfolioId) !== 0 &&
                    <div>
                        <div>Name: {this.state.name}</div>
                        <div>Image: {this.state.image}</div>
                        <div>Description: {this.state.description}</div>
                        New Name: <Input
                            className="new_name"
                            type="text"
                            name="new_name"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        New Image: <Input
                            className="new_image"
                            type="text"
                            name="new_image"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        New Description: <Input
                            className="new_description"
                            type="text"
                            name="new_description"
                            placeholder=""
                            onChange={this.handleChange} />
                        <br/>
                        <Button onClick={this.updatePortfolio}>Update this portfolio!</Button>
                    </div>
                    }
                    {
                        parseInt(this.props.portfolioId) === 0 &&
                        <div>
                             New Id: <Input
                            className="new_id"
                            type="text"
                            name="new_id"
                            placeholder=""
                            onChange={this.handleChange} />
                            <br/>
                             New Name: <Input
                            className="new_name"
                            type="text"
                            name="new_name"
                            placeholder=""
                            onChange={this.handleChange} />
                            <br/>
                            New Image: <Input
                                className="new_image"
                                type="text"
                                name="new_image"
                                placeholder=""
                                onChange={this.handleChange} />
                            <br/>
                            New Description: <Input
                                className="new_description"
                                type="text"
                                name="new_description"
                                placeholder=""
                                onChange={this.handleChange} />
                            <br/>
                            <Button onClick={this.addPortfolio}>Add this portfolio!</Button>
                        </div>
                    }
                </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        adminReducerPortfolio: state.adminReducer.portfolio,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postPortfolioAdminUpdateRequest: () => dispatch(postPortfolioAdminUpdateRequest()),
        postPortfolioAdminAddRequest: () => dispatch(postPortfolioAdminAddRequest()),
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioToEdit);
