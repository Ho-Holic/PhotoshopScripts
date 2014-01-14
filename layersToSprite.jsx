// Arrange layers into a sprite sheet going from bottom to top.
// Warning: Don't use groups! Script work with layers. Prepare file with removeGroupsOnly.jsx

if (documents.length > 0) {
  app.preferences.rulerUnits = Units.PIXELS;

  var maximumSpriteWidth = UnitValue("4096 px"); // in my case this is flash buffer limitation for bitmap
  var layerWidth = activeDocument.width;
  var layerHeight = activeDocument.height;
  var spriteWidth = maximumSpriteWidth - maximumSpriteWidth%layerWidth;
  var layersCount = activeDocument.artLayers.length;
  var layersCountPerRow = spriteWidth / layerWidth;
  var layersCountPerColumn = Math.ceil(layersCount / layersCountPerRow);
  var spriteHeight = layerHeight * layersCountPerColumn;
  
  activeDocument.resizeCanvas(layersCountPerRow * layerWidth,
  	                          layersCountPerColumn * layerHeight,
  	                          AnchorPosition.TOPLEFT);

  var currentLayerIndex = layersCount-1;
  for (var i = 0; i < layersCountPerColumn; ++i) {
    for (var j = 0; j < layersCountPerRow; ++j) {
      activeDocument.artLayers[currentLayerIndex].visible = 1;
      activeDocument.artLayers[currentLayerIndex].translate(layerWidth*j, layerHeight*i);
      --currentLayerIndex;
      if (currentLayerIndex < 0) break;
    }
  }
}
