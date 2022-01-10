import { emptyLocalStorage, visitCity, getLocalStorage, saveLocalStorage } from "./modules/localStorage.mjs";
import { getData, showInfo, wwFetch } from "./modules/function.mjs";

// Hämta element från HTML
let main = document.querySelector("main");

// Fetch för länder och städer
let citiesAndCountries = Promise.all([
    fetch("JSON/land.json").then((response) => response.json()),
    fetch("JSON/stad.json").then((response) => response.json()),
]).then((data) => {
    getData(data[0], data[1]);
    visitCity(data[1], main);
});