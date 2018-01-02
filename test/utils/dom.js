var jsdom = require('jsdom');

// setup the simplest global.document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the global.document
var win = doc.defaultView;

// set globals for mocha that make access to global.document and window feel
// natural in the test environment
global.document = doc;
global.window = win;
global.HTMLElement = win.HTMLElement;

// JSDOM doesn't support localStrage by default, so lets just fake it..
if (!global.localStorage) {
  global.localStorage = {
    getItem: function () { return '{}'; },
    setItem: function () {}
  };
}

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}
