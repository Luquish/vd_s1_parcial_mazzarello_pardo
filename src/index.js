
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

  const barrio_counts_2022 = d3.dsv(',', base_url + 'data/barrio_counts_2022.csv', d3.autoType);

  yearsData = {
    2022: data_2022,
    2021: data_2021,
    2020: data_2020,
    2019: data_2019,
    2018: data_2018,
  }

  plotCircular(barrio_counts_2022, "#chart_circ")

  plotMapa(yearsData, 2022, 12, "#chart_mapa");

  plotBars(bes_345, data_2021, "#chart_1");

  // plotLines(yearsData, 2022, "#chart_lines");

  plotHorizontal(data_2021, "#chart_3");

  console.log("plotting scatter");
  plotRegression(yearsData, "#chart_regression");
  console.log("plotting scatter done");

  const navbar = document.querySelector("#navbar");

  function hideNav() {
    //document.getElementById("navbar").style.display = "none";
    navbar.backgroundColor = "red";
  }

  function showNav() {
    navbar.display = "block";
  }

  const nota = document.querySelector("#nota1");

  // check if nota intersects with navbar
  window.addEventListener("scroll", (event) => {


    // log scroll position

    const notaRect = nota.getBoundingClientRect();
    const navbarRect = navbar.getBoundingClientRect();

    if (notaRect.bottom < navbarRect.top) {
      showNav();
    } else {
      hideNav();
    }
  });
}
