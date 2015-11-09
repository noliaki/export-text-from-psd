;(function(){
  'use strict';

  var fileName = '',
      currentPath = activeDocument.path,
      rootLayers,
      txtFile,
      layerTxtArray = [],
      separater = '************************************';

  fileName = activeDocument.name.replace(/(\.psd)$/, '.txt');
  txtFile = new File(currentPath + '/' + fileName);

  rootLayers = activeDocument.layers;

  txtFile.linefeed = "macintosh";

  txtFile.open('w', 'TEXT', '????');
  filterLayer(rootLayers);

  txtFile.close();


  function filterLayer(_layers){
    var text = '';

    for(var i = 0, len = _layers.length; i < len; i ++){

      if( _layers[i].kind === LayerKind.TEXT ){
        txtFile.writeln(separater);
        txtFile.writeln('<< ' + _layers[i].name + ' >>');
        txtFile.writeln(replaceEntity(_layers[i].textItem.contents));

      } else if( _layers[i].typename === 'LayerSet' ){
        filterLayer( _layers[i].layers );
      }
    }
  }

  function replaceEntity(s) {
    return s.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/&/g, '&amp;')
            .replace(/'/g, '&apos;')
            .replace(/</g, '&lt;');
  }
})();