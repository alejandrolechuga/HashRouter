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
    for (var i = 0 ; i < length; i++) {
      //console.log(routes[i]);
      if (routes[i].regexp.test(url)) {
        m = routes[i].regexp.exec(url);
        routes[i].callback.apply(routes[i], m.slice(1, m.length));
      }
    }
  };
  window.hrouter = hrouter;
}(this));