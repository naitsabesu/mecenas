exports.__USER_IMAGES__ = '../app/img/user_images/';

//MENSAJES
exports._MSG_NOT_LOGGEDIN = 'Tienes que estar logueado para realizar esta accion!';
exports._MSG_NOT_LOGGEDIN_NEWPROJECT = 'Tienes ingresar a Mecenas para realizar publicar un proyecto!';

//auxiliar
exports.getDateNow = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd < 10){
		dd = '0' + dd;
	} 
	if(mm < 10){
		mm ='0'+ mm;
	} 
	today = yyyy +'/'+ mm +'/'+ dd;
	return today;
};


