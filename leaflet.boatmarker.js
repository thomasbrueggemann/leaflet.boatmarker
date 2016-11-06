/*
 * LEAFLET.BOATMARKER
 * v1.1.0
 * Thomas Brüggemann
 */

/* BOAT ICON */
L.BoatIcon = L.Icon.extend({

	// OPTIONS
	options: {
		iconSize: new L.Point(150, 150),
		className: "leaflet-boat-icon",
		course: 0,
		speed: 0,
		color: "#8ED6FF",
		labelAnchor: [23, 0],
		wind: false,
		windDirection: 0,
		windSpeed: 0,
		idleCircle: false
	},

	// PROPERTIES
	x: 66,
	y: 85,
	x_fac: 0.18,
	y_fac: 0.18,
	ctx: null,
	lastHeading: 0,
	lastWindDirection: 0,

	// CREATE ICON
	// setup the icon and start drawing
	createIcon: function () {
		var e = document.createElement("canvas");
		this._setIconStyles(e, "icon");
		var s = this.options.iconSize;

		e.width = s.x;
		e.height = s.y;
		this.lastHeading = 0;   // reset in case the marker is removed and added again

		this.ctx = e.getContext("2d");
		this.draw(this.ctx, s.x, s.y);

		return e;
	},

	// DRAW
	// renders the boat icon onto the canvas element
	draw: function(ctx, w, h) {
		if(!ctx) return;
		var x = this.x;
		var y = this.y;

		var x_fac = this.x_fac;
		var y_fac = this.y_fac;

		ctx.clearRect(0, 0, w, h);

		ctx.translate(w/2, h/2);
		ctx.rotate(this.options.course*Math.PI/180);
		ctx.translate(-w/2, -h/2);

		//ctx.fillRect(0,0,w,h);

		ctx.beginPath();

		// draw idle boat shape
		if(this.options.idleCircle === true && this.options.speed === 0) {
			ctx.arc(x+(50*x_fac), y-(50*y_fac), 50*x_fac, 0, 2 * Math.PI);
		}
		// draw boat shape in motion
		else {
			ctx.moveTo(x, y);
			ctx.bezierCurveTo(x, y+(80*y_fac), x+(100*x_fac), y+(80*y_fac), x+(100*x_fac), y);
			ctx.quadraticCurveTo(x+(100*x_fac), y-(100*y_fac), x+(50*x_fac), y-(200*y_fac));
			ctx.quadraticCurveTo(x, y-(100*y_fac), x, y);
		}

		ctx.fillStyle = this.options.color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// draw wind
		if(this.options.wind == true) {

			ctx.translate(w/2, h/2);
			ctx.rotate(this.options.windDirection*Math.PI/180);
			ctx.translate(-w/2, -h/2);

			ctx.beginPath();
			ctx.moveTo(w/2, y-45);
			ctx.lineTo(w/2, y-70);

			var center = w/2;

			var spd = 5 * Math.round(this.options.windSpeed / 5);
			var tenLines = Math.floor(spd / 10);
			var fiveLine = ((spd % 10) > 0);

			var carriage = 70;
			for(var i = 0; i < tenLines; i++) {
				ctx.moveTo(center, y - carriage);
				ctx.lineTo(center + 8, y - carriage - 8);
				carriage -= 5;
			}

			if(fiveLine) {
				if(tenLines == 0) carriage -= 5;
				ctx.moveTo(center, y - carriage);
				ctx.lineTo(center + 5, y - carriage - 5);
			}

      		ctx.stroke();
		}
	},

	setHeadingWind: function(heading, windSpeed, windDirection) {
		this.options.wind = true;

		this.options.course = (heading % 360) - this.lastHeading;
		this.lastHeading = heading % 360;

		this.options.windDirection = (windDirection % 360) - (heading % 360);
		this.lastHeading += this.options.windDirection;

		this.options.windSpeed = windSpeed;

		var s = this.options.iconSize;
		this.draw(this.ctx, s.x, s.y);
	},

	// SET HEADING
	// sets the boat heading and
	// update the boat icon accordingly
	setHeading: function(heading) {
		this.options.course = (heading % 360) - this.lastHeading;
		this.lastHeading = heading % 360;

		var s = this.options.iconSize;
		this.draw(this.ctx, s.x, s.y);
	},

	// SET SPEED
	// sets the boat speed value and
	// update the boat icon accordingly
	setSpeed: function(speed) {
		this.options.speed = speed;

		var s = this.options.iconSize;
		this.draw(this.ctx, s.x, s.y);
	}
});

L.BoatMarker = L.Marker.extend({
  	setHeadingWind: function(heading, windSpeed, windDirection) {
  		this.options.icon.setHeadingWind(heading, windSpeed, windDirection);
  	},

  	setHeading: function(heading) {
  		this.options.icon.setHeading(heading);
  	},

	setSpeed: function(speed) {
		this.options.icon.setSpeed(speed);
	}
});

L.boatMarker = function(pos, options) {

	var c = ("color" in options) ? options.color : "#f1c40f";
	var i = ("idleCircle" in options) ? options.idleCircle : false;
	options.icon = new L.BoatIcon({ color: c, idleCircle: i});

    return new L.BoatMarker(pos, options);
};
