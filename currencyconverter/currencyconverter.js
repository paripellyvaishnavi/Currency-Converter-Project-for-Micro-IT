const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const convertedAmountSpan = document.getElementById('convertedAmount');
const exchangeRateSpan = document.getElementById('exchangeRate');

// Sample list of currencies (you'll likely want to fetch this dynamically)
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'];

function populateCurrencies() {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
    });
}

async function getExchangeRate(fromCurrency, toCurrency) {
    // Replace with your actual API endpoint
    const apiKey = 'YOUR_API_KEY'; // You'll need to sign up for an API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.rates && data.rates[toCurrency]) {
            return data.rates[toCurrency];
        } else {
            console.error("Could not retrieve exchange rate.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        convertedAmountSpan.textContent = amount.toFixed(2);
        exchangeRateSpan.textContent = '1.00';
        return;
    }

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    if (exchangeRate !== null) {
        const convertedAmount = amount * exchangeRate;
        convertedAmountSpan.textContent = convertedAmount.toFixed(2);
        exchangeRateSpan.textContent = exchangeRate.toFixed(4);
    }
}

populateCurrencies();
convertButton.addEventListener('click', convertCurrency);