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
				<CommentsForm />
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
  	render: function() { // Name matters
    	return (
      		<div className="commentsForm">
        		Hello, world! I am a CommentsForm.
      		</div>
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