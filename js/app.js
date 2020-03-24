// api https://covid19.mathdro.id/api/confirmed
// br https://covid19.mathdro.id/api/countries/BR/confirmed
// região 18

moment.locale("pt-br")

const getData = async (apiUrl) => {
  try {
    const loader = document.getElementById("loader")
    const covidStatus = document.getElementById("covidStatus")
    const lastUpdate = document.getElementById("lastUpdate")
    const confirmed = document.getElementById("confirmed")
    const active = document.getElementById("active")
    const recovered = document.getElementById("recovered")
    const deaths = document.getElementById("deaths")
    const data = await axios(apiUrl).then(r => r.data[0])
    console.log(data)
    // set values
    lastUpdate.innerHTML = moment(data.lastUpdate).format("LLL")
    confirmed.innerHTML = data.confirmed
    active.innerHTML = data.active
    recovered.innerHTML = data.recovered
    deaths.innerHTML = data.deaths
    loader.classList.add("d-none")
    covidStatus.classList.remove("d-none")
  } catch (e) {
    console.log("Ocorreu um erro ao tentar obter os dados. " + e)
  }
}

getData("https://covid19.mathdro.id/api/countries/BR/confirmed")