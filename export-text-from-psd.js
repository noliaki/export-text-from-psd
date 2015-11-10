;(function(){
  'use strict';

  var fileName = '',
      currentPath = activeDocument.path,
      rootLayers,
      txtFile,
      layerTxtArray = [],
      separator = '************************************';

  fileName = activeDocument.name.replace(/(\.psd)$/, '.txt');
  txtFile = new File(currentPath + '/' + fileName);

  rootLayers = activeDocument.layers;

  if ($.os.search(/windows/i) != -1){
    txtFile.linefeed = "windows";
  } else {
    txtFile.linefeed = "macintosh";
  }

  txtFile.open('w', 'TEXT', '????');
  filterLayer(rootLayers);

  txtFile.close();


  function filterLayer(_layers){
    var text = '';

    for(var i = 0, len = _layers.length; i < len; i ++){

      if( _layers[i].kind === LayerKind.TEXT ){
        txtFile.writeln(separator);
        txtFile.writeln('<< ' + _layers[i].name + ' >>');
        txtFile.writeln(separator);
        txtFile.writeln(replaceEntity(_layers[i].textItem.contents));
        txtFile.writeln('');
        txtFile.writeln('');

      } else if( _layers[i].typename === 'LayerSet' ){
        filterLayer( _layers[i].layers );
      }
    }
  }

  function replaceEntity(s) {
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .replace(/®/g, '&reg;')
            .replace(/©/g, '&copy;');
  }
})();