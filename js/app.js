// api https://covid19.mathdro.id/api/confirmed
// br https://covid19.mathdro.id/api/countries/BR/confirmed
// região 18

window.addEventListener("load", ()=> {
  $('#alertFicaEmCasa').modal()
})

class Covid {
  constructor() {
    moment.locale("pt-br");
  }
  async setDataBrazil(data) {
    try {
      const lastUpdate = document.getElementById("lastUpdate");
      const confirmed = document.getElementById("confirmed");
      const active = document.getElementById("active");
      const recovered = document.getElementById("recovered");
      const deaths = document.getElementById("deaths");
      // Setando valores
      lastUpdate.innerHTML = moment(data.lastUpdate).format("lll");
      confirmed.innerHTML = data.confirmed;
      active.innerHTML = data.active;
      recovered.innerHTML = data.recovered;
      deaths.innerHTML = data.deaths;

    } catch (e) {
      console.log(e);
    }
  }
  async getDataAll(apiUrl) {
    try {
      const data = await axios(apiUrl).then(r => r.data);
      const dataFilter = data.filter(e => {
        if (
          e.countryRegion == "Argentina" ||
          e.countryRegion == "Bolivia" ||
          e.countryRegion == "Brazil" ||
          e.countryRegion == "Colombia" ||
          e.countryRegion == "Ecuador" ||
          e.countryRegion == "Guyana" ||
          e.countryRegion == "Paraguay" ||
          e.countryRegion == "Peru" ||
          e.countryRegion == "Suriname" ||
          e.countryRegion == "Uruguay" ||
          e.countryRegion == "Venezuela" ||
          e.provinceState == "French Guiana"
        ) {
          return e;
        }
      });
      // Tratando informações sobre o mundo
      // Obtendo os dados     
      let confirmedAll = data.map(e => e.confirmed)
      let activeAll = data.map(e => e.active)
      let recoveredAll = data.map(e => e.recovered)
      let deathsAll = data.map(e => e.deaths)

      const reducer = (accumulator, currentValue) => accumulator + currentValue
      this.worldStatus = {
        confirmed: confirmedAll.reduce(reducer),
        active: activeAll.reduce(reducer),
        recovered: recoveredAll.reduce(reducer),
        deaths: deathsAll.reduce(reducer),
        totalLocations: 0
      }
      this.worldStatus.totalLocations = await axios("https://covid19.mathdro.id/api/countries").then(r => r.data.countries.length)
      this.setWorldStatus()
      // let brazilData = 
      this.setDataBrazil(data.filter(e => e.countryRegion == "Brazil")[0])
      // Setando informações de cada país
      this.argentina = this.recoveryData("Argentina", dataFilter);
      this.bolivia = this.recoveryData("Bolivia", dataFilter);
      this.brazil = this.recoveryData("Brazil", dataFilter);
      this.colombia = this.recoveryData("Colombia", dataFilter);
      this.ecuador = this.recoveryData("Ecuador", dataFilter);
      this.guyana = this.recoveryData("Guyana", dataFilter);
      this.paraguay = this.recoveryData("Paraguay", dataFilter);
      this.peru = this.recoveryData("Peru", dataFilter);
      this.suriname = this.recoveryData("Suriname", dataFilter);
      this.uruguay = this.recoveryData("Uruguay", dataFilter);
      this.venezuela = this.recoveryData("Venezuela", dataFilter);
      this.frenchGuiana = this.recoveryData("French Guiana", dataFilter);
      this.graphicsSouthAmerica();
    } catch (e) {
      console.log(e);
    }
  }
  setWorldStatus() {
    document.getElementById("totalLocais").innerHTML = this.worldStatus.totalLocations
    // Setando as informações para o mundo
    document.getElementById("worldConfirmed").innerHTML = this.worldStatus.confirmed
    document.getElementById("worldActive").innerHTML = this.worldStatus.active
    document.getElementById("worldRecovered").innerHTML = this.worldStatus.recovered
    document.getElementById("worldDeaths").innerHTML = this.worldStatus.deaths
  }
  recoveryData(region, myArray) {
    const response = myArray.filter(e => { if (e.countryRegion == region || e.provinceState == region) return e })
    return response[0]
  }
  graphicsSouthAmerica() {
    // Gráficos América do Sul
    // Casos
    let el1 = document.getElementById("americaDoSulCasos").getContext("2d");
    let casos = new Chart(el1, {
      type: "bar",
      data: {
        labels: [
          "Argentina",
          "Bolívia",
          "Brasil",
          "Colômbia",
          "Equador",
          "Guiana",
          "Paraguai",
          "Peru",
          "Suriname",
          "Uruguai",
          "Venezuela",
          "Guiana Francesa"
        ],
        datasets: [
          {
            label: "Casos Confirmados",
            data: [
              this.argentina.confirmed,
              this.bolivia.confirmed,
              this.brazil.confirmed,
              this.colombia.confirmed,
              this.ecuador.confirmed,
              this.guyana.confirmed,
              this.paraguay.confirmed,
              this.peru.confirmed,
              this.suriname.confirmed,
              this.uruguay.confirmed,
              this.venezuela.confirmed,
              this.frenchGuiana.confirmed
            ],
            backgroundColor: [
              "rgba(26, 188, 156,1.0)",
              "rgba(22, 160, 133,1.0)",
              "rgba(46, 204, 113,1.0)",
              "rgba(39, 174, 96,1.0)",
              "rgba(52, 152, 219,1.0)",
              "rgba(41, 128, 185,1.0)",
              "rgba(155, 89, 182,1.0)",
              "rgba(142, 68, 173,1.0)",
              "rgba(52, 73, 94,1.0)",
              "rgba(44, 62, 80,1.0)",
              "rgba(241, 196, 15,1.0)",
              "rgba(243, 156, 18,1.0)"
            ],

            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    // Casos atuais
    let el4 = document
      .getElementById("americaDoSulCasosAtuais")
      .getContext("2d");
    let casosAtuais = new Chart(el4, {
      type: "bar",
      data: {
        labels: [
          "Argentina",
          "Bolívia",
          "Brasil",
          "Colômbia",
          "Equador",
          "Guiana",
          "Paraguai",
          "Peru",
          "Suriname",
          "Uruguai",
          "Venezuela",
          "Guiana Francesa"
        ],
        datasets: [
          {
            label: "Casos Atuais",
            data: [
              this.argentina.active,
              this.bolivia.active,
              this.brazil.active,
              this.colombia.active,
              this.ecuador.active,
              this.guyana.active,
              this.paraguay.active,
              this.peru.active,
              this.suriname.active,
              this.uruguay.active,
              this.venezuela.active,
              this.frenchGuiana.active
            ],
            backgroundColor: [
              "rgba(26, 188, 156,1.0)",
              "rgba(22, 160, 133,1.0)",
              "rgba(46, 204, 113,1.0)",
              "rgba(39, 174, 96,1.0)",
              "rgba(52, 152, 219,1.0)",
              "rgba(41, 128, 185,1.0)",
              "rgba(155, 89, 182,1.0)",
              "rgba(142, 68, 173,1.0)",
              "rgba(52, 73, 94,1.0)",
              "rgba(44, 62, 80,1.0)",
              "rgba(241, 196, 15,1.0)",
              "rgba(243, 156, 18,1.0)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    // Curas
    let el2 = document.getElementById("americaDoSulCuras").getContext("2d");
    let curas = new Chart(el2, {
      type: "bar",
      data: {
        labels: [
          "Argentina",
          "Bolívia",
          "Brasil",
          "Colômbia",
          "Equador",
          "Guiana",
          "Paraguai",
          "Peru",
          "Suriname",
          "Uruguai",
          "Venezuela",
          "Guiana Francesa"
        ],
        datasets: [
          {
            label: "Pessoas Curadas",
            data: [
              this.argentina.recovered,
              this.bolivia.recovered,
              this.brazil.recovered,
              this.colombia.recovered,
              this.ecuador.recovered,
              this.guyana.recovered,
              this.paraguay.recovered,
              this.peru.recovered,
              this.suriname.recovered,
              this.uruguay.recovered,
              this.venezuela.recovered,
              this.frenchGuiana.recovered
            ],
            backgroundColor: [
              "rgba(26, 188, 156,1.0)",
              "rgba(22, 160, 133,1.0)",
              "rgba(46, 204, 113,1.0)",
              "rgba(39, 174, 96,1.0)",
              "rgba(52, 152, 219,1.0)",
              "rgba(41, 128, 185,1.0)",
              "rgba(155, 89, 182,1.0)",
              "rgba(142, 68, 173,1.0)",
              "rgba(52, 73, 94,1.0)",
              "rgba(44, 62, 80,1.0)",
              "rgba(241, 196, 15,1.0)",
              "rgba(243, 156, 18,1.0)"
            ],

            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    // Mortes
    let el3 = document.getElementById("americaDoSulMortes").getContext("2d");
    let mortes = new Chart(el3, {
      type: "bar",
      data: {
        labels: [
          "Argentina",
          "Bolívia",
          "Brasil",
          "Colômbia",
          "Equador",
          "Guiana",
          "Paraguai",
          "Peru",
          "Suriname",
          "Uruguai",
          "Venezuela",
          "Guiana Francesa"
        ],
        datasets: [
          {
            label: "Mortes",
            data: [
              this.argentina.deaths,
              this.bolivia.deaths,
              this.brazil.deaths,
              this.colombia.deaths,
              this.ecuador.deaths,
              this.guyana.deaths,
              this.paraguay.deaths,
              this.peru.deaths,
              this.suriname.deaths,
              this.uruguay.deaths,
              this.venezuela.deaths,
              this.frenchGuiana.deaths
            ],
            backgroundColor: [
              "rgba(26, 188, 156,1.0)",
              "rgba(22, 160, 133,1.0)",
              "rgba(46, 204, 113,1.0)",
              "rgba(39, 174, 96,1.0)",
              "rgba(52, 152, 219,1.0)",
              "rgba(41, 128, 185,1.0)",
              "rgba(155, 89, 182,1.0)",
              "rgba(142, 68, 173,1.0)",
              "rgba(52, 73, 94,1.0)",
              "rgba(44, 62, 80,1.0)",
              "rgba(241, 196, 15,1.0)",
              "rgba(243, 156, 18,1.0)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    document.getElementById("loader2").classList.add("d-none")
  }
  init() {
    this.getDataAll("https://covid19.mathdro.id/api/confirmed");
  }
}

const app = new Covid();
app.init();

