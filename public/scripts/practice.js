var CommentsBox = React.createClass({
	render: function() {
		return (
			<div className="commentsBox">
				Hello, world! I am a CommentsBox.
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
        Hello, world! I am a CommentsList.
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

React.render(
	<CommentsBox />,
	document.getElementById('practice')
);