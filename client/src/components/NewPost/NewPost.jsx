import React, { Component, Fragment } from 'react';
import * as userService from '../../services/user';
import { Redirect } from 'react-router-dom';
import IndeterminateProgress from '../utilities/indeterminateProgress';
import style from './NewPost.module.scss';
import { post } from '../../services/base'

import UnloggedBanner from '../UnloggedBanner/UnloggedBanner';
import Home from '../Home/Home';

class NewUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            userid: '',
            status: '',
            feedbackMessage: '',
        };
    }

    onButtonClick() {
        post('http://localhost:3000/api/status', {
            userid: this.props.id,
            status: this.state.status
        })
        .then((results) => {
            console.log('worked maybe')
        })
        this.props.updatePosts()
        // this.props.history.push("/");
    }

    handleTextChange(value) {
        this.setState({ status: value });
    }

    render() {
       return (
            <Fragment>
                <div className={`media ${style.form}`}>
                        <div className="media-left">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Circle-icons-profle.svg/1024px-Circle-icons-profle.svg.png" className="media-object" style={{width: '50px'}} />
                        </div>
                        <div className="media-body">
                        <div className="form-group">
                            <textarea id="text" className={style.input} type="text" placeholder="What's up?" onChange={(e) => this.handleTextChange(e.target.value)} required /> 
                            </div>
                            <button onClick= { (event) => {this.onButtonClick()}} value="Login" className="btn btn-primary" >Submit</button>
                        </div>
                        </div>
            </Fragment>
       );
    }
}

export default NewUserForm;