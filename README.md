Leaflet.BoatMarker
==================

A leaflet boat marker using HTML Canvas

![Demo Image](http://i.imgur.com/H4q765r.png)

### Usage

```javascript
var boatMarker = new L.marker(map.getCenter(), {
  	icon: new L.BoatIcon({ color: "#f1c40f" })
});
```

##### setHeading(heading)

Sets the current heading of the boat to an angle value between 0 and 360 degrees.

```javascript
boatMarker.options.icon.setHeading(60);
```
