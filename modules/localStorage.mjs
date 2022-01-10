let cityId = [];

// Tömma localStorage
export function emptyLocalStorage() {
    document.getElementById("emptyBtn").addEventListener("click", () => {
        cityId = [];
        localStorage.setItem("cityId", JSON.stringify(cityId));
        document.getElementById("extraInfo").innerText = "";
        let print = document.createElement("p");
        print.innerText = "Du har inga sparade besökta städer";
        document.getElementById("extraInfo").appendChild(print);
    });
}

// Hämta data från localStorage och räkna ihop totala populationen för besökta städerna
export function getLocalStorage(city) {
    cityId = [];
    cityId = JSON.parse(localStorage.getItem("cityId")) || [];
    let totPop = 0;
    for (let i = 0; i < cityId.length; i++) {
        totPop += city[cityId[i] - 1].population;
        let cityNamePrint = document.createElement("p");
        cityNamePrint.innerText = city[cityId[i] - 1].stadname;
        cityNamePrint.id = "cityNamePrint";

        document.getElementById("extraInfo").append(cityNamePrint);
    }
    let totPopPrint = document.createElement("p");
    totPopPrint.id = "totPopPrint";
    if (totPop != 0) {
        totPopPrint.innerText =
            "Den totala populationen av dina besökta städer är: " + totPop;
    } else {
        totPopPrint.innerText = "Du har inga sparade besökta städer";
    }
    document.getElementById("extraInfo").appendChild(totPopPrint);
}

// Funktion för klick på besökta städer-knappen
export function visitCity(city, main) {
    let visitedCities = document.getElementById("visitedCities");
    visitedCities.addEventListener("click", () => {
        main.innerHTML = "";
        let extraInfo = document.createElement("section");
        extraInfo.id = "extraInfo";

        let emptyBtn = document.createElement("button");
        emptyBtn.innerText = "Rensa";
        emptyBtn.id = "emptyBtn";
        main.append(extraInfo);

        getLocalStorage(city);

        extraInfo.appendChild(emptyBtn);
        emptyLocalStorage();

        document.title = "Besökta städer";
    });
}

export function saveLocalStorage(city) {
    document.getElementById("saveBtn").addEventListener("click", () => {
        cityId.push(city.id);
        localStorage.setItem("cityId", JSON.stringify(cityId));
    });
}