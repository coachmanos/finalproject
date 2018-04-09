import React, { Component, Fragment } from 'react';
import { post } from '../../services/base';

class AddSocial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            twitter: null,
            instagram: null, 
            twitch: null,
            youtube: null
        }
    }

    handleTwitterInsert(twitter) {
        this.setState({ twitter });
    }

    handleInstagramInsert(instagram) {
        this.setState({ instagram });
    }

    handleTwitchInsert(twitch) {
        this.setState({ twitch });
    }

    handleYoutubeInsert(youtube) {
        this.setState({ youtube });
    }

    addSocialMedia(e) {

        e.preventDefault();

        post(
            `http://localhost:3000/api/add/social/${this.props.match.params.id}`,
            {
                twitter: this.state.twitter,
                instagram: this.state.instagram,
                twitch: this.state.twitch,
                youtube: this.state.youtube
            }
        )
        .then(() => {
            this.props.history.push(`/profile/${this.props.match.params.id}`)
        })
    }


    render() {
        return (
            <Fragment>
                <input
                    placeholder="twitter" 
                    value={this.state.twitter} 
                    onChange={ (event) => {this.handleTwitterInsert(event.target.value)}}
                />
                <input
                    placeholder="instagram" 
                    value={this.state.instagram} 
                    onChange={ (event) => {this.handleInstagramInsert(event.target.value)}}
                />
                <input
                    placeholder="twitch" 
                    value={this.state.twitch} 
                    onChange={ (event) => {this.handleTwitchInsert(event.target.value)}}
                />
                <input
                    placeholder="youtube" 
                    value={this.state.youtube} 
                    onChange={ (event) => {this.handleYoutubeInsert(event.target.value)}}
                />
                <button onClick={ (e) => {this.addSocialMedia(e)} }>add</button>
            </Fragment>
        );
    }
}

export default AddSocial;