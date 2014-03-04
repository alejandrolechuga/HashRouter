HashRouter.js
=========
Simple hash routing library, doesn't require any dependency. It routes strings after the symbol "#".
<h3>Routing</h3>
<strong>url</strong>  : http://localhost/index.html#home
```javascript
hrouter("home", function () {
  $('#text').html("Home ! ");
});
```
<h3>Parameters</h3>
<strong>url</strong>  : http://localhost/index.html#home/1
```javascript
hrouter("home/:page", function (page) {
  $('#text').html("Home page #" + page);
});
```

<h3>Fragments</h3>
<strong>url</strong> : http://localhost/index.html#greetings/page1
```javascript
hrouter("greetings/page:number", function(number) {
  $('#text').html("Home page # " + number);
});
```

<h3>Multiple Parameters</h3>
<strong>url</strong> : http://localhost/index.html#greetings/page1/contact
```javascript
hrouter("greetings/page:number/:section", function(number, section) {
  $('#text').html("Home page # " + number + " section " + section);
});
```

<h3>Wildcard</h3>
<strong>url</strong>  : http://localhost/index.html#search/zombies-without-eyes
```javascript
hrouter("search/*",function (search) {
  $('#text').html(" Find this text *" + search + "*");
});

```
<h3>Optional</h3>
<strong>url</strong> : http://localhost/index.html#user
<strong>url</strong> : http://localhost/index.html#user/12
```javascript
hrouter("user/:id?", function (id) {
  if (id) {
    $('#text').html("Alejandro's id is" + id);
  } else {
    $('#text').html("User not found");
  } 
}, function (id) {
  if (id) {
    document.title = "Alejandro's Profile";
  } else {
    document.title = "Unknown Profile";
  }
});

```
<h3>Dispatch current hash</h3>
```javascript
hrouter();
```
<h3>Dispatch</h3>
```javascript
hrouter("user/1");
```
<h3>Break next matches </h3>
```javascript
hrouter("home/:page", function (page) {
  $('#text').html("Home page #" + page);
  return false;
});
hrouter("home/:page", function (page) {
  $('#text').html("Home page = " + page);
});
```
