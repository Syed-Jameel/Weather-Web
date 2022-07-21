var submitBtn = document.getElementById("submitBtn");
var cityName = document.getElementById("cityName");
var city_name = document.getElementById("city_name");
var temp = document.getElementById("temp");
var temp_status = document.getElementById("temp_status");
var dataHide = document.querySelector(".middle_layer");

var getInfo = async (event) => {
    let cityVal = cityName.value;
    event.preventDefault();
    if (cityVal === "") {
        city_name.innerText = `Please Enter city Name Befor Search`;
        dataHide.classList.add("data_hide");
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=8418716c995757a05a789870559c5427`;
            //returns data into readablestream form
            var response = await fetch(url);
            console.log(response);
            //below code  will return data in the form of object
            var data = await response.json();
            console.log(data);
            //to convert it into object to array
            var arrData = [data];
            console.log(arrData);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;

            // checking conditions for weather
            let tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clouds") {
                temp_status.innerHTML = `<i class="bi bi-clouds-fill" style="color:#f1f2f6" ></i>`;
            }
            else if (tempMood == "Clear") {
                temp_status.innerHTML = `<i class="bi bi-sun-fill" style="color:#eccc68"></i>`;
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = `<i class="bi bi-cloud-rain-fill" style="color:#a4b0be"></i>`;
            }
            else if (tempMood == "Haze") {
                temp_status.innerHTML = `<i class="bi bi-cloud-haze2-fill" style="color:lightgray"></i>`;
            }
            else if (tempMood == "Drizzle") {
                temp_status.innerHTML = `<i class="bi bi-cloud-drizzle-fill" style="color:#a4b0be"></i>`;
            }
            else {
                temp_status.innerHTML = `<i class="bi bi-sun-fill" style="color:#eccc68"></i>`;
            }

            dataHide.classList.remove("data_hide");

        }
        catch {
            city_name.innerText = `Please Enter city Name properly`;
            dataHide.classList.add("data_hide");
        }
    }
}

submitBtn.addEventListener('click', getInfo);


