// delete all groups and preserve layers in original order

if (documents.length > 0) {

  var extractFromGroup = function(layersForExtraction) {
    while (layersForExtraction.length > 0) {      
      layersForExtraction[0].move(layersForExtraction.parent,
                                  ElementPlacement.PLACEBEFORE);
    }
  }

  var removeGroups = function myself(layersForRemoval) {
    while (layersForRemoval.length > 0) {
      var bottomLayerSet = layersForRemoval[layersForRemoval.length-1];
      myself(bottomLayerSet.layerSets);
      // now `bottomLayerSet` contains only artLayers
      extractFromGroup(bottomLayerSet.artLayers);
      bottomLayerSet.remove();
    }
  }

  removeGroups(activeDocument.layerSets);
}
