import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";


class PostsIndex extends Component {
  constructor(props){
    super(props);
      this.state = {
        term: '',
        currentPeople: null
      }
    this.searchHandler= this.searchHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  searchHandler(event){
    let searchingFor = _.filter(this.props.posts, (post) => post.name.includes(event.target.value) || post.phoneNumber.includes(event.target.value));

    this.setState({ 
      term: event.target.value,
      currentPeople: searchingFor
    });
  }
  
  renderPosts() {
    const people = (this.state.currentPeople) ? this.state.currentPeople : this.props.posts;
    return _.map(people, (post) => {
      return (
        <li className="list-group-item" key={post._id}>
          <Link to={`/posts/${post._id}`}>
            {post.name}<br/>
            
          </Link>
          
        </li>
      );
    });
  }
  
  render() {
    const { term }= this.state;
    return (
      <div>
        
        <div className="text-xs-right">
        <form>
            <input type="text" onChange= {this.searchHandler}
            value={term}/>
          </form>
          <Link className="btn btn-primary" to="/posts/new">
            Add a Farmer
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);