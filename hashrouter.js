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

    //if there are no arguments then we dispatch the current route
    if (arguments.length === 0) {
      trigger();
      return; 
    } else if (arguments.length === 1 && typeof path != "function") {
      trigger(String(path));
      return;
    }

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
    //console.log("REGEXP ", regexp);
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
      .replace(/\*/g, "(.*)")
      .replace(/(\/)?(\w+)?:(\w+)(\?)?/g, function (match, slash, fragment, key, optional) {
        // console.log("option", optional);
        // console.log("replace arguments ", arguments);
        var pattern;
        slash = slash || '';
        if (fragment) {
          pattern = slash + fragment + '([^\/]*)';
        } else {
          pattern = slash + '([^\/]+)';
        }
        if (optional) {
          pattern = "(?:\/([^\/]+))?";
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
      , matches
      , __break = false;
    for (var i = 0 ; i < length; i++) {
      matches = routes[i].regexp.exec(url);
      if (matches) {
        routes[i].callback;
        routes[i].callback.some(function(fn) {
          if (fn.apply(routes[i], matches.slice(1, matches.length)) === false) {
            // Breaks the iterator
            __break = true;
            return false;
          }
        });
      }
      // Breaks the next matchs 
      if (__break) {
        console.log("continue");
        break;
      }
    }

  };

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

  /**
  * @method trigger
  * @return void
  */
  function trigger(hash) {
    var hash = typeof hash == "string" ?  hash : location.hash.replace(/#/,"");
    console.log("dispatch", hash);
    dispatch(hash);
  }

  addEvent(window,'hashchange',trigger);
  window.hrouter = hrouter;
}(this));