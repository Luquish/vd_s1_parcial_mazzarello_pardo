
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

  plotHorizontal(data_2022, "#chart_3");

  const navbar = document.getElementById("navbar");
  console.log(navbar, 1)
  function hideNav() {
    //document.getElementById("navbar").style.display = "none";
    navbar.backgroundColor = "red";
    console.log(navbar, 2)
  }

  function showNav() {
    navbar.display = "block";
    console.log(navbar, 3)
  }

  // Add intersection observer to Nota1 to hide navbar
  const options = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 0.5 // visible amount of item shown in relation to root
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showNav();
      } else {
        hideNav();
      }
    })
  }, options)
  const nota = document.querySelector("#nota1");
  observer.observe(nota);
}
