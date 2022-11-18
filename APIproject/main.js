const form = document.forms[0];

function getFormData() {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((item, index) => data[index] = item);
    return data;
}

form.addEventListener('input', e => getData(e));
async function getData(e) {
    const data = getFormData();
    const toValue = document.querySelector('input[name=to]');
    const fromValue = document.querySelector('input[name=from]');
        if (e.target.name !== 'to') {

            const currency = await fetch(`https://api.exchangerate.host/latest?base=${data['value-left']}&symbols=${data['value-right']}`)
            .then(response => response.json());


            const rate = currency.rates[`${data['value-right']}`];

            if(data.from != '' && data.from != '.'){
                data.to = (data.from * rate).toFixed(2);
                toValue.value = data.to;
                }
            }
            
        else {
            const currency = await fetch(`https://api.exchangerate.host/latest?base=${data['value-right']}&symbols=${data['value-left']}`)
            .then(response => response.json())
            
            const rate = currency.rates[`${data['value-left']}`]
            if(data.to != '' && data.to != '.'){
                data.from = (data.to * rate).toFixed(2);
                fromValue.value = data.from;
                }
            }
            
    }

const valyutaName = document.querySelectorAll('.valyuta-name')
valyutaName.forEach(t => t.addEventListener('click', getInfo))

async function getInfo() {
        const data = getFormData();
        const currencyLeft = await fetch(`https://api.exchangerate.host/latest?base=${data['value-left']}&symbols=${data['value-right']}`)
        .then(response => response.json())

        const rateLeft = currencyLeft.rates[`${data['value-right']}`];
        const leftText = document.querySelector('.left-text')
        leftText.innerHTML = `1 ${data['value-left']} = ${rateLeft.toFixed(4)} ${data['value-right']}`;
        const currencyRight = await fetch(`https://api.exchangerate.host/latest?base=${data['value-right']}&symbols=${data['value-left']}`)
        .then(response => response.json())
            
        const rateRight = currencyRight.rates[`${data['value-left']}`];
        const rightText = document.querySelector('.right-text')
        rightText.innerHTML = `1 ${data['value-right']} = ${rateRight.toFixed(4)} ${data['value-left']}` 
}
window.addEventListener('offline', function getInfo(){
    alert("You are offline please turn on internet connection to run website")
    console.log("You are offline please turn on internet connection to run website");
});