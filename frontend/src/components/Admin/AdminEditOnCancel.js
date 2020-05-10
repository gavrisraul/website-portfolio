import React from 'react';

// import './AdminEditOnCancel.scss';


class AdminEditOnCancel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Some text here",
            isInEditMode: false,
        }
    }

    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }

    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            value: this.refs.theTextInput.value
        })
    }

    render() {
        return this.state.isInEditMode ?
            <div>
                <input
                    type="text"
                    defaultValue={this.state.value}
                    ref="theTextInput"
                />
                <button onClick={this.changeEditMode}>X</button>
                <button onClick={this.updateComponentValue}>OK</button>
            </div>
            :
            <div onDoubleClick={this.changeEditMode}>
                {this.state.value}
            </div>
    };
}

export default AdminEditOnCancel;
