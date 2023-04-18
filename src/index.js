
document.addEventListener("DOMContentLoaded", main);

const base_url = ""

function main() {
  //plotMosquitos(data, "#chart1");
  const data_2022 = d3.dsv(';', base_url + 'data/mosquitos-2022.csv', d3.autoType); 
  const data_2021 = d3.dsv(';', base_url + 'data/mosquitos-2021.csv', d3.autoType);
  const data_2020 = d3.dsv(';', base_url + 'data/mosquitos-2020.csv', d3.autoType);
  const data_2019 = d3.dsv(';', base_url + 'data/mosquitos-2019.csv', d3.autoType);
  const data_2018 = d3.dsv(';', base_url + 'data/mosquitos-2018.csv', d3.autoType);

  const bes_345 = d3.dsv(';', base_url + 'data/BES-345.csv', d3.autoType);

  const barrio_counts_2022 = d3.dsv(',', 'data/barrio_counts_2022.csv', d3.autoType);

  yearsData = {
    2022: data_2022,
    2021: data_2021,
    2020: data_2020,
    2019: data_2019,
    2018: data_2018,
  }

  plotCircular(barrio_counts_2022, "#chart_circ")

  plotMapa(yearsData, 2022, 12, "#chart_mapa");

  plotLines(yearsData, 2022, "#chart_lines");

  plotBars(bes_345, data_2022, "#chart_3");
}
