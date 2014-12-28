/* BOAT ICON */
L.BoatIcon = L.Icon.extend({
	options: {
		iconSize: new L.Point(47, 47),
		className: "leaflet-canvas-icon",
		course: 0,
		x: 15,
		y: 35,
		x_fac: 0.18,
		y_fac: 0.18,
		color: "#8ED6FF",
		labelAnchor: [23, 0]
	},

	ctx: null,
	lastHeading: 0,

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
		if(!ctx) return;
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

	setHeading: function(heading) {
		this.options.course = (heading % 360) - this.lastHeading;
		this.lastHeading = heading % 360;
		var s = this.options.iconSize;
		this.draw(this.ctx, s.x, s.y);
	}
});

L.BoatMarker = L.Marker.extend({
  	setHeading: function(heading) {
  		this.options.icon.setHeading(heading);
  	}
});

L.boatMarker = function(pos, options) {

	var c = ("color" in options) ? options.color : "#f1c40f";
	options.icon = new L.BoatIcon({ color: c});
	
    return new L.BoatMarker(pos, options);
};
