let slider = null;

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.8}px))`;
}

function plotMapa(yearsData, year, divId) {

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

        var bubble = document.createElement("output");
        bubble.id = `bubble-${divId}`;
        bubble.classList.add("slider_bubble");

        slider.oninput = function () {
            chart.innerHTML = "";
            var newYear = this.value;
            plotMapa(yearsData, newYear, divId);
            document.querySelector(".chart_legend").innerHTML = `
                <p class="chart_desc">Denuncias por criaderos de mosquitos | Año ${this.newYear}</p>
                <p class="chart_src"><b>Fuente: </b> Buenos Aires Data - Sistema Único de Atención Ciudadana</p>
            `;

            setBubble(this, bubble);
            
        }
        document.querySelector("#chart_mapa_extra").appendChild(bubble);
        document.querySelector("#chart_mapa_extra").appendChild(slider);

        setBubble(slider, bubble);
    }

    // append year slider to div ondocumentready

    const mapaFetch = d3.json('./data/barrios-caba.geojson')

    years = Object.keys(yearsData)

    console.log([...Object.values(yearsData)])

    Promise.all([mapaFetch, ...Object.values(yearsData)]).then((objs) => {

        barrios = objs[0]

        // Get index of year in years array

        var yearIndex = years.indexOf(year.toString())
        console.log(yearIndex)
        // Get data for year

        var data = objs[yearIndex + 1]

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
