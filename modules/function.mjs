import { saveLocalStorage } from "./localStorage.mjs";

let mainT = document.querySelector("main");

// Funktion som visar info om population, väder och info om stad
export function showInfo(li, city) {
    // Vid klick på stad visa population i inforuta
    li.addEventListener("click", () => {
        mainT.innerHTML = "";

        if (
            document.getElementById("infoBox") &&
            document.getElementById("saveBtn")
        ) {
            document.getElementById("infoBox").remove();
            document.getElementById("saveBtn").remove();
        }

        let infoBox = document.createElement("section");
        infoBox.id = "infoBox";
        infoBox.innerText = `${city.stadname} har befolkningen: ${city.population}`;

        let saveBtn = document.createElement("button");
        saveBtn.innerText = "Besökt";
        saveBtn.id = "saveBtn";
        mainT.append(infoBox, saveBtn);
        saveLocalStorage(city);
        wwFetch(city);
    });
}

// Hämta data
export function getData(countries, cities) {
    let header = document.querySelector("header");
    for (let i = 0; i < countries.length; i++) {
        header.insertAdjacentHTML(
            "beforeend",
            "<h1 id='" + countries[i].id + "'>" + countries[i].countryname + "</h1>"
        );

        // Vid klick på land - visa städer tillhörande landet
        document.getElementById(countries[i].id).addEventListener("click", () => {
            if (document.getElementById("citiesUl")) {
                document.getElementById("citiesUl").remove();
            }

            let citiesUl = document.createElement("ul");
            citiesUl.id = "citiesUl";
            header.appendChild(citiesUl);

            // För varje stad - skapa li
            for (let j = 0; j < cities.length; j++) {
                if (countries[i].id === cities[j].countryid) {
                    let city = cities[j];
                    let li = document.createElement("li");
                    li.innerText = city.stadname;
                    li.id = city.id;
                    document.getElementById("citiesUl").appendChild(li);

                    showInfo(li, city);
                }
            }
            document.title = countries[i].countryname;
        });
    }
}

// Fetch för info om stad samt väder
export function wwFetch(city) {
    Promise.all([
        fetch(
            "https://sv.wikipedia.org/w/rest.php/v1/search/page?q=" +
            city.stadname +
            "&limit=1"
        ).then((response) => response.json()),

        fetch(
            "https://api.weatherapi.com/v1/current.json?key=33a562cc2c244e8e857163551220201&q=" +
            city.stadname +
            "&aqi=no"
        ).then((response) => response.json()),
    ]).then((data) => {
        document.getElementById("infoBox");
        infoBox.innerHTML += `<p>Om staden:  ${data[0].pages[0].description}</p>
    <p>Väder: ${data[1].current.temp_c}°C ${data[1].current.temp_f}°F </p>
    <img src=${data[1].current.condition.icon}> </img>
    <img src= ${data[0].pages[0].thumbnail.url}></img>`;

        // Ändrar favicon och titel beroende på stad cch väder
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = data[1].current.condition.icon;

        document.title = city.stadname;
    });
};
