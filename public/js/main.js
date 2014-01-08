$(document).ready(function(){
	// window.io = io.connect();
	// io.on('connect', function(socket){
	// 	console.log('init io');
	// 	io.emit('hello?');
	// });
	// io.on('saludo', function(data){
	// 	console.log(data);
	// });
	// io.on('log-in', function(data){
	// 	console.log(data);
	// 	$('#users').append('<li>'+data.username+'</li>');
	// });
	// io.on('log-out', function(data){
	// 	console.log(data);
	// 	$('#users li').each(function(i, item){
	// 		//innerText no funciona en firefox por eso va "text()"
	// 		if($(item).text() === data.username){
	// 			$(item).remove();
	// 		}
	// 	});
	// });
	console.log('Starting crowdfunding');
	new Crowdfunding.App();

	//Backbone.history.navigate('', {trigger: true})	
});