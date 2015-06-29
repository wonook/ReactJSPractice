# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

@CommentBox = React.createClass
	handlesCommentSubmit: (comment) ->
		commentslist = @state.data
		newcomments = commentslist.concat([comment])
		@setState({data: newcomments})
		$.ajax({
			url: 'comments.json',
			dataType: 'json',
			type: 'POST'
			data: {comment: comment},
			success: ((data) ->
				@setState({data: data})).bind(this)
			error: ((xhr, status, err) ->
				console.error('comments.json', status, err.toString())).bind(this)
			})
	getInitialState: ->
		data: @props.data
	render: ->
		`<div className="commentBox">
			<h1>Comments</h1>
			<CommentList data={this.state.data}/>
			<CommentForm onCommentSubmit={this.handlesCommentSubmit}/>
		</div>`

@CommentList = React.createClass
	render: ->
		commentNodes = @props.data.map((comment) ->
			`<Comment author={comment.author}>
  				{comment.text}
  			</Comment>`
  			)
		`<div className="commentList">
      		{commentNodes}
      	</div>`

@CommentForm = React.createClass
	handlesSubmit: (e) ->
		e.preventDefault();
		author = React.findDOMNode(@refs.author).value.trim();
		text = React.findDOMNode(@refs.text).value.trim();
		if(!text || !author) then return
		@props.onCommentSubmit({author: author, text:text}) # call onCommentSubmit!
		React.findDOMNode(@refs.author).value = ''
		React.findDOMNode(@refs.text).value = ''
	render: ->
		`<form className="commentForm" onSubmit={this.handlesSubmit}>
        	<input type="text" placeholder="Username" ref="author" />
        	<input type="text" placeholder="Say something.." ref="text" />
        	<input type="submit" value="Post" />
      	</form>`

@Comment = React.createClass
	render: ->
		rawMarkup = marked(@props.children.toString(), {sanitize: true})
		return (
			`<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>`
		)