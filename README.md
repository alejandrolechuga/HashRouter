<h2>HashRouter.js</h2>
Simple hash routing library, doesn't require any dependencie. 
<h3>Routing</h3>
```javascript
hrouter("home", function () {
  $('#text').html("Home ! ");
});
```
<h3>Parameters</h3>
```javascript
hrouter("home/:page", function (page) {
  $('#text').html("Home page #" + page);
});
```
<h3>Fragments</h3>
```javascript
hrouter("greetings/page:number", function(number) {
  $('#text').html("Home page # " + number);
});
```
<h3>Multiple Parameters</h3>
```javascript
hrouter("greetings/page:number/:section", function(number, section) {
  $('#text').html("Home page # " + number + " section " + section);
});
```
<h3>Wildcard</h3>
```javascript
hrouter("search/*",function (search) {
  $('#text').html(" Find this text *" + search + "*");
});
```
<h3>Optional</h3>
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