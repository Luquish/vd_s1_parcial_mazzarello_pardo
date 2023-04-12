function plotMapa(dataPromise, divId) {

    const mapaFetch = d3.json('./data/barrios-caba.geojson')

    Promise.all([mapaFetch, dataPromise]).then(([barrios, data]) => {
    
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
        Plot.density(data, { x: 'lon', y: 'lat', fill: 'density',bandwidth: 15, thresholds: 30 }),
        Plot.geo(barrios, {
            stroke: 'gray',
            title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
        }),
        ],
    })

    /* Agregamos al DOM la visualización chartMap */
    d3.select(divId).append(() => chartMap)
    })
}
