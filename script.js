document.getElementById("d2Submit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("d2Input").value;
  if (value === "")
    return;
  console.log(value);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var key = "69d2f2e52ced40e5b0e4243a02de5535";
  var platformID;
  var playerID;
  var charID;
  const url_search = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + value + "/" + "&X-API-KEY=69d2f2e52ced40e5b0e4243a02de5535";
  fetch(proxyurl+url_search)
  //const url_search = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + value + "/";
  //httpGet(url_search, key)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log("!bungo JSON");
    console.log(json);
    console.log("!END bungo JSON");
    platformID = json.Response.membershipType;
    playerID = json.Response.membershipId
    let results = "";
    //title
    results += "<img src='https://www.bungie.net" + json.Response.iconPath + "'>";
    results += "<h1>" + json.Response.displayName + "</h1>"
    //aaaaand go ahead and print that baby out
    document.getElementById("Results").innerHTML = results;
  }).catch(() => console.log("failure on search URL"));
  const url_pofile = "https://www.bungie.net/Platform/Destiny2/" + platformID + playerID + "/?components=100" + "&X-API-KEY=69d2f2e52ced40e5b0e4243a02de5535";
  fetch(proxyurl + url_pofile)
  //const url_pofile = "https://www.bungie.net/Platform/Destiny2/" + platformID + playerID + "/?components=100";
  //httpGet(url_pofile, key)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log("!profile JSON");
    console.log(json);
    console.log("!END pofile JSON");
  });
});


function httpGet(theUrl,key) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.setRequestHeader("X-API-KEY",key);
  xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xmlHttp.send( null );
  return xmlHttp.responseText;
}
