/* BOAT ICON */
L.Icon.Boat = L.Icon.extend({
	options: {
		iconSize: new L.Point(50, 50), // Have to be supplied
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		*/
		className: "leaflet-canvas-icon",
		course: 0,
		x: 20,
		y: 35,
		x_fac: 0.18,
		y_fac: 0.18,
		color: "#8ED6FF"
	},

	ctx: null,

	createIcon: function () {
		var e = document.createElement("canvas");
		this._setIconStyles(e, "icon");
		var s = this.options.iconSize;
		e.width = s.x;
		e.height = s.y;
		this.ctx = e.getContext("2d");
		this.draw(e.getContext("2d"), s.x, s.y);
		return e;
	},

	createShadow: function () {
		return null;
	},

	draw: function(ctx, w, h) {
		var x = this.options.x;
		var y = this.options.y;

		var x_fac = this.options.x_fac;
		var y_fac = this.options.y_fac;

		ctx.clearRect(0, 0, w, h);

		ctx.translate(w/2, h/2);
		ctx.rotate(this.options.course*Math.PI/180);
		ctx.translate(-w/2, -h/2);

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.bezierCurveTo(x, y+(80*y_fac), x+(100*x_fac), y+(80*y_fac), x+(100*x_fac), y);
		ctx.quadraticCurveTo(x+(100*x_fac), y-(100*y_fac), x+(50*x_fac), y-(200*y_fac));
		ctx.quadraticCurveTo(x, y-(100*y_fac), x, y);
		ctx.fillStyle = this.options.color;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	},

	setCourse: function(course) {
		this.options.course = course;
		var s = this.options.iconSize;
		this.draw(this.ctx, s.x, s.y);
	}
});

/* BOAT MARKER */
L.Marker.Boat = L.Marker.extend({

	options: {
		color: "#f1c40f"
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
	
		this.options.icon = new L.Icon.Boat({ color: this.options.color })
		
		this._latlng = L.latLng(latlng);
	},

	setCourse: function(course) {
		this.options.icon.setCourse(course);
	}
});