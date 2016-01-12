$(function(){
	$('.reply').click(function(){
		
		var cId = this.dataset.cid;
		var pId = this.dataset.pid;
		
		$('<input>').attr({
			value: cId,
			name: 'replyuser'
		}).appendTo('form');

		$('<input>').attr({
			value: pId,
			name: 'commentid'
		}).appendTo('form');
		
	});
});
