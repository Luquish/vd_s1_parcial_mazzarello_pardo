# 🦟 Parcial Sistema Único de Atención Ciudadana - [Link al repo](https://github.com/Luquish/vd_s1_parcial_mazzarello_pardo)

## [Visualización de Datos - Licenciatura Tecnología Digital - UTDT](https://www.utdt.edu/ver_contenido.php?id_contenido=19866&id_item_menu=31534)

## 🧠 **Integrantes**

- [Luca Mazzarello](https://github.com/Luquish)
- [Ignacio Pardo](https://github.com/IgnacioPardo)

## 👨🏻‍🏫 **Profesores**

- Alejandro Tumas Uffelmann
- [Carlos Araujo](https://github.com/araujo-carlos)
- Julieta Romero
- Delfina Arambillet

## Fechas

- 05/04/23 Tipologías de gráficos. Transformaciones de datos.
- 12/04/23 Mapas y proyecciones cartográficas.
- 19/04/23 Última corrección. Edición de gráficos.
- 26/04/23 Entrega y presentación de proyecto.

## 📑 Objetivo

El parcial consiste en el diseño y desarrollo de una página web, una narrativa visual compuesta de tres visualizaciones de datos además de elementos textuales de edición (ver boceto más abajo).

Los datos están basados en los contactos al SUACI (Sistema Único de Atención Ciudadana) de la Ciudad de Buenos Aires.

El proyecto se realizará en grupos de dos integrantes que explorarán, analizarán y visualizarán uno de los conjuntos de datos brindados por la materia. En la etapa exploratoria el equipo deberá definir el tema.

El sistema de elementos deberá tener un hilo narrativo que guíe la lectura de la página. Las visualizaciones deben estar relacionadas entre sí en función de la historia elegida para contar (un tema determinado o un período de tiempo).
Los textos, a excepción de títulos, serán simulados.
El emisor, a definir por el grupo, puede ser una ONG, un organismo de gobierno o un medio de comunicación.

### 05/04 | Tipologías de gráficos y transformaciones

Explorar los conjuntos de datos propuestos y elegir uno en base al interés de cada equipo. Usar distintas herramientas para la exploración: Excel, Google Sheet, etc.
Realizar la exploración visual en Plot.js en base a las tipologías de gráficos vistas en clase, en función del tipo de datos que se encuentran en el conjunto. Analizar cuál es la historia que se puede contar a partir de estos datos y estudiar cuáles son las funciones de transformación necesarias para poder llegar a esta historia.

### 12/04 | Mapas y proyecciones cartográficas

Desarrollar un mapa temático en función de los datos en el conjunto elegido. Analizar si son funcionales para contar la historia que busco desarrollar para el proyecto. Observar si es posible agregar una codificación de color en función a otro campo del conjunto de datos. Observar si los gráficos desarrollados siguen un hilo narrativo que le otorgue una coherencia al proyecto.

### 19/04 | Última corrección

Realizar ajustes de diseño y edición vistos en clases pasadas. Maquetar la página web en donde se presentarán todos los gráficos, y pensar títulos y bajadas para cada uno de ellos. Discusión y aplicación crítica de ajustes de edición según la guía de análisis propuesta para los gráficos.

### 26/04 | Entrega y presentación del trabajo

Entrega del proyecto a través del campus de la universidad y presentación de cinco minutos a los docentes.

## 💾 Conjunto de datos

Los datos están disponibles en formato CSV en este [repositorio](https://github.com/visualizacion-de-datos-utdt/vd_linea147). Corresponden a los contactos realizados a través de línea 147 al Sistema Único de Atención Ciudadana (SUACI) de la Ciudad de Buenos Aires en el año 2021. Pueden optar por elegir uno o más de los seis conjuntos de datos ofrecidos para realizar sus visualizaciones o, para quienes quieran ampliar la exploración, realizar sus propios cortes a partir del archivo con todos los contactos realizados en el 2021, que se encuentran disponibles en el mismo repositorio.

Aviso: El archivo comprimido con el total de contactos contiene más de 750.000 registros. Debido a su peso, no puede ser utilizado para la exploración visual en la web. Sin embargo, quienes quieran explorar este conjunto de datos, pueden utilizar otros programas como Excel, Google Sheet o lenguajes como Python, SQL u otros para analizar datos, aplicar transformaciones o realizar otros cortes.

Los conjuntos de datos brindados por la materia son:

Todos los contactos realizados entre el 1 y el 7 de enero de 2021
Todos las contactos realizados entre el 15 y el 21 de junio de 2021
Todos los contactos realizados entre el 18 y 24 de agosto de 2021
Contactos por desratización, desinsectación y desinfección en la vía pública realizadas en el año 2021
Contactos por ruidos molestos realizados en el año 2021
Contactos por vehículos mal estacionados realizados en el año 2021

Los campos que se encuentran en ellos son:

- categoria: Agrupamiento de prestaciones de acuerdo a una misma temática.
- subcategoria: Agrupamiento de prestaciones de acuerdo a un mismo objeto.
- prestacion: Concepto que describe con el mayor nivel de detalle al contacto
generado por el vecino.
- tipo_prestacion: Clasificación del contacto de acuerdo a la naturaleza de
la prestación.
- fecha_ingreso: Fecha en la cual se realizó el contacto 
- hora_ingreso: Hora en la cual se realizó el contacto
- domicilio_comuna: Comuna de la Ciudad de Buenos Aires en donde se encuentra el denunciante.
- domicilio_barrio: Barrio en donde se encuentra quien contacta
- domicilio_calle: Calle y altura del domicilio de quien se contacta 
- lat: Coordenada de latitud
- lon: Coordenada de longitud
- canal: Canal por el cual se realizó el contacto
- genero: Género del denunciante
- estado_del_contacto: Estado del contacto realizado

## Entrega

La entrega consiste en el diseño y desarrollo de una página web, una narrativa visual compuesta de tres visualizaciones de datos además de elementos textuales de edición (ver boceto más abajo).

En el campus, dentro de la sección de entrega correspondiente al parcial y antes del miércoles 26/4 a las 7:59 hs, un integrante por grupo subirá un archivo .doc  con los nombres de los integrantes del equipo y dos enlaces: el link del repositorio y el link que lleva al trabajo publicado en GitHub Pages. O bien se subirán todos los archivos del proyecto comprimidos en formato .zip.

## Presentación

En la fecha del parcial, los integrantes del equipo deberán preparar una presentación para los docentes, en donde deberán detallar el hilo narrativo de los gráficos presentados, los problemas con los que se enfrentaron con el conjunto de datos y cómo lograron solucionarlos.
Asimismo, deberán explicar las marcas y canales utilizados, justificar las decisiones de diseño tomadas para la representación de los datos, e indicar si realizaron una transformación de los datos y por qué. La presentación es presencial y no debe durar más de cinco minutos.
