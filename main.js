let buttonForArian = document.getElementById("buttonForArian"); // Получаем нашу кнопку
let resultArian = document.getElementById("resultArian"); // Получаем наше поле вывода
let selectorOfArian = document.querySelector("#selectorOfArian"); // Получаем наш селектор с выбором валюты

buttonForArian.addEventListener('click', buttonForArianClick); // Вышаем на кнопку событие click, при нажатии будет вызвана функция buttonForArianClick
selectorOfArian.addEventListener('click', clearResultArian); // Вышаем на селектор событие click, при нажатии будет вызвана функци clearResultArian

let typeOfValue; // Переменная для вида курса

clearResultArian();

function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
		
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
		
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
		
        xhr.send();
    });
}

function handlerArianInfo(response) {
	let result = JSON.parse(response);
	
	resultArian.innerHTML = "GET-запрос вернул следующую информацию:"
	
	if (typeOfValue == "rub") {
		resultArian.innerHTML += "\nСтоимость apecoin = " + result.apecoin.rub + 
								 "\nСтоимость bitcoin = " + result.bitcoin.rub +
								 "\nСтоимость ethereum = " + result.ethereum.rub +
								 "\nСтоимость litecoin = " + result.litecoin.rub;
	} else if (typeOfValue == "usd") {
		resultArian.innerHTML += "\nСтоимость apecoin = " + result.apecoin.usd + 
								 "\nСтоимость bitcoin = " + result.bitcoin.usd +
								 "\nСтоимость ethereum = " + result.ethereum.usd +
								 "\nСтоимость litecoin = " + result.litecoin.usd;
	} else if (typeOfValue == "eur"){
		resultArian.innerHTML += "\nСтоимость apecoin = " + result.apecoin.eur + 
								 "\nСтоимость bitcoin = " + result.bitcoin.eur +
								 "\nСтоимость ethereum = " + result.ethereum.eur +
								 "\nСтоимость litecoin = " + result.litecoin.eur;
	}
}

async function buttonForArianClick() {
    typeOfValue = selectorOfArian.options[selectorOfArian.selectedIndex].value; // Получаем выбранный идентификатор из списка
    let queryParam = "&vs_currencies=" + encodeURIComponent(typeOfValue); // Формируем строку запроса
    let response = await makeRequest('GET', "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Capecoin%2Cethereum%2Clitecoin" + queryParam);
    handlerArianInfo(response);
}

function clearResultArian() {
	resultArian.innerHTML = "Ожидание нажатия кнопки \"Узнать\"";
}