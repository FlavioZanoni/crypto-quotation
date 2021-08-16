//imports
const wallet = require("./price")
const axios = require('axios').default

// elements in page
let ethValue = document.getElementById("eth-price")
let btcValue = document.getElementById("btc-price")
let usdValue = document.getElementById("usd-price-brl")

let ethValueBRL = document.getElementById("eth-price-brl")
let btcValueBRL = document.getElementById("btc-price-brl")

let ethWalletBRL = document.getElementById("eth-wallet-brl")
let btcWalletBRL = document.getElementById("btc-wallet-brl")

let ethWalletUSD = document.getElementById("eth-wallet-usd")
let btcWalletUSD = document.getElementById("btc-wallet-usd")

let url = "https://economia.awesomeapi.com.br"

run()

function run() {
  // get prices
  async function getEthUSD() {
    let response = await axios.get(url + "/eth-usd")
    return response.data[0].bid
  }

  async function getBtcUSD() {
    let response = await axios.get(url + "/btc-usd")
    return response.data[0].bid
  }

  async function getUsd() {
    let response = await axios.get(url + "/usd")
    return response.data[0].bid
  }

  async function calls() {
    const usdPrice = parseFloat(await getUsd())
    usdValue.innerHTML = usdPrice.toFixed(2)

    const valueETH = parseFloat(await getEthUSD())
    let ethPriceBRL = valueETH * usdPrice
    ethValueBRL.innerHTML = ethPriceBRL.toFixed(2)
    ethValue.innerHTML = valueETH.toFixed(2)

    const valueBTC = parseFloat(await getBtcUSD())
    let btcPriceBRL = valueBTC* usdPrice
    btcValueBRL.innerHTML = btcPriceBRL.toFixed(2)
    btcValue.innerHTML = valueBTC.toFixed(2)

    getWallet(valueETH, valueBTC, ethPriceBRL, btcPriceBRL)
  }

  calls()

  function getWallet(ethPriceUSD, btcPriceUSD, ethPriceBRL, btcPriceBRL ) {
    // btc wallet
    let btcUSD = btcPriceUSD * wallet.BTC_QUANTITY
    let btcBRL = btcPriceBRL * wallet.BTC_QUANTITY

    btcWalletBRL.innerHTML = btcBRL.toFixed(2)
    btcWalletUSD.innerHTML = btcUSD.toFixed(2)

    //eth wallet
    let ethUSD = ethPriceUSD * wallet.ETH_QUANTITY
    let ethBRL = ethPriceBRL * wallet.ETH_QUANTITY

    ethWalletBRL.innerHTML = ethBRL.toFixed(2)
    ethWalletUSD.innerHTML = ethUSD.toFixed(2)
  }
}



document.getElementById("rec").addEventListener('click', () => {
  run()
})