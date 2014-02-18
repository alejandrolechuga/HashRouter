/**
* @todo implement hash event handler 
*/
(function(window){
  var routes = [];

  function hrouter(path, fn) {
    var length = arguments.length
      , route  = {}
      , keys = []
      , regexp = pathtoregexp(path, keys);
    route.keys = keys;
    route.regexp = regexp;
    route.callback = fn;
    routes.push(route);
  }

  function pathtoregexp(path, keys) {
    path = path
    .replace(/\//,'')
    .replace(/:(\w+)(:?)/g,function (m, key) {
      return '([^\/].*)';
    });
    return new RegExp("^(?:" + path + ")$");
  };

  function dispatch(url) {
    var length = routes.length;
    if (length < 1) return;
    for (var i = 0 ; i < length; i++) {
      //console.log(routes[i]);
      if (routes[i].regexp.test(url)) {
        m = routes[i].regexp.exec(url);
        routes[i].callback.apply(routes[i], m.slice(1, m.length));
      }
    }
  };

  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent("on" + event, function() {
        return(fn.call(elem, window.event));   
      });
    }
  }

  function trigger() {
    var hash = location.hash.replace(/#/,"");
    dispatch(hash);
  }

  addEvent('hashchange',trigger);
  trigger();

  window.hrouter = hrouter; 
}(this));