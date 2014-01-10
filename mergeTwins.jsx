// Merge pairs of layers
// if layer or group name starts with #, do not process it.

if (documents.length > 0) {

  var moveAfter = function(source, destination) {
    if (source == destination) return;
    if (destination.typename == "LayerSet") {
      // From CC reference: For layer sets, only the constant values
      // ElementPlacement.PLACEBEFORE and INSIDE are valid.
      // So we need "clever" trick to place after group
      source.move(destination, ElementPlacement.PLACEBEFORE);
      destination.move(source, ElementPlacement.PLACEBEFORE);
    }
    else source.move(destination, ElementPlacement.PLACEAFTER);
  }

  var mergeAtArtLayersLevel = function(layers) {
    var stack = [];
    // don't walk through artLayers, need to save relation between layers and groups
    for (var i = layers.length-1; i >= 0; --i) {
      if (layers[i].name[0] == "#" || layers[i].typename == "LayerSet") continue;
      else stack.push(layers[i]);
      if (stack.length != 2) continue;
      var mergeSet = layers.parent.layerSets.add();
      mergeSet.name = stack[0].name;
      stack[0].move(mergeSet, ElementPlacement.INSIDE);
      stack[1].move(mergeSet, ElementPlacement.INSIDE);
      var mergedLayer = mergeSet.merge();
      // at this step layers[i] pointing to another element!!!
      moveAfter(mergedLayer, layers[i]);
      while (stack.length > 0) stack.pop();
    }
  }

  var mergeTwins = function myself(layerNode) {
    if (layerNode.name[0] == "#") return;
    mergeAtArtLayersLevel(layerNode.layers);
    for (var i = 0; i < layerNode.layerSets.length; ++i) myself(layerNode.layerSets[i]);
  }
  
  mergeTwins(activeDocument);
}
