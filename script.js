document.getElementById("d2Submit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("d2Input").value;
  if (value === "")
    return;
  console.log(value);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  var platformID;
  var playerID;
  var charID;
  //const url_search = "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + value + "/" + "&X-API-KEY=69d2f2e52ced40e5b0e4243a02de5535";
  //fetch(url_search)
  const url_search = proxyurl + "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + value + "/";
  var searchresults = httpGet(url_search);
  if(searchresults.Response.length == 0){
    document.getElementById("Results").innerHTML = "<h1> Player not found </h1>"
    return
  }
  platformID = searchresults.Response[0].membershipType;
  playerID = searchresults.Response[0].membershipId
  let results = "";
  //title
  results += "<h1><img src='https://www.bungie.net" + searchresults.Response[0].iconPath + "'>";
  results += searchresults.Response[0].displayName + "</h1>"
  //aaaaand go ahead and print that baby out
  document.getElementById("Results").innerHTML = results;
  // ex "https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018430425566/?components=100"
  const url_pofile = proxyurl + "https://www.bungie.net/Platform/Destiny2/" + platformID + "/Profile/" + playerID + "/?components=100";
  var profileresults = httpGet(url_pofile)
  var char1 = profileresults.Response.profile.data.characterIds[0];
  const url_char = proxyurl + "https://www.bungie.net/Platform/Destiny2/" + platformID + "/Profile/" + playerID + "/Character/" + char1 + "/?components=200"
  var char1results = httpGet(url_char)
  let results2 = "";
  //title
  //results2 += "<img src='https://www.bungie.net" + char1results.Response.character.data.emblemPath + "'>";
  results2 += "<img src='https://www.bungie.net" + char1results.Response.character.data.emblemBackgroundPath + "'>";
  results2 += "<p> Level " + char1results.Response.character.data.baseCharacterLevel + "<br>"
  results2 += "<p> Gear Level " + char1results.Response.character.data.light + " (light)<br>"
  results2 += "</p>"
  //aaaaand go ahead and print that baby out
  document.getElementById("Profile").innerHTML = results2;

});


function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.setRequestHeader("X-API-KEY", "69d2f2e52ced40e5b0e4243a02de5535");
  xmlHttp.send( null );
  console.log(xmlHttp.responseText);
  console.log("^^ httpget ^^");
  return JSON.parse(xmlHttp.responseText);
}
