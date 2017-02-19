# ⛵️ Leaflet.BoatMarker [![npm version](https://badge.fury.io/js/leaflet.boatmarker.svg)](https://badge.fury.io/js/leaflet.boatmarker)

A leaflet boat marker using HTML Canvas.
Checkout the [Demo](https://thomasbrueggemann.github.io/leaflet.boatmarker/).

Can be used to symbolize sailboats/sailyachts or motorboats/motoryachts with optional wind information.

<center>
	<img src="http://i.imgur.com/KYZaG8C.png" />
</center>

### Installation

* Include the script directly

```javascript
<script src="https://unpkg.com/leaflet.boatmarker/leaflet.boatmarker.min.js"></script>
```

* Use in a build script via npm

```bash
npm i leaflet.boatmarker --save
```

### Usage

```javascript
var boatMarker = L.boatMarker(map.getCenter(), {
  	color: "#f1c40f", 	// color of the boat
	idleCircle: false	// if set to true, the icon will draw a circle if
						// boatspeed == 0 and the ship-shape if speed > 0
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

##### setSpeed(speed)

Set the current speed of the boat to a value > 0

```javascript
boatMarker.setSpeed(12.9);
```
