var CommentsBox = React.createClass({
	render: function() {
		return (
			<div className="commentsBox">
				<h1>Comments</h1>
				<CommentsList datas={this.props.datas}/>
				<CommentsForm />
			</div>
		);
	}
});

var datas = [
	{author: "Ricky Song", text: "Comments one!"},
    {author: "Jordan Walke", text: "This is *another* comment!"}
]

var CommentsList = React.createClass({
  	render: function() {
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
	<CommentsBox datas={datas}/>,
	document.getElementById('practice')
);