let slider = null;

function plotMapa(dataPromise, divId) {

    var chart = document.querySelector(divId);
    console.log(chart)
    if (slider == null) {
        slider = document.createElement("input");
        slider.id = `slider-${divId}`;
        slider.classList.add("chart_slider");
        slider.type = "range";
        slider.min = 2018;
        slider.max = 2022;
        slider.value = 2022;
        slider.step = 1;
        slider.style.width = "100%";
        slider.oninput = function () {
            chart.innerHTML = "";
            var year = this.value;
            const yearData = d3.dsv(';', `./data/mosquitos-${year}.csv`, d3.autoType);
            plotMapa(yearData, divId);
            console.log(this.value)
            document.querySelector(".chart_legend").innerHTML = `
                <p class="chart_desc">Mosquitos por barrio | Año ${this.value}</p>
                <p class="chart_src"><b>Fuente: </b> Buenos Aires Data - Sistema Único de Atención Ciudadana</p>
            `;
            
        }
        document.querySelector("#chart1_extra").appendChild(slider);
    }

    // append year slider to div ondocumentready

    const mapaFetch = d3.json('./data/barrios-caba.geojson')

    Promise.all([mapaFetch, dataPromise]).then(([barrios, data]) => {
        console.log(data)

        /* Mapa Coroplético */
        let chartMap = Plot.plot({
            // https://github.com/observablehq/plot#projection-options
            projection: {
            type: 'mercator',
            domain: barrios, // Objeto GeoJson a encuadrar
            },
            color: {
                type: "linear",
                scheme: "ylorrd",
                legend: true,
            },
            marks: [
            Plot.density(data, { x: 'lon', y: 'lat', fill: 'density', bandwidth: 15, thresholds: 30 }),
            Plot.geo(barrios, {
                stroke: 'gray',
                title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
            }),
            ],
        })

        /* Agregamos al DOM la visualización chartMap */
        d3.select(divId).append(() => chartMap)

        var height = document.querySelector(divId).offsetHeight
        var width = document.querySelector(divId).offsetWidth

        document.querySelector(divId).style.height = `${height}px`
        document.querySelector(divId).style.width = `${width}px`
        
    })
}
