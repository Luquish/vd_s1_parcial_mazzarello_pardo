
document.addEventListener("DOMContentLoaded", main);

function main() {
  //plotMosquitos(data, "#chart1");
  const data_2022 = d3.dsv(';', `./data/mosquitos-2022.csv`, d3.autoType); 
  const data_2021 = d3.dsv(';', `./data/mosquitos-2021.csv`, d3.autoType);
  const data_2020 = d3.dsv(';', `./data/mosquitos-2020.csv`, d3.autoType);
  const data_2019 = d3.dsv(';', `./data/mosquitos-2019.csv`, d3.autoType);
  const data_2018 = d3.dsv(';', `./data/mosquitos-2018.csv`, d3.autoType);

  yearsData = {
    2022: data_2022,
    2021: data_2021,
    2020: data_2020,
    2019: data_2019,
    2018: data_2018,
  }

  plotMapa(yearsData, 2022, "#chart_mapa");
}
