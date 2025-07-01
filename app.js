const base_URL = "https://api.frankfurter.dev/v1/latest?base=";
const countryList = {
  AUD: "AU",
  BGN: "BG",
  BRL: "BR",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  CZK: "CZ",
  DKK: "DK",
  EUR: "FR",
  GBP: "GB",
  HKD: "HK",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  ISK: "IS",
  JPY: "JP",
  KPW: "KP",
  MXN: "MX",
  MYR: "MY",
  NZD: "NZ",
  PHP: "PH",
  PLN: "PL",
  RON: "RO",
  SEK: "SE",
  SGD: "SG",
  THB: "TH",
  TRY: "TR",
  USD: "US",
  ZAR: "ZA"
};
const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for(let select of dropdowns){

    for(currcode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;

        if(select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgsrc;
}

const updateExchange = async()=>{
    let amt = document.querySelector(".amt input");
    let amtval = amt.value;

    if(amtval === "" && amtval <=0)
    {
        amtval = 1;
        amt.value = "1";
    }

    const URL = `${base_URL}${fromcurr.value.toLowerCase()}&symbol=${tocurr.value.toLowerCase()}`;

    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    console.log(data);
    let rate = data.rates[tocurr.value];
    console.log(rate);
    let finalamt = amtval*rate ;

    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();
});

window.addEventListener("load",()=>{
    updateExchange();
});

console.log(fromcurr.value);
console.log(tocurr.value);