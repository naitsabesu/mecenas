var fs   = require('fs'),
    guid = require('node-uuid'),
    globals = require('./globals');

var Upload = function(req, res){
    console.log(req.files);
    var tmp_path = req.files.image.path;   
  
    // Comprobamos que el fichero es de tipo imagen
    if (req.files.image.type.indexOf('image')==-1){
    	res.send('El fichero que deseas subir no es una imagen');
    }
    var guidName = getGuidName(req.files.image.type);
    if (guidName === ''){
        res.send('El fichero que deseas subir no es de un formato compatible');
    }
    // Ruta donde colocaremos las imagenes
    var target_path = globals.__USER_IMAGES__ + guidName; //req.files.image.name;

    // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        
        // Eliminamos el fichero temporal
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            // res.render('upload',{message: '/img/' + req.files.photo.name,title: 'ejemplo de subida de imagen por HispaBigData'});
        });
    });
    return guidName;

};

var getGuidName = function(fileType){
    var guidName = guid.v1(),
        ext = '';

    if(fileType.indexOf('jpeg') != -1){
        return guidName + '.jpg';
    }
    if(fileType.indexOf('png') != -1){
        return guidName + '.png';
    }
    return;
};

exports.upload = Upload;