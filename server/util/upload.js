var fs   = require('fs'),
    guid = require('node-uuid'),
    globals = require('./globals');

var upload = function(req, res){
    // console.log(req.files);
    var tmp_path = req.files.file.path;   
  
    // Comprobamos que el fichero es de tipo imagen
    if (req.files.file.type.indexOf('image')==-1){
    	res.send('El fichero que deseas subir no es una imagen');
    }
    var guidName = getGuidName(req.files.file.type);
    if (guidName === ''){
        res.send('El fichero que deseas subir no es de un formato compatible');
    }
    // Ruta donde colocaremos las imagenes
    var target_path = globals.__USER_TEMP_IMAGES__ + guidName; //req.files.image.name;

    // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
    fs.rename(tmp_path, target_path, function(err) {
        if (err){
            return { uploaded : false , err : err };
        }
        
        // Eliminamos el fichero temporal
        fs.unlink(tmp_path, function() {
            return { uploaded : false , err : err };
        });
    });
    return { uploaded : true , tmpname : guidName , originalname : req.files.file.name };
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

exports.upload = upload;