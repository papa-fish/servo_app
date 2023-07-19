const latestPrices = document.querySelector(".latest-prices")

renderLatestPrices()

function renderLatestPrices() {
    fetch('https://api.futures-api.com/last?symbol=BB', {
        headers: {
            'x-api-key': 'PHEBYCVDy19Eb7rKaIzhk22mUAZL0Qj41dqLB7MU',
        }
    })
        .then(res => res.json())
        .then(res => res.data[0].last)
        .then(bbPrice => {
            let html = `
                <p>Brent Oil: ${bbPrice} USD per barrel</p>
            `
            const brentOil = document.createElement('p')
            brentOil.innerHTML = html
            latestPrices.appendChild(brentOil)
        })

    fetch('https://api.futures-api.com/last?symbol=CL', {
        headers: {
            'x-api-key': 'PHEBYCVDy19Eb7rKaIzhk22mUAZL0Qj41dqLB7MU',
        }
    })
        .then(res => res.json())
        .then(res => res.data[0].last)
        .then(clPrice => {
            let html = `
                <p>WTI Oil: ${clPrice} USD per barrel</p>
            `
            const wtiOil = document.createElement('p')
            wtiOil.innerHTML = html
            latestPrices.appendChild(wtiOil)
        })
    
    fetch('https://api.futures-api.com/last?symbol=NG', {
        headers: {
            'x-api-key': 'PHEBYCVDy19Eb7rKaIzhk22mUAZL0Qj41dqLB7MU',
         }
     })
        .then(res => res.json())
        .then(res => res.data[0].last)
        .then(ngPrice => {
            let html = `
                <p>Natural Gas: ${ngPrice} USD per MMBtu</p>
            `
            const naturalGas = document.createElement('p')
            naturalGas.innerHTML = html
            latestPrices.appendChild(naturalGas)
        })
}







