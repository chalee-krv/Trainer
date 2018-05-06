var extent = [0, 0, 4724, 3458];
var projection = new ol.proj.Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent
});

var map = new ol.Map({
    layers: [
        new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: 'src/images/map2.jpg',
                projection: projection,
                imageExtent: extent
            })
        })
    ],
    target: 'map',
    view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter([0, 0, 4724, 3000]),
        zoom: 2,
        minZoom: 2,
        maxZoom: 5
    })
});