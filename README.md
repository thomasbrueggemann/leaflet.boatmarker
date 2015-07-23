Leaflet.BoatMarker
==================

A leaflet boat marker using HTML Canvas. 
Checkout the [Demo](http://thomasbrueggemann.github.io/leaflet.boatmarker/).

Can be used to symbolize sailboats/sailyachts or motorboats/motoryachts with optional wind information.

![Demo Image](http://i.imgur.com/KYZaG8C.png)

### Usage

```javascript
var boatMarker = L.boatMarker(map.getCenter(), {
  	color: "#f1c40f"
});
```

##### setHeading(heading)

Sets the current heading of the boat to an angle value between 0 and 360 degrees.

```javascript
boatMarker.setHeading(60);
```

##### setHeadingWind(heading, windspeed, winddirection)

Sets the current heading of the boat to an angle value between 0 and 360 degrees,
the current wind direction to an angle value between 0 and 360 degress and the wind
speed (in knots) following this weather wind arrow specification http://www.wetterklima.de/segeln/windpfeile/bf.htm

```javascript
boatMarker.setHeadingWind(60, 4.5, 20);
```
