var CommentsBox = React.createClass({
	loadCommentFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(datas) {
				this.setState({datas: datas});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handlesCommentsSubmit: function(comments) {
		//optimization
		var commentslist = this.state.datas;
		var newComments = commentslist.concat([comments]);
		this.setState({datas: newComments});
		// submit to the server and refresh the list.
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comments,
			success: function(datas) {
				this.setState({datas: datas});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() { // Name matters
		return {datas: []};
	},
	componentDidMount: function() { // Name matters
		this.loadCommentFromServer();
		setInterval(this.loadCommentFromServer, this.props.pollInterval);
	},
	render: function() { // Name matters
		return (
			<div className="commentsBox">
				<h1>Comments</h1>
				<CommentsList datas={this.state.datas}/>
				<CommentsForm onCommentsSubmit={this.handlesCommentsSubmit}/>
			</div>
		);
	}
});

var CommentsList = React.createClass({
  	render: function() { // Name matters
  		var commentsNodes = this.props.datas.map(function (comments) {
  			return (
  				<Comments author={comments.author}>
  					{comments.text}
  				</Comments>
  			)
  		})
    	return (
      		<div className="commentsList">
      			{commentsNodes}
      		</div>
    	);
  	}
});

var CommentsForm = React.createClass({
	handlesSubmit: function(e) {
		e.preventDefault(); // to prevent the browser's default action of submitting the form
		var authors = React.findDOMNode(this.refs.authors).value.trim();
		var texts = React.findDOMNode(this.refs.texts).value.trim();
		if(!texts || !authors) {
			return;
		}
		// send request to the server
		this.props.onCommentsSubmit({author: authors, text: texts});
		// reset values
		React.findDOMNode(this.refs.authors).value = '';
		React.findDOMNode(this.refs.texts).value = '';
		return;
	},
  	render: function() { // Name matters
    	return (
      		<form className="commentsForm" onSubmit={this.handlesSubmit}>
        		<input type="text" placeholder="Username" ref="authors" />
        		<input type="text" placeholder="Say something.." ref="texts" />
        		<input type="submit" value="Post" />
      		</form>
    	);
  	}
});

var Comments = React.createClass({
	render: function() { // Name matters
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
			<div className="comments">
				<h2 className="commentsAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		)
	}
})

React.render(
	<CommentsBox url="comments.json" pollInterval={2000} />,
	document.getElementById('practice')
);