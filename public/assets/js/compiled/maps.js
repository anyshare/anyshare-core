/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("var MapRenderer = function MapRenderer (selector) {\n    this.selector = selector\n    this.wrld3dApiKey = window.WRLD_3D_API_KEY\n    this.mapboxKey = window.MAPBOX_KEY\n\n    this.markers = []\n    this.instance = null\n    this.lat = null\n    this.lng = null\n\n    this.createInstance()\n};\n\nMapRenderer.prototype.createInstance = function createInstance () {\n    if (this.wrld3dApiKey) {\n        this.instance = L.Wrld.map(this.selector, this.wrld3dApiKey)\n        return this\n    }\n\n    this.instance = L.map(this.selector)\n\n    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxKey, {\n        attribution: 'Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>',\n        maxZoom: 18,\n        id: 'mapbox.streets',\n        accessToken: this.mapboxKey\n    }).addTo(this.instance)\n\n    return this\n};\n\nMapRenderer.prototype.setLatLng = function setLatLng (lat, lng) {\n    this.lat = parseFloat(lat)\n    this.lng = parseFloat(lng)\n\n    return this\n};\n\nMapRenderer.prototype.loadMarkers = function loadMarkers (markers, options) {\n        var this$1 = this;\n\n    options = Object.assign({}, {\n        merge: false,\n        popup: true,\n        tooltip: true,\n    }, options)\n\n    if (!options.merge) {\n        this.removeMarkers()\n    }\n\n    markers.forEach(function (m) {\n        this$1.addMapMarker(m, options)\n    })\n\n    return this\n};\n\nMapRenderer.prototype.addMapMarker = function addMapMarker (item, options) {\n    if (!item.lat || !item.lng) {\n        return\n    }\n\n    var marker = L.marker([item.lat, item.lng])\n\n    if (options.tooltip) {\n        marker.bindTooltip(item.display_name + ' ' + item.natural_post_type + ' <b>' + item.title + '</b>', { permanent: false })\n    }\n\n    if (options.popup) {\n        var popup = L.DomUtil.create('div', 'map-popup')\n        popup.innerHTML = '<div>' + item.image + '</div><a href=\"' + item.url + '\" class=\"map-popup-link\">' + item.display_name + ' ' + item.natural_post_type + ' <b>' + item.title + '</b></a><p><em>' + item.exchangeTypes + '</em></p>'\n\n        // popup\n        marker.bindPopup(popup)\n    }\n\n    this.markers.push(marker)\n    marker.addTo(this.instance)\n\n    return marker\n};\n\nMapRenderer.prototype.goToLinkListener = function goToLinkListener (link) {\n    window.location.href = link\n};\n\nMapRenderer.prototype.removeMarkers = function removeMarkers () {\n    this.markers.forEach(function (m) {\n        m.remove()\n    })\n\n    this.markers = []\n};\n\nMapRenderer.prototype.center = function center () {\n    if (this.lat && this.lng) {\n        this.instance.setView(new L.LatLng(this.lat, this.lng), 18)\n        return this\n    }\n\n    var points = []\n\n    this.markers.forEach(function (mk) {\n        points.push([mk.getLatLng().lat, mk.getLatLng().lng])\n    })\n\n    this.instance.fitBounds(points)\n};\n\n// ---------------------------------------------------------\n\nwindow.createMapRenderer = function (selector) {\n    return new MapRenderer(selector)\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21hcHMuanM/ODE1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNYXBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgICB0aGlzLndybGQzZEFwaUtleSA9IHdpbmRvdy5XUkxEXzNEX0FQSV9LRVlcbiAgICAgICAgdGhpcy5tYXBib3hLZXkgPSB3aW5kb3cuTUFQQk9YX0tFWVxuXG4gICAgICAgIHRoaXMubWFya2VycyA9IFtdXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsXG4gICAgICAgIHRoaXMubGF0ID0gbnVsbFxuICAgICAgICB0aGlzLmxuZyA9IG51bGxcblxuICAgICAgICB0aGlzLmNyZWF0ZUluc3RhbmNlKClcbiAgICB9XG5cbiAgICBjcmVhdGVJbnN0YW5jZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLndybGQzZEFwaUtleSkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IEwuV3JsZC5tYXAodGhpcy5zZWxlY3RvciwgdGhpcy53cmxkM2RBcGlLZXkpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IEwubWFwKHRoaXMuc2VsZWN0b3IpXG5cbiAgICAgICAgTC50aWxlTGF5ZXIoJ2h0dHBzOi8vYXBpLnRpbGVzLm1hcGJveC5jb20vdjQve2lkfS97en0ve3h9L3t5fS5wbmc/YWNjZXNzX3Rva2VuPScgKyB0aGlzLm1hcGJveEtleSwge1xuICAgICAgICAgICAgYXR0cmlidXRpb246ICdNYXAgZGF0YSAmY29weTsgPGEgaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLm9yZ1wiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycywgPGEgaHJlZj1cImh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LXNhLzIuMC9cIj5DQy1CWS1TQTwvYT4sIEltYWdlcnkgwqkgPGEgaHJlZj1cImh0dHA6Ly9tYXBib3guY29tXCI+TWFwYm94PC9hPicsXG4gICAgICAgICAgICBtYXhab29tOiAxOCxcbiAgICAgICAgICAgIGlkOiAnbWFwYm94LnN0cmVldHMnLFxuICAgICAgICAgICAgYWNjZXNzVG9rZW46IHRoaXMubWFwYm94S2V5XG4gICAgICAgIH0pLmFkZFRvKHRoaXMuaW5zdGFuY2UpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBzZXRMYXRMbmcgKGxhdCwgbG5nKSB7XG4gICAgICAgIHRoaXMubGF0ID0gcGFyc2VGbG9hdChsYXQpXG4gICAgICAgIHRoaXMubG5nID0gcGFyc2VGbG9hdChsbmcpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBsb2FkTWFya2VycyAobWFya2Vycywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgbWVyZ2U6IGZhbHNlLFxuICAgICAgICAgICAgcG9wdXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICB9LCBvcHRpb25zKVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5tZXJnZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJzKClcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlcnMuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRNYXBNYXJrZXIobSwgb3B0aW9ucylcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGFkZE1hcE1hcmtlciAoaXRlbSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIWl0ZW0ubGF0IHx8ICFpdGVtLmxuZykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWFya2VyID0gTC5tYXJrZXIoW2l0ZW0ubGF0LCBpdGVtLmxuZ10pXG5cbiAgICAgICAgaWYgKG9wdGlvbnMudG9vbHRpcCkge1xuICAgICAgICAgICAgbWFya2VyLmJpbmRUb29sdGlwKGl0ZW0uZGlzcGxheV9uYW1lICsgJyAnICsgaXRlbS5uYXR1cmFsX3Bvc3RfdHlwZSArICcgPGI+JyArIGl0ZW0udGl0bGUgKyAnPC9iPicsIHsgcGVybWFuZW50OiBmYWxzZSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMucG9wdXApIHtcbiAgICAgICAgICAgIHZhciBwb3B1cCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdtYXAtcG9wdXAnKVxuICAgICAgICAgICAgcG9wdXAuaW5uZXJIVE1MID0gJzxkaXY+JyArIGl0ZW0uaW1hZ2UgKyAnPC9kaXY+PGEgaHJlZj1cIicgKyBpdGVtLnVybCArICdcIiBjbGFzcz1cIm1hcC1wb3B1cC1saW5rXCI+JyArIGl0ZW0uZGlzcGxheV9uYW1lICsgJyAnICsgaXRlbS5uYXR1cmFsX3Bvc3RfdHlwZSArICcgPGI+JyArIGl0ZW0udGl0bGUgKyAnPC9iPjwvYT48cD48ZW0+JyArIGl0ZW0uZXhjaGFuZ2VUeXBlcyArICc8L2VtPjwvcD4nXG5cbiAgICAgICAgICAgIC8vIHBvcHVwXG4gICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKVxuICAgICAgICBtYXJrZXIuYWRkVG8odGhpcy5pbnN0YW5jZSlcblxuICAgICAgICByZXR1cm4gbWFya2VyXG4gICAgfVxuXG4gICAgZ29Ub0xpbmtMaXN0ZW5lciAobGluaykge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGxpbmtcbiAgICB9XG5cbiAgICByZW1vdmVNYXJrZXJzICgpIHtcbiAgICAgICAgdGhpcy5tYXJrZXJzLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgIG0ucmVtb3ZlKClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLm1hcmtlcnMgPSBbXVxuICAgIH1cblxuICAgIGNlbnRlciAoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhdCAmJiB0aGlzLmxuZykge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zZXRWaWV3KG5ldyBMLkxhdExuZyh0aGlzLmxhdCwgdGhpcy5sbmcpLCAxOClcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9pbnRzID0gW11cblxuICAgICAgICB0aGlzLm1hcmtlcnMuZm9yRWFjaCgobWspID0+IHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKFttay5nZXRMYXRMbmcoKS5sYXQsIG1rLmdldExhdExuZygpLmxuZ10pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS5maXRCb3VuZHMocG9pbnRzKVxuICAgIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbndpbmRvdy5jcmVhdGVNYXBSZW5kZXJlciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgIHJldHVybiBuZXcgTWFwUmVuZGVyZXIoc2VsZWN0b3IpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYXBzLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);