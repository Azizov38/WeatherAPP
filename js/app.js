const dayWeather = document.querySelectorAll('.day');
const days = new Date().getDay();
const date = new Date().getDate();
const monthToday = new Date().getMonth();
const dateToday = document.querySelector('.date');
const months = ['Yanvar','Fevral','Mart','Aperl','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
const weekDay = ['Bazar','Bazar E','Çərşənbə A','Çərşənbə','Cümə A','Cümə','Şənbə',];
setInterval(()=>{
    dateToday.innerHTML = weekDay[days]+', '+date+' '+months[monthToday]+"  |  Qusar/Azerbaycan";
},1000)


    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=41.4273&lon=48.4289&lang=AZ&exclude=hourly,minutely&units=metric&appid=b589211711f249d6d9ec181d0c54d91b')
    .then(res =>{return res.json()})
    .then(data =>{showWeather(data);console.log(data)})


const showWeather=(data)=>{
    let temp =Math.round(data.current.temp);
    let hum = data.current.humidity;
    let desc = data.current.weather[0].description;
    let wind = data.current.wind_speed;
    let icon = data.current.weather[0].icon;
    let hours = new Date().getHours();
    let minute = new Date().getMinutes();

    if(minute<10){
        minute ="0"+minute 
    }

    document.querySelector('.weather').innerHTML = '<ul class="ul">'+
    '<div class="cloud"><img src="http://openweathermap.org/img/wn/'+icon+'@4x.png"></div>'+
    '<span class="temp">'+temp+'°C</span>'+
    '<li class="list max-temp"><span>Rütubət</span><span>'+hum+'</span></li>'+
    '<li class="list min-temp"><span>Küleyın suretı</span><span>'+wind+' m/s'+'</span></li>'+
    '<li class="list desc"><span>Hava Durumu</span><span>'+desc+'</span></li>'+
    '<li class="list time"><span>Saat:</span><span>'+hours+':'+minute+'</span></li>'
    '</ul>';

    let dayFore='';
    const ul = document.querySelector('.day-weather');
    data.daily.forEach((day)=>{
        console.log(day.weather[0].icon);
        dayFore +=
            '<li class="item">'+
            '<span class="day">'+window.moment(day.dt*1000).format('ddd')+'</span>'+
            '<div class="item-cloud"><img src="http://openweathermap.org/img/wn/'+day.weather[0].icon+'@2x.png"></div>'+
            '<span class="max">Yüksek '+Math.floor(day.temp.max)+'°C</span> <span class="min">Aşağı '+Math.floor(day.temp.min)+'°C</span></li>';       
    })

    

    ul.innerHTML = dayFore;
}


window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.querySelector('.animation').classList.add("loader-disable");
      document.querySelector('.page').classList.remove("hidden");
    }, 1000);
  });