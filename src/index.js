
document.addEventListener("DOMContentLoaded", main);

function main() {
  //plotMosquitos(data, "#chart1");
  var year = 2022;
  const yearData = d3.dsv(';', `./data/mosquitos-${year}.csv`, d3.autoType); 
  plotMapa(yearData, "#chart1");
}
