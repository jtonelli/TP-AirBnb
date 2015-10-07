
function dropzone() {

    return function(scope, element, attrs) {

        var config = {
            url: 'uploads/',
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 10,
            parallelUploads: 100,
            uploadMultiple: true,
            autoProcessQueue: false
        };

        var eventHandlers = {
            'addedfile': function(file) {
                //quito la barra de progreso
                file.previewElement.setAttribute('class','dz-preview dz-image-preview dz-complete');

                //elimina la imagen si hace click
                file.previewElement.addEventListener("click", function() {
                    dropzone.removeFile(file);
                });
            },

            'successmultiple': function(file, response) {
                //Si se grabo todo OK ejecuto un callback en angular
                scope.uploadCallback(file, response);
            },

            'completemultiple': function(file, response) {
                //Sin importar el resultado elimino las imagenes.
                dropzone.removeAllFiles();
            },

            'sendingmultiple': function(file, xhr, formData) {
                //agrego data para grabar junto con las imagenes
                formData.append(scope.formDataKeyStr, scope.formDataValueStr);
            }
        };

        dropzone = new Dropzone(element[0], config);

        angular.forEach(eventHandlers, function(handler, event) {
            dropzone.on(event, handler);
        });

        scope.processDropzone = function() {
            dropzone.processQueue();
        };

        scope.resetDropzone = function() {
            dropzone.removeAllFiles();
        }

        //expongo el Dropzone para setear la URL
        scope.myDropzone = dropzone;
    }
}

angular.module('tpAirbnApp').directive('dropzone', dropzone);
