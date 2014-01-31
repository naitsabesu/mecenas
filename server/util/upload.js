var fs   = require('fs'),
    guid = require('node-uuid'),
    globals = require('./globals');

exports.upload = function(req, res){
    // console.log(req.files);
    var tmp_path = req.files.file.path;   
  
    // Comprobamos que el fichero es de tipo imagen
    if (req.files.file.type.indexOf('image') == -1){
    	res.send('El fichero que deseas subir no es una imagen');
    }
    var guidName = getGuidName(req.files.file.type);
    if (guidName === ''){
        res.send('El fichero que deseas subir no es de un formato compatible');
    }
    // Ruta donde colocaremos las imagenes
    var target_path = globals.__USER_IMAGES__ +'temp/'+ guidName; //req.files.image.name;

    // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
    fs.rename(tmp_path, target_path, function(err) {
        if(err) throw err;
    
        // Eliminamos el fichero temporal
        fs.unlink(tmp_path, function() {
            if(err) throw err;
        });
    });
    return guidName;    
};

exports.moveFile = function(req, filename){
    var target_dir = globals.__USER_IMAGES__ + req.session.user.email +'/';  
    fs.exists(target_dir, function (exists) {
        if(!exists)fs.mkdir(target_dir);
    });

    var target_path = target_dir + filename;
    fs.rename(globals.__USER_IMAGES__ +'temp/' + filename, target_path, function(err) {
        if (err) throw err;
    });
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

