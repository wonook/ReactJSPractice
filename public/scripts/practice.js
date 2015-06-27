var CommentsBox = React.createClass({
	render: function() {
		return (
			<div className="commentsBox">
				<h1>Comments</h1>
				<CommentsList />
				<CommentsForm />
			</div>
		);
	}
});

var CommentsList = React.createClass({
  	render: function() {
    	return (
      		<div className="commentsList">
        		<Comments author="Ricky Song">Comments one!</Comments>
        		<Comments author="Jordan Walke">This is *another* comment!</Comments>
      		</div>
    	);
  	}
});

var CommentsForm = React.createClass({
  	render: function() {
    	return (
      		<div className="commentsForm">
        		Hello, world! I am a CommentsForm.
      		</div>
    	);
  	}
});

var Comments = React.createClass({
	render: function() {
		return (
			<div className="comments">
				<h2 className="commentsAuthor">
					{this.props.author}
				</h2>
				{this.props.children}
			</div>
		)
	}
})

React.render(
	<CommentsBox />,
	document.getElementById('practice')
);