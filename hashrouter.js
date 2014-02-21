(function(window, undefined){
  "use strict";
  var routes = [];

  /** 
  * @method hrouter
  * @param path url pattern
  * @param fn callback
  */
  function hrouter(path, fn) {
    var 
        length = arguments.length
      , route  = {}
      , keys = []
      , regexp ;

    // No path specified we assume is the root path
    if (typeof path == 'function') {
      // fn to function 
      fn = path;
      // path to root
      path = '';
    }
    // For multiple callbacks
    fn = [];
    for (var i = 0 ; i < length; i++) {
      if (typeof arguments[i] == 'function') {
        fn.push(arguments[i]);
      }
    }

    regexp = pathtoregexp(path, keys);
    console.log("REGEXP ", regexp);
    route.keys = keys;
    route.regexp = regexp;
    route.callback = fn;
    routes.push(route);
  }

  /**
  * @method pathtoregexp
  * @param path url route pattern
  * @param keys reference to the url paceholders
  * @retun RegExp
  */
  function pathtoregexp(path, keys) {

    path = path
      .replace(/(\/)?$/,"")
      .replace(/(?:\()?(\/)?(\w+)?:(\w+)(\))?/g, function (match, slash, fragment, key, optional) {
        // console.log("option", optional);
        // console.log("replace arguments ", arguments);
        var pattern;
        slash = slash || '';
        if (fragment) {
          pattern = slash + fragment + '([^\/].*)';
        } else {
          pattern = slash + '([^\/].*)';
        }
        if (optional) {
          pattern = "(?:\/([^\/].*))?";
        } 
        return pattern;
    });
    return new RegExp("^" + path + "\/?$");
  };
  
  /**
  * @method dispatch
  * @params url 
  * @return void
  */
  function dispatch(url) {
    var 
        length = routes.length
      , matches;
    for (var i = 0 ; i < length; i++) {
      matches = routes[i].regexp.exec(url);
      if (matches) {
        routes[i].callback;
        routes[i].callback.some(function(fn) {
          fn.apply(routes[i], matches.slice(1, matches.length));
        });
      }
    }
  };
  // Possibilities
  var urlpath = "p:number";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches = pattern.exec("p12");
  console.log("matches ", matches);
  console.log(matches[1] == 12);
  console.log("---------");
  var urlpath = ":number";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches =  pattern.exec("12");
  console.log("matches ", matches);
  console.log(matches[1] == 12);
  console.log("---------");
  var urlpath = "route/:number";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches =  pattern.exec("route/12");
  console.log("matches ", matches);
  console.log(matches[1] == 12);
  console.log("---------");
  var urlpath = "route/:number/:x";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches =  pattern.exec("route/12/1234234");
  console.log("matches ", matches);
  console.log(matches[1] == 12,matches[2] == 1234234);
  console.log("---------");
  var urlpath = "route/:number/:x";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches =  pattern.exec("route/12/1234234");
  console.log("matches ", matches);
  console.log(matches[1] == 12,matches[2] == 1234234);
  console.log("---------");
  var urlpath = "route/:number(/:x)";
  console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  console.log("url to pattern", pattern);
  var matches = pattern.exec("route/12");
  console.log("matches ", matches);
  console.log(matches[1] = 12);
  var matches = pattern.exec("route/12/12134");
  console.log("matches ", matches);
  console.log(matches[1] == 12, matches[2] == 12134);

  /**
  * @method addEvent
  * @param elem DOMElement
  */ 
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent("on" + event, function() {
        return(fn.call(elem, window.event));   
      });
    }
  }
  // Tests 

  /**
  * @method trigger
  * @return void
  */
  function trigger() {
    var hash = location.hash.replace(/#/,"");
    dispatch(hash);
  }

  addEvent(window,'hashchange',trigger);
  hrouter.trigger = trigger;
  window.hrouter = hrouter; 
}(this));