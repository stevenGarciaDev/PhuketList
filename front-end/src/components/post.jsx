import React, { Component } from 'react';
import Moment from 'react-moment';
import Like from './Like';
import CommentIcon from './CommentIcon';
import ReportIcon from './ReportIcon';
import { 
  Link 
} from 'react-router-dom';
import { updateLikeInfo, report, getIsAppropriate } from '../services/postService';
import { getCurrentUser } from '../services/authService';
import {
  getUserPhotoByID
} from "../services/userService";
// import photo from '../assets/images/jackie-tsang-458443-unsplash.jpg';

class Post extends Component {

  constructor(props) {
    super(props);
    const { id, author, image, dateCreated, text, likes, comments } = this.props;

    const user = getCurrentUser();
    let didPrevLike = likes.indexOf(user._id) !== -1 ? true : false;

    this.state = {
      id: id,
      author: author,
      authorProfileAvatar: "",
      image: image,
      dateCreated: dateCreated,
      text: text,
      likes: likes,
      didLike: didPrevLike,
      comments: comments,
      displayComments: false,
      isAppropriate: false
    };
  }


  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const isAppro = await getIsAppropriate(this.state.id, jwt);
    this.setState({isAppropriate: isAppro });

    // Grab user's avatar profile picture by ID, since this should be public.
    const userPhoto = await getUserPhotoByID(this.props.author._id);
    this.setState({authorProfileAvatar: userPhoto.data[0].photo})
  }

  handleLike = async () => {

    const user = getCurrentUser();
    const { didLike, id } = this.state;
    let likes = [...this.state.likes];
    const currentLikeStatus = !didLike; // toggle

    if (currentLikeStatus) {
      likes.push(user._id);
    } else {
      likes.splice( likes.indexOf(user._id), 1 );
    }

    this.setState({ didLike: currentLikeStatus, likes });

    try {
      const jwt = localStorage.getItem("token");
      await updateLikeInfo(likes, id, jwt);
    } catch (ex) {
      console.log('did not update');

    }
  }

  handleNewComment = async (comment) => {
    comment.then(result => {
      const comments = [...this.state.comments];
      comments.unshift(result.data);
      this.setState({ comments });
    }).catch(err => {
      console.log("Error with comments", err);
    });
  }

  handleCommentsDropdown = () => {
    this.setState({
      displayComments: !this.state.displayComments
    });
  }


  handleReportButton = async() => {


    this.setState({
      isAppropriate: false
    });


}


  render() {
    const { user } = this.props;
    const {
      id,
      author,
      image,
      dateCreated,
      text,
      didLike,
      likes,
      comments,
      displayComments
    } = this.state;

    return ( (this.state.isAppropriate) ?
      <div className="post-module">
          <div className="post-module-top row">
            <div className="col-md-4 text-left nopadding">
              {this.state.authorProfileAvatar ?
                (<img
                    className="post-module-profile-img"
                    src={this.state.authorProfileAvatar}
                    alt="Img" />)
                :
                (<img
                    className="post-module-profile-img"
                    src="https://pbs.twimg.com/profile_images/901947348699545601/hqRMHITj_400x400.jpg"
                    alt="Img" />)
              }
              <small className="post-module-author-name"><strong><Link to={`/profile/${author._id}`} >{author.name}</Link></strong></small>
            </div>
            <div className="col-md-8 text-right nopadding">
              <small>
                  <Moment fromNow>
                    {dateCreated}
                 </Moment>
              </small>
            </div>
          </div>

          <div className="post-module-content">
            <div className="row nopadding">
              <p className="col-md-12 text-left">{text}</p>
              <div className="col-md-12">
              { image !== '' && <img src={image} className="img-responsive post-img" /> }
              </div>
            </div>
          </div>

          <div className="post-module-bottom">
            <div className="row nopadding">
              <div className="col-md-12">
                <Like
                  hasLiked={didLike}
                  totalLikes={likes}
                  onClick={this.handleLike} />
                <CommentIcon
                  displayComments={displayComments}
                  comments={comments}
                  handleDropdown={this.handleCommentsDropdown}
                  onNewComment={this.handleNewComment}
                  postId={id} />
              </div>
              <div className="col-md-12">
                <div><ReportIcon taskId = {this.state.id} handleReport={this.handleReportButton}/></div>
              </div>
            </div>
          </div>
      </div>

      :

      <div className="post-module">This Post is Hidden </div>
    );
  }
};

export default Post;
