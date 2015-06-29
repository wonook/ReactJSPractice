# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

@CommentBox = React.createClass
	render: ->
		`<div className="commentBox">
			<h1>Comments</h1>
			Hello, world! I am a CommentBox
			<CommentList />
			<CommentForm />
		</div>`

@CommentList = React.createClass
	render: ->
		`<div className="commentList">
        	Hello, world! I am a CommentList.
      	</div>`

@CommentForm = React.createClass
	render: ->
		`<div className="commentForm">
        	Hello, world! I am a CommentForm.
      	</div>`
