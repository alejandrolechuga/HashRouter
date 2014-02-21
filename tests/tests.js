  // Possibilities

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
test( "p:number", function() {
  var urlpath = "p:number";
  //console.log("urlpath ", urlpath);
  var pattern = pathtoregexp(urlpath, {});
  //console.log("url to pattern", pattern);
  var matches = pattern.exec("p12");
  ok( matches[1] == 12, "Passed!" );
});