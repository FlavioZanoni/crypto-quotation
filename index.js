//imports
const wallet = require("./price")
const axios = require('axios').default

// elements in page
let ethValue = document.getElementById("eth-price")
let btcValue = document.getElementById("btc-price")
let usdValue = document.getElementById("usd-price")

let ethWalletBRL = document.getElementById("eth-wallet-brl")
let btcWalletBRL = document.getElementById("btc-wallet-brl")

let ethWalletUSD = document.getElementById("eth-wallet-usd")
let btcWalletUSD = document.getElementById("btc-wallet-usd")

let url = "https://economia.awesomeapi.com.br"

run()

function run() {
  // get prices
  async function getEth() {
    let response = await axios.get(url + "/eth-usd")
    return response.data[0].bid
  }

  async function getBtc() {
    let response = await axios.get(url + "/btc-usd")
    return response.data[0].bid
  }

  async function getUsd() {
    let response = await axios.get(url + "/usd")
    return response.data[0].bid
  }

  async function calls() {
    const ethPrice = parseFloat(await getEth())
    ethValue.innerHTML = ethPrice.toFixed(2)

    const btcPrice = parseFloat(await getBtc())
    btcValue.innerHTML = btcPrice.toFixed(2)

    const usdPrice = parseFloat(await getUsd())
    usdValue.innerHTML = usdPrice.toFixed(2)

    getWallet(ethPrice, btcPrice, usdPrice)
  }

  calls()

  function getWallet(ethPrice, btcPrice, usdPrice) {
    // btc wallet
    let btcUSD = btcPrice * wallet.BTC_QUANTITY
    let btcBRL = (btcPrice * wallet.BTC_QUANTITY) * usdPrice

    btcWalletBRL.innerHTML = btcBRL.toFixed(2)
    btcWalletUSD.innerHTML = btcUSD.toFixed(2)


    //eth wallet
    let ethUSD = ethPrice * wallet.ETH_QUANTITY
    let ethBRL = (ethPrice * wallet.ETH_QUANTITY) * usdPrice

    ethWalletBRL.innerHTML = ethBRL.toFixed(2)
    ethWalletUSD.innerHTML = ethUSD.toFixed(2)
  }
}



document.getElementById("rec").addEventListener('click', () => {
  run()
})