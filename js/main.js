// /loading////

$(document).ready(function(){

  $(".Loadding").fadeOut(6000, function(){
      $("body").css({"overflow":"auto"})
  })
 
})












//api Weather------------------


let today=document.getElementById("today")
    month=document.getElementById("month")
    loca=document.getElementById("loca")
    locatime=document.getElementById("locatime")
    degree=document.getElementById("degree")
    clearSunny=document.getElementById("clear-sunny")
    todayIcon=document.getElementById("todayIcon")
    rain=document.getElementById("rain")
    windKph=document.getElementById("windKph")
  let  searchBar=document.getElementById("search-bar")
    // ////////////////////////////////////////



// ////////////////nextDay///////////////////////////
  var nextDays=document.getElementsByClassName("nextDays")
  var nextDayIcon=document.getElementsByClassName("nextDayIcon")
  var maxDegree=document.getElementsByClassName("max-degree")
  var minDegree=document.getElementsByClassName("min-degree")
  var description=document.getElementsByClassName("description")













monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
 ];

let apiResponce;
let recipeApi
var currentCity="cairo"

async function weatherResponce(currentCity="cairo"){
 apiResponce=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
  recipeApi=await apiResponce.json()
  console.log(recipeApi)
  displayWeather()
  nextDay()
}


weatherResponce()



function displayWeather(){
  let date = new Date();
  today.innerHTML=days[date.getDay()]
  month.innerHTML=`${date.getDate()}${monthName[date.getMonth()]}`
  loca.innerHTML=recipeApi.location.name;
  // locatime.innerHTML=recipeApi.location.localtime;
  degree.innerHTML=recipeApi.current.temp_c;
  clearSunny.innerHTML=recipeApi.current.condition.text;
  todayIcon.setAttribute("src",`https:${recipeApi.current.condition.icon}`)
  rain.innerHTML=recipeApi.current.cloud;
  windKph.innerHTML=recipeApi.current.wind_kph;
  // compass.innerHTML=recipeApi.current.wind_dir;

}



function nextDay(){
  for(var i=0;i<nextDays.length;i++){
    nextDays[i].innerHTML=days[new Date(recipeApi.forecast.forecastday[i+1].date).getDay()]
    nextDayIcon[i].setAttribute( "src",`http:${recipeApi.forecast.forecastday[i+1].day.condition.icon}`)
    maxDegree[i].innerHTML=recipeApi.forecast.forecastday[i+1].day.maxtemp_c
    minDegree[i].innerHTML=recipeApi.forecast.forecastday[i+1].day.mintemp_c
    description[i].innerHTML=recipeApi.forecast.forecastday[i+1].day.condition.text

  }
}








 






searchBar.addEventListener("keyup",function(){
currentCity=searchBar.value;
weatherResponce(currentCity)
})

