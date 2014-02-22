<h2>HashRouter.js</h2>
```javascript
hrouter("home", function () {
  $('#text').html("Home ! ")
});
```
```javascript
hrouter("home/:page", function (page) {
  $('#text').html("Home page #" + page);
});
```
```javascript
hrouter("greetings/page:number", function(number) {
  $('#text').html("Home page # " + number);
});
```

```javascript
hrouter("greetings/page:number/:section", function(number, section) {
  $('#text').html("Home page # " + number + " section " + section);
});
```

```javascript
hrouter("search/*",function (search) {
  $('#text').html(" Find this text *" + search + "*");
});
```

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