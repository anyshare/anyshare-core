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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return MapRenderer2d; });\nvar MapRenderer2d = function MapRenderer2d (selector, options) {\n    this.type = '2d'\n    this.selector = selector\n    this.mapboxKey = window.MAPBOX_KEY\n    this.markers = []\n    this.instance = null\n    this.lat = options.lat || null\n    this.lng = options.lng || null\n\n    if (this.mapboxKey) {\n        this.createInstance(options)\n    }\n};\n\n/**\n * Initialize a new instance of the default Leaflet map.\n *\n * @param options\n * @returns {MapRenderer}\n */\nMapRenderer2d.prototype.createInstance = function createInstance (options) {\n    Object.assign(options, {}, options)\n\n    this.instance = L.map(this.selector)\n\n    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxKey, {\n        attribution: 'Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>',\n        maxZoom: 18,\n        id: 'mapbox.streets',\n        accessToken: this.mapboxKey\n    }).addTo(this.instance)\n\n    if (this.lat && this.lng) {\n        this.center()\n    }\n\n    return this\n};\n\nMapRenderer2d.prototype.setLatLng = function setLatLng (lat, lng) {\n    this.lat = parseFloat(lat)\n    this.lng = parseFloat(lng)\n\n    return this\n};\n\nMapRenderer2d.prototype.loadMarkers = function loadMarkers (markers, options) {\n        var this$1 = this;\n\n    options = Object.assign({}, {\n        merge: false,\n        popup: true,\n        tooltip: true,\n    }, options)\n\n    if (!options.merge) {\n        this.removeMarkers()\n    }\n\n    markers.forEach(function (item) {\n        this$1.addMapMarker(item, options)\n    })\n\n    return this\n};\n\n/**\n * Item properties:\n *  - id\n *  - indoor_id\n *  - floor_id\n *  - lat\n *  - lon\n *  - title\n *  - subtitle\n *  - user_data\n *- natural_post_type\n *- image_url\n *- author_name\n *- url\n *- exchange_types\n *\n * @param item\n * @param options\n */\nMapRenderer2d.prototype.addMapMarker = function addMapMarker (item, options) {\n    item = this.prepareEntry(item)\n\n    if (!$.isNumeric(item.lat) || !$.isNumeric(item.lon)) {\n        return\n    }\n\n    var marker = L.marker([item.lat, item.lon])\n\n    // Add a tooltip to the marker\n    if (options.tooltip) {\n        marker.bindTooltip(item.display_name + ' ' + item.natural_post_type + ' <b>' + item.title + '</b>', { permanent: false })\n    }\n\n    // Add a popup with marker's information\n    if (options.popup) {\n        var popup = L.DomUtil.create('div', 'map-popup')\n        popup.innerHTML = '<div>' + item.image + '</div><a href=\"' + item.url + '\" class=\"map-popup-link\">' + item.display_name + ' ' + item.natural_post_type + ' <b>' + item.title + '</b></a><p><em>' + item.exchangeTypes + '</em></p>'\n\n        marker.bindPopup(popup)\n    }\n\n    this.markers.push(marker)\n    marker.addTo(this.instance)\n};\n\nMapRenderer2d.prototype.removeMarkers = function removeMarkers () {\n    this.markers.forEach(function (m) {\n        m.remove()\n    })\n\n    this.markers = []\n};\n\nMapRenderer2d.prototype.centerAt = function centerAt (entry) {\n    if (entry.lat && entry.lon) {\n        this.instance.setView([entry.lat, entry.lon], 14)\n    }\n};\n\nMapRenderer2d.prototype.center = function center () {\n    if (this.lat && this.lng) {\n        this.instance.setView([this.lat, this.lng], 18)\n        return this\n    }\n\n    var points = []\n\n    this.markers.forEach(function (mk) {\n        points.push([mk.getLatLng().lat, mk.getLatLng().lng])\n    })\n\n    if (points.length === 0) {\n        return this\n    }\n\n    this.instance.fitBounds(points)\n    return this\n};\n\nMapRenderer2d.prototype.prepareEntry = function prepareEntry (entry) {\n    entry.lon = entry.lng\n    entry.indoor = (entry.wrld3d && entry.wrld3d.indoor_id)\n    entry.indoor_id = entry.wrld3d ? entry.wrld3d.indoor_id : null\n    entry.floor_id = entry.wrld3d ? entry.wrld3d.indoor_floor : null\n\n    entry.user_data = {\n        description: entry.description,\n        image_url: entry.image_url,\n        author_name: entry.display_name,\n        natural_post_type: entry.natural_post_type,\n        exchanges_types: entry.exchangesTypes,\n        url: entry.url,\n    }\n\n    return entry\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21hcHMyZC5qcz9mN2QwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXBSZW5kZXJlcjJkIHtcbiAgICBjb25zdHJ1Y3RvciAoc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJzJkJ1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgdGhpcy5tYXBib3hLZXkgPSB3aW5kb3cuTUFQQk9YX0tFWVxuICAgICAgICB0aGlzLm1hcmtlcnMgPSBbXVxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbFxuICAgICAgICB0aGlzLmxhdCA9IG9wdGlvbnMubGF0IHx8IG51bGxcbiAgICAgICAgdGhpcy5sbmcgPSBvcHRpb25zLmxuZyB8fCBudWxsXG5cbiAgICAgICAgaWYgKHRoaXMubWFwYm94S2V5KSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUluc3RhbmNlKG9wdGlvbnMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBkZWZhdWx0IExlYWZsZXQgbWFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7TWFwUmVuZGVyZXJ9XG4gICAgICovXG4gICAgY3JlYXRlSW5zdGFuY2UgKG9wdGlvbnMpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7fSwgb3B0aW9ucylcblxuICAgICAgICB0aGlzLmluc3RhbmNlID0gTC5tYXAodGhpcy5zZWxlY3RvcilcblxuICAgICAgICBMLnRpbGVMYXllcignaHR0cHM6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92NC97aWR9L3t6fS97eH0ve3l9LnBuZz9hY2Nlc3NfdG9rZW49JyArIHRoaXMubWFwYm94S2V5LCB7XG4gICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ01hcCBkYXRhICZjb3B5OyA8YSBocmVmPVwiaHR0cDovL29wZW5zdHJlZXRtYXAub3JnXCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzLCA8YSBocmVmPVwiaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMi4wL1wiPkNDLUJZLVNBPC9hPiwgSW1hZ2VyeSDCqSA8YSBocmVmPVwiaHR0cDovL21hcGJveC5jb21cIj5NYXBib3g8L2E+JyxcbiAgICAgICAgICAgIG1heFpvb206IDE4LFxuICAgICAgICAgICAgaWQ6ICdtYXBib3guc3RyZWV0cycsXG4gICAgICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy5tYXBib3hLZXlcbiAgICAgICAgfSkuYWRkVG8odGhpcy5pbnN0YW5jZSlcblxuICAgICAgICBpZiAodGhpcy5sYXQgJiYgdGhpcy5sbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgc2V0TGF0TG5nIChsYXQsIGxuZykge1xuICAgICAgICB0aGlzLmxhdCA9IHBhcnNlRmxvYXQobGF0KVxuICAgICAgICB0aGlzLmxuZyA9IHBhcnNlRmxvYXQobG5nKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgbG9hZE1hcmtlcnMgKG1hcmtlcnMsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgIG1lcmdlOiBmYWxzZSxcbiAgICAgICAgICAgIHBvcHVwOiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogdHJ1ZSxcbiAgICAgICAgfSwgb3B0aW9ucylcblxuICAgICAgICBpZiAoIW9wdGlvbnMubWVyZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VycygpXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkTWFwTWFya2VyKGl0ZW0sIG9wdGlvbnMpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVtIHByb3BlcnRpZXM6XG4gICAgICogIC0gaWRcbiAgICAgKiAgLSBpbmRvb3JfaWRcbiAgICAgKiAgLSBmbG9vcl9pZFxuICAgICAqICAtIGxhdFxuICAgICAqICAtIGxvblxuICAgICAqICAtIHRpdGxlXG4gICAgICogIC0gc3VidGl0bGVcbiAgICAgKiAgLSB1c2VyX2RhdGFcbiAgICAgKiAgICAtIG5hdHVyYWxfcG9zdF90eXBlXG4gICAgICogICAgLSBpbWFnZV91cmxcbiAgICAgKiAgICAtIGF1dGhvcl9uYW1lXG4gICAgICogICAgLSB1cmxcbiAgICAgKiAgICAtIGV4Y2hhbmdlX3R5cGVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgYWRkTWFwTWFya2VyIChpdGVtLCBvcHRpb25zKSB7XG4gICAgICAgIGl0ZW0gPSB0aGlzLnByZXBhcmVFbnRyeShpdGVtKVxuXG4gICAgICAgIGlmICghJC5pc051bWVyaWMoaXRlbS5sYXQpIHx8ICEkLmlzTnVtZXJpYyhpdGVtLmxvbikpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hcmtlciA9IEwubWFya2VyKFtpdGVtLmxhdCwgaXRlbS5sb25dKVxuXG4gICAgICAgIC8vIEFkZCBhIHRvb2x0aXAgdG8gdGhlIG1hcmtlclxuICAgICAgICBpZiAob3B0aW9ucy50b29sdGlwKSB7XG4gICAgICAgICAgICBtYXJrZXIuYmluZFRvb2x0aXAoaXRlbS5kaXNwbGF5X25hbWUgKyAnICcgKyBpdGVtLm5hdHVyYWxfcG9zdF90eXBlICsgJyA8Yj4nICsgaXRlbS50aXRsZSArICc8L2I+JywgeyBwZXJtYW5lbnQ6IGZhbHNlIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgYSBwb3B1cCB3aXRoIG1hcmtlcidzIGluZm9ybWF0aW9uXG4gICAgICAgIGlmIChvcHRpb25zLnBvcHVwKSB7XG4gICAgICAgICAgICB2YXIgcG9wdXAgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbWFwLXBvcHVwJylcbiAgICAgICAgICAgIHBvcHVwLmlubmVySFRNTCA9ICc8ZGl2PicgKyBpdGVtLmltYWdlICsgJzwvZGl2PjxhIGhyZWY9XCInICsgaXRlbS51cmwgKyAnXCIgY2xhc3M9XCJtYXAtcG9wdXAtbGlua1wiPicgKyBpdGVtLmRpc3BsYXlfbmFtZSArICcgJyArIGl0ZW0ubmF0dXJhbF9wb3N0X3R5cGUgKyAnIDxiPicgKyBpdGVtLnRpdGxlICsgJzwvYj48L2E+PHA+PGVtPicgKyBpdGVtLmV4Y2hhbmdlVHlwZXMgKyAnPC9lbT48L3A+J1xuXG4gICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKVxuICAgICAgICBtYXJrZXIuYWRkVG8odGhpcy5pbnN0YW5jZSlcbiAgICB9XG5cbiAgICByZW1vdmVNYXJrZXJzICgpIHtcbiAgICAgICAgdGhpcy5tYXJrZXJzLmZvckVhY2goKG0pID0+IHtcbiAgICAgICAgICAgIG0ucmVtb3ZlKClcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLm1hcmtlcnMgPSBbXVxuICAgIH1cblxuICAgIGNlbnRlckF0IChlbnRyeSkge1xuICAgICAgICBpZiAoZW50cnkubGF0ICYmIGVudHJ5Lmxvbikge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZS5zZXRWaWV3KFtlbnRyeS5sYXQsIGVudHJ5Lmxvbl0sIDE0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2VudGVyICgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF0ICYmIHRoaXMubG5nKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlLnNldFZpZXcoW3RoaXMubGF0LCB0aGlzLmxuZ10sIDE4KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb2ludHMgPSBbXVxuXG4gICAgICAgIHRoaXMubWFya2Vycy5mb3JFYWNoKChtaykgPT4ge1xuICAgICAgICAgICAgcG9pbnRzLnB1c2goW21rLmdldExhdExuZygpLmxhdCwgbWsuZ2V0TGF0TG5nKCkubG5nXSlcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuZml0Qm91bmRzKHBvaW50cylcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBwcmVwYXJlRW50cnkgKGVudHJ5KSB7XG4gICAgICAgIGVudHJ5LmxvbiA9IGVudHJ5LmxuZ1xuICAgICAgICBlbnRyeS5pbmRvb3IgPSAoZW50cnkud3JsZDNkICYmIGVudHJ5LndybGQzZC5pbmRvb3JfaWQpXG4gICAgICAgIGVudHJ5LmluZG9vcl9pZCA9IGVudHJ5LndybGQzZCA/IGVudHJ5LndybGQzZC5pbmRvb3JfaWQgOiBudWxsXG4gICAgICAgIGVudHJ5LmZsb29yX2lkID0gZW50cnkud3JsZDNkID8gZW50cnkud3JsZDNkLmluZG9vcl9mbG9vciA6IG51bGxcblxuICAgICAgICBlbnRyeS51c2VyX2RhdGEgPSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZW50cnkuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBpbWFnZV91cmw6IGVudHJ5LmltYWdlX3VybCxcbiAgICAgICAgICAgIGF1dGhvcl9uYW1lOiBlbnRyeS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICBuYXR1cmFsX3Bvc3RfdHlwZTogZW50cnkubmF0dXJhbF9wb3N0X3R5cGUsXG4gICAgICAgICAgICBleGNoYW5nZXNfdHlwZXM6IGVudHJ5LmV4Y2hhbmdlc1R5cGVzLFxuICAgICAgICAgICAgdXJsOiBlbnRyeS51cmwsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZW50cnlcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvbWFwczJkLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(exports, \"a\", function() { return MapRenderer3d; });\nvar MapRenderer3d = function MapRenderer3d (selector, options) {\n    this.type = '3d'\n    this.selector = selector\n    this.wrld3dApiKey = window.WRLD_3D_API_KEY\n    this.mapboxKey = window.MAPBOX_KEY\n    this.markers = []\n    this.instance = null\n    this.poiApi = null\n    this.markerController = null\n    this.lat = options.lat || null\n    this.lng = options.lng || null\n\n    if (this.wrld3dApiKey) {\n        this.createInstance(options)\n    }\n};\n\n/**\n * Initialize a new instance of the map, be it a default Leaflet map\n * or a Wrld3D one.\n *\n * @param options\n * @returns {MapRenderer}\n */\nMapRenderer3d.prototype.createInstance = function createInstance (options) {\n    Object.assign(options, {}, options)\n\n    this.instance = L.Wrld.map(this.selector, this.wrld3dApiKey, {\n        indoorsEnabled: true,\n    })\n\n    // Add the indoor control widget. It's used to navigate in the\n    // indoor buildings provided by WRLD 3D maps.\n    new WrldIndoorControl(this.selector + '_widget', this.instance)\n\n    // Add the marker controller. It's used to show every\n    // Point of Interest on the WRLD 3D map.\n    this.markerController = new WrldMarkerController(this.instance)\n\n    // Initialize the POI API. It's used to create, edit and remove\n    // Points of Interest for every entry marker added in the\n    // entry's editing form.\n    this.poiApi = new WrldPoiApi(this.wrld3dApiKey)\n\n    this.center()\n    return this\n};\n\nMapRenderer3d.prototype.setLatLng = function setLatLng (lat, lng) {\n    this.lat = parseFloat(lat)\n    this.lng = parseFloat(lng)\n\n    return this\n};\n\nMapRenderer3d.prototype.loadMarkers = function loadMarkers (markers, options) {\n        var this$1 = this;\n\n    options = Object.assign({}, {\n        merge: false,\n        popup: true,\n        tooltip: true,\n    }, options)\n\n    if (!options.merge) {\n        this.removeMarkers()\n    }\n\n    markers.forEach(function (mk) {\n        if (mk.poi) {\n            this$1.addMapMarker(mk.poi, options)\n        }\n    })\n\n    return this\n};\n\n/**\n * Item properties:\n *  - id\n *  - indoor_id\n *  - floor_id\n *  - lat\n *  - lon\n *  - title\n *  - subtitle\n *  - user_data\n *- natural_post_type\n *- image_url\n *- author_name\n *- url\n *- exchange_types\n *\n * @param item\n * @param options\n */\nMapRenderer3d.prototype.addMapMarker = function addMapMarker (item, options) {\n    var markerOpts = {\n        iconKey: 'pin',\n    }\n\n    if (item.indoor) {\n        markerOpts.isIndoor = true\n        markerOpts.indoorId = item.indoor_id\n        markerOpts.floorIndex = parseInt(item.floor_id)\n    }\n\n    var id = item.id || (+new Date * Math.random() + 1).toString(36).substring(2, 10)\n    var marker = this.markerController.addMarker(id, [item.lat, item.lon], markerOpts)\n\n    // Add a tooltip to the marker\n    if (options.tooltip) {\n        marker.bindTooltip(item.user_data.author_name + ' ' + item.user_data.natural_post_type + ' <b>' + item.title + '</b>', { permanent: false })\n    }\n\n    // Add a popup with marker's information\n    if (options.popup) {\n        var popup = L.DomUtil.create('div', 'map-popup')\n\n        var image = (item.user_data.hasOwnProperty('image_url') && item.user_data.image_url)\n            ? (\"<a href=\\\"\" + (item.user_data.url) + \"\\\"><img src=\\\"\" + (item.user_data.image_url) + \"\\\" class=\\\"entry_image\\\"></a>\")\n            : ''\n\n        popup.innerHTML = '<div>' + image + '</div><a href=\"' + item.user_data.url + '\" class=\"map-popup-link\">' + item.user_data.author_name + ' ' + item.user_data.natural_post_type + ' <b>' + item.title + '</b></a><p><em>' + item.user_data.exchange_types + '</em></p>'\n\n        marker.bindPopup(popup)\n    }\n\n    this.markers.push(marker)\n    return this\n};\n\nMapRenderer3d.prototype.removeMarkers = function removeMarkers () {\n        var this$1 = this;\n\n    this.markers.forEach(function (m) {\n        this$1.markerController.removeMarker(m.id)\n    })\n\n    this.markers = []\n};\n\nMapRenderer3d.prototype.precache = function precache (location) {\n    this.instance.precache(location, 1000, function () {\n        console.log('Wrld3D caching OK.')\n    })\n};\n\nMapRenderer3d.prototype.centerAt = function centerAt (entry) {\n    this.instance.setView([entry.lat, entry.lon], 18)\n    this.precache([entry.lat, entry.lon])\n};\n\nMapRenderer3d.prototype.enterBuilding = function enterBuilding (indoorId, floor) {\n    if (!indoorId) {\n        return\n    }\n\n    this.instance.indoors.enter(indoorId)\n    this.instance.indoors.setFloor(floor)\n};\n\nMapRenderer3d.prototype.center = function center () {\n    if (this.lat && this.lng) {\n        this.instance.setView([this.lat, this.lng], 18)\n        return this\n    }\n\n    var points = []\n\n    this.markers.forEach(function (mk) {\n        points.push([mk.getLatLng().lat, mk.getLatLng().lng])\n    })\n\n    if (points.length === 0) {\n        return this\n    }\n\n    this.instance.fitBounds(points)\n    this.precache(this.instance.getCenter())\n    return this\n};//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21hcHMzZC5qcz9kMWNmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXBSZW5kZXJlcjNkIHtcbiAgICBjb25zdHJ1Y3RvciAoc2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJzNkJ1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgdGhpcy53cmxkM2RBcGlLZXkgPSB3aW5kb3cuV1JMRF8zRF9BUElfS0VZXG4gICAgICAgIHRoaXMubWFwYm94S2V5ID0gd2luZG93Lk1BUEJPWF9LRVlcbiAgICAgICAgdGhpcy5tYXJrZXJzID0gW11cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGxcbiAgICAgICAgdGhpcy5wb2lBcGkgPSBudWxsXG4gICAgICAgIHRoaXMubWFya2VyQ29udHJvbGxlciA9IG51bGxcbiAgICAgICAgdGhpcy5sYXQgPSBvcHRpb25zLmxhdCB8fCBudWxsXG4gICAgICAgIHRoaXMubG5nID0gb3B0aW9ucy5sbmcgfHwgbnVsbFxuXG4gICAgICAgIGlmICh0aGlzLndybGQzZEFwaUtleSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnN0YW5jZShvcHRpb25zKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgbWFwLCBiZSBpdCBhIGRlZmF1bHQgTGVhZmxldCBtYXBcbiAgICAgKiBvciBhIFdybGQzRCBvbmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtNYXBSZW5kZXJlcn1cbiAgICAgKi9cbiAgICBjcmVhdGVJbnN0YW5jZSAob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHt9LCBvcHRpb25zKVxuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBMLldybGQubWFwKHRoaXMuc2VsZWN0b3IsIHRoaXMud3JsZDNkQXBpS2V5LCB7XG4gICAgICAgICAgICBpbmRvb3JzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBBZGQgdGhlIGluZG9vciBjb250cm9sIHdpZGdldC4gSXQncyB1c2VkIHRvIG5hdmlnYXRlIGluIHRoZVxuICAgICAgICAvLyBpbmRvb3IgYnVpbGRpbmdzIHByb3ZpZGVkIGJ5IFdSTEQgM0QgbWFwcy5cbiAgICAgICAgbmV3IFdybGRJbmRvb3JDb250cm9sKHRoaXMuc2VsZWN0b3IgKyAnX3dpZGdldCcsIHRoaXMuaW5zdGFuY2UpXG5cbiAgICAgICAgLy8gQWRkIHRoZSBtYXJrZXIgY29udHJvbGxlci4gSXQncyB1c2VkIHRvIHNob3cgZXZlcnlcbiAgICAgICAgLy8gUG9pbnQgb2YgSW50ZXJlc3Qgb24gdGhlIFdSTEQgM0QgbWFwLlxuICAgICAgICB0aGlzLm1hcmtlckNvbnRyb2xsZXIgPSBuZXcgV3JsZE1hcmtlckNvbnRyb2xsZXIodGhpcy5pbnN0YW5jZSlcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBQT0kgQVBJLiBJdCdzIHVzZWQgdG8gY3JlYXRlLCBlZGl0IGFuZCByZW1vdmVcbiAgICAgICAgLy8gUG9pbnRzIG9mIEludGVyZXN0IGZvciBldmVyeSBlbnRyeSBtYXJrZXIgYWRkZWQgaW4gdGhlXG4gICAgICAgIC8vIGVudHJ5J3MgZWRpdGluZyBmb3JtLlxuICAgICAgICB0aGlzLnBvaUFwaSA9IG5ldyBXcmxkUG9pQXBpKHRoaXMud3JsZDNkQXBpS2V5KVxuXG4gICAgICAgIHRoaXMuY2VudGVyKClcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBzZXRMYXRMbmcgKGxhdCwgbG5nKSB7XG4gICAgICAgIHRoaXMubGF0ID0gcGFyc2VGbG9hdChsYXQpXG4gICAgICAgIHRoaXMubG5nID0gcGFyc2VGbG9hdChsbmcpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBsb2FkTWFya2VycyAobWFya2Vycywgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgbWVyZ2U6IGZhbHNlLFxuICAgICAgICAgICAgcG9wdXA6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiB0cnVlLFxuICAgICAgICB9LCBvcHRpb25zKVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5tZXJnZSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJzKClcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlcnMuZm9yRWFjaCgobWspID0+IHtcbiAgICAgICAgICAgIGlmIChtay5wb2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1hcE1hcmtlcihtay5wb2ksIG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJdGVtIHByb3BlcnRpZXM6XG4gICAgICogIC0gaWRcbiAgICAgKiAgLSBpbmRvb3JfaWRcbiAgICAgKiAgLSBmbG9vcl9pZFxuICAgICAqICAtIGxhdFxuICAgICAqICAtIGxvblxuICAgICAqICAtIHRpdGxlXG4gICAgICogIC0gc3VidGl0bGVcbiAgICAgKiAgLSB1c2VyX2RhdGFcbiAgICAgKiAgICAtIG5hdHVyYWxfcG9zdF90eXBlXG4gICAgICogICAgLSBpbWFnZV91cmxcbiAgICAgKiAgICAtIGF1dGhvcl9uYW1lXG4gICAgICogICAgLSB1cmxcbiAgICAgKiAgICAtIGV4Y2hhbmdlX3R5cGVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgYWRkTWFwTWFya2VyIChpdGVtLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtYXJrZXJPcHRzID0ge1xuICAgICAgICAgICAgaWNvbktleTogJ3BpbicsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5pbmRvb3IpIHtcbiAgICAgICAgICAgIG1hcmtlck9wdHMuaXNJbmRvb3IgPSB0cnVlXG4gICAgICAgICAgICBtYXJrZXJPcHRzLmluZG9vcklkID0gaXRlbS5pbmRvb3JfaWRcbiAgICAgICAgICAgIG1hcmtlck9wdHMuZmxvb3JJbmRleCA9IHBhcnNlSW50KGl0ZW0uZmxvb3JfaWQpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZCA9IGl0ZW0uaWQgfHwgKCtuZXcgRGF0ZSAqIE1hdGgucmFuZG9tKCkgKyAxKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDEwKVxuICAgICAgICBjb25zdCBtYXJrZXIgPSB0aGlzLm1hcmtlckNvbnRyb2xsZXIuYWRkTWFya2VyKGlkLCBbaXRlbS5sYXQsIGl0ZW0ubG9uXSwgbWFya2VyT3B0cylcblxuICAgICAgICAvLyBBZGQgYSB0b29sdGlwIHRvIHRoZSBtYXJrZXJcbiAgICAgICAgaWYgKG9wdGlvbnMudG9vbHRpcCkge1xuICAgICAgICAgICAgbWFya2VyLmJpbmRUb29sdGlwKGl0ZW0udXNlcl9kYXRhLmF1dGhvcl9uYW1lICsgJyAnICsgaXRlbS51c2VyX2RhdGEubmF0dXJhbF9wb3N0X3R5cGUgKyAnIDxiPicgKyBpdGVtLnRpdGxlICsgJzwvYj4nLCB7IHBlcm1hbmVudDogZmFsc2UgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhIHBvcHVwIHdpdGggbWFya2VyJ3MgaW5mb3JtYXRpb25cbiAgICAgICAgaWYgKG9wdGlvbnMucG9wdXApIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ21hcC1wb3B1cCcpXG5cbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gKGl0ZW0udXNlcl9kYXRhLmhhc093blByb3BlcnR5KCdpbWFnZV91cmwnKSAmJiBpdGVtLnVzZXJfZGF0YS5pbWFnZV91cmwpXG4gICAgICAgICAgICAgICAgPyBgPGEgaHJlZj1cIiR7aXRlbS51c2VyX2RhdGEudXJsfVwiPjxpbWcgc3JjPVwiJHtpdGVtLnVzZXJfZGF0YS5pbWFnZV91cmx9XCIgY2xhc3M9XCJlbnRyeV9pbWFnZVwiPjwvYT5gXG4gICAgICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgICBwb3B1cC5pbm5lckhUTUwgPSAnPGRpdj4nICsgaW1hZ2UgKyAnPC9kaXY+PGEgaHJlZj1cIicgKyBpdGVtLnVzZXJfZGF0YS51cmwgKyAnXCIgY2xhc3M9XCJtYXAtcG9wdXAtbGlua1wiPicgKyBpdGVtLnVzZXJfZGF0YS5hdXRob3JfbmFtZSArICcgJyArIGl0ZW0udXNlcl9kYXRhLm5hdHVyYWxfcG9zdF90eXBlICsgJyA8Yj4nICsgaXRlbS50aXRsZSArICc8L2I+PC9hPjxwPjxlbT4nICsgaXRlbS51c2VyX2RhdGEuZXhjaGFuZ2VfdHlwZXMgKyAnPC9lbT48L3A+J1xuXG4gICAgICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHJlbW92ZU1hcmtlcnMgKCkge1xuICAgICAgICB0aGlzLm1hcmtlcnMuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJDb250cm9sbGVyLnJlbW92ZU1hcmtlcihtLmlkKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMubWFya2VycyA9IFtdXG4gICAgfVxuXG4gICAgcHJlY2FjaGUgKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UucHJlY2FjaGUobG9jYXRpb24sIDEwMDAsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXcmxkM0QgY2FjaGluZyBPSy4nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNlbnRlckF0IChlbnRyeSkge1xuICAgICAgICB0aGlzLmluc3RhbmNlLnNldFZpZXcoW2VudHJ5LmxhdCwgZW50cnkubG9uXSwgMTgpXG4gICAgICAgIHRoaXMucHJlY2FjaGUoW2VudHJ5LmxhdCwgZW50cnkubG9uXSlcbiAgICB9XG5cbiAgICBlbnRlckJ1aWxkaW5nIChpbmRvb3JJZCwgZmxvb3IpIHtcbiAgICAgICAgaWYgKCFpbmRvb3JJZCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RhbmNlLmluZG9vcnMuZW50ZXIoaW5kb29ySWQpXG4gICAgICAgIHRoaXMuaW5zdGFuY2UuaW5kb29ycy5zZXRGbG9vcihmbG9vcilcbiAgICB9XG5cbiAgICBjZW50ZXIgKCkge1xuICAgICAgICBpZiAodGhpcy5sYXQgJiYgdGhpcy5sbmcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2Uuc2V0VmlldyhbdGhpcy5sYXQsIHRoaXMubG5nXSwgMTgpXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvaW50cyA9IFtdXG5cbiAgICAgICAgdGhpcy5tYXJrZXJzLmZvckVhY2goKG1rKSA9PiB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChbbWsuZ2V0TGF0TG5nKCkubGF0LCBtay5nZXRMYXRMbmcoKS5sbmddKVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZS5maXRCb3VuZHMocG9pbnRzKVxuICAgICAgICB0aGlzLnByZWNhY2hlKHRoaXMuaW5zdGFuY2UuZ2V0Q2VudGVyKCkpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL21hcHMzZC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maps3d__ = __webpack_require__(1);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__maps2d__ = __webpack_require__(0);\n\n\n\n/**\n * Prepare an indoors object.\n *\n * @param entry\n * @returns {{id: null, floor: null}}\n */\nfunction prepareEntryIndoors (entry) {\n    if (!entry.indoors) {\n        return {\n            id: null,\n            floor: null,\n        }\n    }\n\n    return indoors = {\n        id: entry.indoors.id || null,\n        floor: entry.indoors.floor || null,\n    }\n}\n\n/**\n * Handle the map viewing.\n *\n * @param map\n * @param entry\n */\nfunction handleViewing (map, entry) {\n    if (map.type === '3d' && entry.indoor) {\n        map.instance.indoors.on('indoorentranceadd', function () {\n            map.centerAt(entry)\n            map.enterBuilding(entry.indoor_id, entry.floor_id)\n        })\n\n        map.instance.indoors.on('indoormapenter', function () {\n            map.addMapMarker(entry, { popup: false, tooltip: false })\n        })\n\n        return\n    }\n\n    if (entry.lat && entry.lon) {\n        map.centerAt(entry)\n        map.addMapMarker(entry, { popup: false, tooltip: false })\n    }\n}\n\n/**\n * Handle the marker editing feature.\n *\n * @param map\n * @param entry\n */\nfunction handleEditing (map, entry) {\n    /*\n     * When the user does a double click on the map,\n     *we update the entry's geolocation.\n     */\n    map.instance.on('dblclick', function (ev) {\n        /*\n         * Set some required data for the entry.\n         */\n        entry.location = ''\n        entry.lat = ev.latlng.lat\n        entry.lon = ev.latlng.lng\n\n        $('#location').val(entry.location)\n        $('#location_lat').val(entry.lat)\n        $('#location_lng').val(entry.lon)\n\n        /*\n         * Set up some indoor map stuff if the map is a 3D one.\n         */\n        if (map.type === '3d') {\n            var indoor = map.instance.indoors.getActiveIndoorMap()\n            var floor = map.instance.indoors.getFloor()\n\n            /*\n             * We can have a lot of entries already added before\n             * the Map stuff is added, so we have to ensure that\n             * the entry has the need indoors data.\n             */\n            prepareEntryIndoors(entry)\n\n            entry.indoor = indoor\n            entry.indoor_id = indoor === null ? '' : indoor.getIndoorMapId()\n            entry.floor_id = indoor === null ? '' : floor.getFloorIndex()\n\n            $('#indoors_id').val(entry.indoor_id)\n            $('#indoors_floor').val(entry.floor_id)\n        }\n\n        /*\n         * Clean up the existent marker and add up the new one.\n         */\n        map.removeMarkers()\n\n        map.addMapMarker(entry, { popup: false, tooltip: false })\n    })\n}\n\n/**\n * Initialize the entry map in the frontend site.\n *\n * @param entry\n * @param community\n */\nwindow.initializeEntryMap = function (entry, community, options) {\n    if (!community) {\n        return\n    }\n\n    /*\n     * Instantiate the map renderer\n     */\n    var mapOptions = {\n        loadPois: false,\n        lat: parseFloat(community.lat),\n        lng: parseFloat(community.lng),\n    }\n\n    var map = (community.wrld3d && community.wrld3d.api_key)\n        ? new __WEBPACK_IMPORTED_MODULE_0__maps3d__[\"a\" /* MapRenderer3d */]('entry_browse_map', mapOptions)\n        : new __WEBPACK_IMPORTED_MODULE_1__maps2d__[\"a\" /* MapRenderer2d */]('entry_browse_map', mapOptions)\n\n    /*\n     * Set some required data for the entry.\n     */\n    entry.lon = entry.lng\n    entry.indoor = (entry.wrld3d && entry.wrld3d.indoor_id)\n    entry.indoor_id = entry.wrld3d ? entry.wrld3d.indoor_id : null\n    entry.floor_id = entry.wrld3d ? entry.wrld3d.indoor_floor : null\n\n    entry.user_data = {\n        description: entry.description,\n        image_url: entry.image_url,\n        author_name: entry.display_name,\n        natural_post_type: entry.natural_post_type,\n        exchanges_types: entry.exchangesTypes,\n        url: entry.url,\n    }\n\n    handleViewing(map, entry)\n\n    /*\n     * Enables the market editing when it's requested.\n     */\n    if (options.editable) {\n        handleEditing(map, entry)\n    }\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL21hcHMtZW50cnkuanM/ZjkwMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXBSZW5kZXJlcjNkIH0gZnJvbSAnLi9tYXBzM2QnXG5pbXBvcnQgeyBNYXBSZW5kZXJlcjJkIH0gZnJvbSAnLi9tYXBzMmQnXG5cbi8qKlxuICogUHJlcGFyZSBhbiBpbmRvb3JzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gZW50cnlcbiAqIEByZXR1cm5zIHt7aWQ6IG51bGwsIGZsb29yOiBudWxsfX1cbiAqL1xuZnVuY3Rpb24gcHJlcGFyZUVudHJ5SW5kb29ycyAoZW50cnkpIHtcbiAgICBpZiAoIWVudHJ5LmluZG9vcnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgZmxvb3I6IG51bGwsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kb29ycyA9IHtcbiAgICAgICAgaWQ6IGVudHJ5LmluZG9vcnMuaWQgfHwgbnVsbCxcbiAgICAgICAgZmxvb3I6IGVudHJ5LmluZG9vcnMuZmxvb3IgfHwgbnVsbCxcbiAgICB9XG59XG5cbi8qKlxuICogSGFuZGxlIHRoZSBtYXAgdmlld2luZy5cbiAqXG4gKiBAcGFyYW0gbWFwXG4gKiBAcGFyYW0gZW50cnlcbiAqL1xuZnVuY3Rpb24gaGFuZGxlVmlld2luZyAobWFwLCBlbnRyeSkge1xuICAgIGlmIChtYXAudHlwZSA9PT0gJzNkJyAmJiBlbnRyeS5pbmRvb3IpIHtcbiAgICAgICAgbWFwLmluc3RhbmNlLmluZG9vcnMub24oJ2luZG9vcmVudHJhbmNlYWRkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbWFwLmNlbnRlckF0KGVudHJ5KVxuICAgICAgICAgICAgbWFwLmVudGVyQnVpbGRpbmcoZW50cnkuaW5kb29yX2lkLCBlbnRyeS5mbG9vcl9pZClcbiAgICAgICAgfSlcblxuICAgICAgICBtYXAuaW5zdGFuY2UuaW5kb29ycy5vbignaW5kb29ybWFwZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBtYXAuYWRkTWFwTWFya2VyKGVudHJ5LCB7IHBvcHVwOiBmYWxzZSwgdG9vbHRpcDogZmFsc2UgfSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoZW50cnkubGF0ICYmIGVudHJ5Lmxvbikge1xuICAgICAgICBtYXAuY2VudGVyQXQoZW50cnkpXG4gICAgICAgIG1hcC5hZGRNYXBNYXJrZXIoZW50cnksIHsgcG9wdXA6IGZhbHNlLCB0b29sdGlwOiBmYWxzZSB9KVxuICAgIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgdGhlIG1hcmtlciBlZGl0aW5nIGZlYXR1cmUuXG4gKlxuICogQHBhcmFtIG1hcFxuICogQHBhcmFtIGVudHJ5XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUVkaXRpbmcgKG1hcCwgZW50cnkpIHtcbiAgICAvKlxuICAgICAqIFdoZW4gdGhlIHVzZXIgZG9lcyBhIGRvdWJsZSBjbGljayBvbiB0aGUgbWFwLFxuICAgICAqd2UgdXBkYXRlIHRoZSBlbnRyeSdzIGdlb2xvY2F0aW9uLlxuICAgICAqL1xuICAgIG1hcC5pbnN0YW5jZS5vbignZGJsY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgLypcbiAgICAgICAgICogU2V0IHNvbWUgcmVxdWlyZWQgZGF0YSBmb3IgdGhlIGVudHJ5LlxuICAgICAgICAgKi9cbiAgICAgICAgZW50cnkubG9jYXRpb24gPSAnJ1xuICAgICAgICBlbnRyeS5sYXQgPSBldi5sYXRsbmcubGF0XG4gICAgICAgIGVudHJ5LmxvbiA9IGV2LmxhdGxuZy5sbmdcblxuICAgICAgICAkKCcjbG9jYXRpb24nKS52YWwoZW50cnkubG9jYXRpb24pXG4gICAgICAgICQoJyNsb2NhdGlvbl9sYXQnKS52YWwoZW50cnkubGF0KVxuICAgICAgICAkKCcjbG9jYXRpb25fbG5nJykudmFsKGVudHJ5LmxvbilcblxuICAgICAgICAvKlxuICAgICAgICAgKiBTZXQgdXAgc29tZSBpbmRvb3IgbWFwIHN0dWZmIGlmIHRoZSBtYXAgaXMgYSAzRCBvbmUuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAobWFwLnR5cGUgPT09ICczZCcpIHtcbiAgICAgICAgICAgIHZhciBpbmRvb3IgPSBtYXAuaW5zdGFuY2UuaW5kb29ycy5nZXRBY3RpdmVJbmRvb3JNYXAoKVxuICAgICAgICAgICAgdmFyIGZsb29yID0gbWFwLmluc3RhbmNlLmluZG9vcnMuZ2V0Rmxvb3IoKVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogV2UgY2FuIGhhdmUgYSBsb3Qgb2YgZW50cmllcyBhbHJlYWR5IGFkZGVkIGJlZm9yZVxuICAgICAgICAgICAgICogdGhlIE1hcCBzdHVmZiBpcyBhZGRlZCwgc28gd2UgaGF2ZSB0byBlbnN1cmUgdGhhdFxuICAgICAgICAgICAgICogdGhlIGVudHJ5IGhhcyB0aGUgbmVlZCBpbmRvb3JzIGRhdGEuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHByZXBhcmVFbnRyeUluZG9vcnMoZW50cnkpXG5cbiAgICAgICAgICAgIGVudHJ5LmluZG9vciA9IGluZG9vclxuICAgICAgICAgICAgZW50cnkuaW5kb29yX2lkID0gaW5kb29yID09PSBudWxsID8gJycgOiBpbmRvb3IuZ2V0SW5kb29yTWFwSWQoKVxuICAgICAgICAgICAgZW50cnkuZmxvb3JfaWQgPSBpbmRvb3IgPT09IG51bGwgPyAnJyA6IGZsb29yLmdldEZsb29ySW5kZXgoKVxuXG4gICAgICAgICAgICAkKCcjaW5kb29yc19pZCcpLnZhbChlbnRyeS5pbmRvb3JfaWQpXG4gICAgICAgICAgICAkKCcjaW5kb29yc19mbG9vcicpLnZhbChlbnRyeS5mbG9vcl9pZClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAqIENsZWFuIHVwIHRoZSBleGlzdGVudCBtYXJrZXIgYW5kIGFkZCB1cCB0aGUgbmV3IG9uZS5cbiAgICAgICAgICovXG4gICAgICAgIG1hcC5yZW1vdmVNYXJrZXJzKClcblxuICAgICAgICBtYXAuYWRkTWFwTWFya2VyKGVudHJ5LCB7IHBvcHVwOiBmYWxzZSwgdG9vbHRpcDogZmFsc2UgfSlcbiAgICB9KVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGVudHJ5IG1hcCBpbiB0aGUgZnJvbnRlbmQgc2l0ZS5cbiAqXG4gKiBAcGFyYW0gZW50cnlcbiAqIEBwYXJhbSBjb21tdW5pdHlcbiAqL1xud2luZG93LmluaXRpYWxpemVFbnRyeU1hcCA9IGZ1bmN0aW9uIChlbnRyeSwgY29tbXVuaXR5LCBvcHRpb25zKSB7XG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBJbnN0YW50aWF0ZSB0aGUgbWFwIHJlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3QgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgbG9hZFBvaXM6IGZhbHNlLFxuICAgICAgICBsYXQ6IHBhcnNlRmxvYXQoY29tbXVuaXR5LmxhdCksXG4gICAgICAgIGxuZzogcGFyc2VGbG9hdChjb21tdW5pdHkubG5nKSxcbiAgICB9XG5cbiAgICBjb25zdCBtYXAgPSAoY29tbXVuaXR5LndybGQzZCAmJiBjb21tdW5pdHkud3JsZDNkLmFwaV9rZXkpXG4gICAgICAgID8gbmV3IE1hcFJlbmRlcmVyM2QoJ2VudHJ5X2Jyb3dzZV9tYXAnLCBtYXBPcHRpb25zKVxuICAgICAgICA6IG5ldyBNYXBSZW5kZXJlcjJkKCdlbnRyeV9icm93c2VfbWFwJywgbWFwT3B0aW9ucylcblxuICAgIC8qXG4gICAgICogU2V0IHNvbWUgcmVxdWlyZWQgZGF0YSBmb3IgdGhlIGVudHJ5LlxuICAgICAqL1xuICAgIGVudHJ5LmxvbiA9IGVudHJ5LmxuZ1xuICAgIGVudHJ5LmluZG9vciA9IChlbnRyeS53cmxkM2QgJiYgZW50cnkud3JsZDNkLmluZG9vcl9pZClcbiAgICBlbnRyeS5pbmRvb3JfaWQgPSBlbnRyeS53cmxkM2QgPyBlbnRyeS53cmxkM2QuaW5kb29yX2lkIDogbnVsbFxuICAgIGVudHJ5LmZsb29yX2lkID0gZW50cnkud3JsZDNkID8gZW50cnkud3JsZDNkLmluZG9vcl9mbG9vciA6IG51bGxcblxuICAgIGVudHJ5LnVzZXJfZGF0YSA9IHtcbiAgICAgICAgZGVzY3JpcHRpb246IGVudHJ5LmRlc2NyaXB0aW9uLFxuICAgICAgICBpbWFnZV91cmw6IGVudHJ5LmltYWdlX3VybCxcbiAgICAgICAgYXV0aG9yX25hbWU6IGVudHJ5LmRpc3BsYXlfbmFtZSxcbiAgICAgICAgbmF0dXJhbF9wb3N0X3R5cGU6IGVudHJ5Lm5hdHVyYWxfcG9zdF90eXBlLFxuICAgICAgICBleGNoYW5nZXNfdHlwZXM6IGVudHJ5LmV4Y2hhbmdlc1R5cGVzLFxuICAgICAgICB1cmw6IGVudHJ5LnVybCxcbiAgICB9XG5cbiAgICBoYW5kbGVWaWV3aW5nKG1hcCwgZW50cnkpXG5cbiAgICAvKlxuICAgICAqIEVuYWJsZXMgdGhlIG1hcmtldCBlZGl0aW5nIHdoZW4gaXQncyByZXF1ZXN0ZWQuXG4gICAgICovXG4gICAgaWYgKG9wdGlvbnMuZWRpdGFibGUpIHtcbiAgICAgICAgaGFuZGxlRWRpdGluZyhtYXAsIGVudHJ5KVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9tYXBzLWVudHJ5LmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BOzs7OztBQUtBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);