import React, { Component, Fragment } from 'react';
import style from './Post.module.scss'
import { get, post } from '../../services/base'
import { Link } from 'react-router-dom';
import NewPost from '../NewPost/NewPost';
import { me } from '../../services/user';
import LikeButton from './LikeButton'

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loggedId: this.props.loggedId,
            ft: [false, true]
        }

        this.updatePosts = this.updatePosts.bind(this);
    }

    userId;

    componentDidMount(){
        this.gatherPosts();
    }

    gatherPosts() {
        me()
        .then(res => { 
            this.userId = res.id;

            return post('http://localhost:3000/api/relationships/friends', {
                id: res.id
            });
        })
        .then((friends) => {
            let friendIds = friends.map(friend => friend.id);
            friendIds.unshift(this.userId);
            return post(`http://localhost:3000/api/status/friends/${this.userId}`, {
                ids: friendIds
            })
        })
        .then((statuses) => {
            console.log(statuses[0]);
            this.setState({posts: statuses[0]});
        })
        .catch((err) => {
            console.error(err);
        });
    }
    updatePosts(){
        this.gatherPosts();
    }
    render(){
        let posts = this.state.posts.map((posts) => {
            return(
                    <div className={`media ${style.postDiv}`}key={posts.id}>
                        <div className="media-left">
                            <img src={posts.avatar} className={`media-object ${style.avatar}`}/>
                        </div>
                        <div className="media-body">
                            <Link to={`/profile/${posts.userid}`} className="media-heading">@{posts.handle}</Link>
                            <p>{posts.status}</p>
                            <LikeButton liked={this.state.ft[posts.liked]} statusid={posts.id} userid={this.userId}/>
                        </div>
                    </div>
            )
        }).reverse()
        return(
            <Fragment>
            <NewPost id={this.props.loggedId} updatePosts={this.updatePosts}/>
            <div className={style.allpost}>
                { posts }
            </div>
            </Fragment>
        )
    }
}

export default Post;