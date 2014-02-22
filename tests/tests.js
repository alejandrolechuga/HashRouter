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
// p:number
test( "p:number", function() {
  var urlpath = "p:number";
  //console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  //console.log("url to pattern", pattern);
  var matches = pattern.exec("p12");
  ok( matches[1] == 12, "Passed!" );
});
// :number
test( ":number", function() {
  var urlpath = ":number";
  var pattern = pathtoregexp(urlpath, {});
  var matches =  pattern.exec("12");
  ok( matches[1] == 12, "Passed!" );
});
//route/:number 
test( "route/:number", function() {
  var urlpath = "route/:number";
  var pattern = pathtoregexp(urlpath, {});
  var matches =  pattern.exec("route/12");
  ok( matches[1] == 12, "Passed!" );
});
// route/:number/:x
test( "route/:number/:x", function() {
  var urlpath = "route/:number/:x";
  var pattern = pathtoregexp(urlpath, {});
  var matches =  pattern.exec("route/12/1234234");
  ok( matches[1] == 12 && matches[2] == 1234234, "Passed!" );
});

// route/:number/:x?
test( "route/:number/:x?", function() {
  var urlpath = "route/:number/:x?";
  var pattern = pathtoregexp(urlpath, {});
  console.log("pattern", pattern);
  var matches = pattern.exec("route/12");
  console.log("matches", matches)
  ok( matches[1] == 12 , "Passed!" );
});

// route/:number/:x?
test( "2 route/:number/:x?", function() {
  var urlpath = "route/:number/:x?";
  var pattern = pathtoregexp(urlpath, {});
  console.log("pattern", pattern);
  var matches = pattern.exec("route/12/12134");
  console.log("matches", matches);
  ok( matches[1] == 12 &&  matches[2] == 12134 , "Passed!" );
});

// route/:number/:x?
test( "3 route/:number/:x?", function() {
  var urlpath = "route/:number/:x?";
  var pattern = pathtoregexp(urlpath, {});
  console.log("pattern", pattern);
  var matches = pattern.exec("route/12/12134/");
  console.log("matches", matches);
  ok( matches[1] == 12 &&  matches[2] == 12134 , "Passed!" );
});
// route/* 
test( "3 route/*", function() {
  var urlpath = "route/*";
  var pattern = pathtoregexp(urlpath, {});
  console.log("pattern", pattern);
  var matches = pattern.exec("route/12/12134/");
  console.log("matches", matches);
  ok( matches[1] == "12/12134/", "Passed!" );
});