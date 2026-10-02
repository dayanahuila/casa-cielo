/* ==========================================================================
   Casa & Cielo — Datos de la plantilla
   Unica fuente de verdad. Las imagenes, las tarjetas de vivienda, la galeria,
   las categorias, los testimonios y el equipo se dibujan desde aqui.
   Cambia un valor en este archivo y se refleja en las tres paginas.
   ========================================================================== */
window.CC = (function () {
  "use strict";

  /* Carpeta de imagenes relativa a la pagina actual ("" en la portada, "../" en pages/)
     Solo se sirven jpeg, asi que no hace falta <picture>: un <img> ya es el
     formato definitivo. */
  var base = /\/pages\//.test(location.pathname) ? "../" : "";

  /* Las fichas se nombran con claves legibles (casa-alameda, agente-2, hero)
     pero las fotos reales viven en images/casas/ con nombre corto. Este mapa es
     el unico punto donde se resuelve esa traduccion; los huecos se cubren
     repitiendo foto porque hay 7 casas y 12 fichas. */
  var FOTO = {
    "casa-alameda": "casa1",
    "casa-robledo": "casa2",
    "casa-vertical": "casa3",
    "loft-rio": "casa4",
    "atlas-panoramico": "casa5",
    "casa-jardin": "casa6",
    "duplex-norte": "casa7",
    "casa-encinas": "casa5",
    "estudio-centro": "casa6",
    "casa-pabellon": "casa7",
    "casa-sendero": "casa5",
    "atrio-luz": "casa6",
    "agente-1": "persona1",
    "agente-2": "persona2",
    "agente-3": "persona3",
    "agente-4": "persona1",
    "hero": "casa5"
  };

  function path(key) {
    return base + "images/casas/" + (FOTO[key] || key) + ".jpeg";
  }

  var ICON = {
    heart: '<path d="M12 20.3l-1.4-1.3C5.7 14.5 2 11.1 2 6.9 2 3.9 4.4 1.6 7.4 1.6c1.7 0 3.3.8 4.6 2.3 1.3-1.5 2.9-2.3 4.6-2.3 3 0 5.4 2.3 5.4 5.3 0 4.2-3.7 7.6-8.6 12.1z"/>',
    camera: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.7l1.3-2h6.9l1.3 2h1.8A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.4"/>',
    pin: '<path d="M20 10.5c0 5.5-8 11.5-8 11.5S4 16 4 10.5a8 8 0 1 1 16 0z"/><circle cx="12" cy="10.3" r="2.8"/>',
    bed: '<path d="M3 18v-6h18v6M3 12V8h18v4M6.5 8V5.5h11V8"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4h7A2.5 2.5 0 0 1 18 6.5V12"/>',
    area: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 3.5v17M16 3.5v17M3.5 9h17M3.5 15h17"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6"/>',
    star: '<path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.7 6.1 20.8l1.2-6.6L2.5 9.5l6.6-.9z"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    home: '<path d="M4 20V9.5L12 4l8 5.5V20"/><path d="M9 20v-6h6v6"/><path d="M2 20h20"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>'
  };

  var GROSOR = {
    heart: 1.8, camera: 1.9, pin: 1.8, bed: 1.7, bath: 1.7,
    area: 1.7, arrow: 2, phone: 1.7, mail: 1.7, home: 1.7, clock: 1.7
  };

  /* Icono de linea. star se dibuja relleno, asi que sale sin stroke. */
  function svg(name, extraClass, size) {
    var cls = extraClass ? ' class="' + extraClass + '"' : "";
    if (name === "star") {
      return '<svg' + cls + ' viewBox="0 0 24 24">' + ICON.star + "</svg>";
    }
    return '<svg' + cls + ' viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="' + (GROSOR[name] || 1.8) + '"' +
      (size ? ' width="' + size + '" height="' + size + '"' : "") + ">" + ICON[name] + "</svg>";
  }

  /* Imagen en jpeg. Un alt vacio equivale a decorativa, asi que se marca
     aria-hidden. */
  function img(key, alt, w, h, extraClass, lazy) {
    var attrs = [];
    if (extraClass) attrs.push('class="' + extraClass + '"');
    attrs.push('src="' + path(key) + '"');
    attrs.push('alt="' + esc(alt) + '"');
    if (!alt) attrs.push('aria-hidden="true"');
    if (w) attrs.push('width="' + w + '" height="' + h + '"');
    if (lazy === false) attrs.push('decoding="async"');
    else attrs.push('loading="lazy" decoding="async"');
    return "<img " + attrs.join(" ") + ">";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------------- Las 12 viviendas ---------------- */
  var props = [
    {
      "id": "casa-alameda",
      "nombre": "Casa Alameda",
      "img": "casa-alameda",
      "alt": "Casa Alameda, casa en Chapinero, Bogotá",
      "precio": 5547000000,
      "precioTxt": "$ 5.547.000.000",
      "precioAntesTxt": "",
      "tipo": "casa",
      "zona": "chapinero",
      "hab": 4,
      "banos": 3,
      "m2": 320,
      "extra": [
        "terraza",
        "garaje",
        "ascensor"
      ],
      "loc": "Chapinero, Bogotá",
      "fotos": 18,
      "tags": [
        {
          "cls": "tag tag--accent",
          "text": "Nueva construccion"
        },
        {
          "cls": "tag",
          "text": "Venta"
        }
      ]
    },
    {
      "id": "casa-robledo",
      "nombre": "Villa Robledo",
      "img": "casa-robledo",
      "alt": "Villa Robledo, villa en Envigado, Antioquia",
      "precio": 3762500000,
      "precioTxt": "$ 3.762.500.000",
      "precioAntesTxt": "",
      "tipo": "villa",
      "zona": "envigado",
      "hab": 5,
      "banos": 3,
      "m2": 410,
      "extra": [
        "jardin",
        "piscina",
        "garaje"
      ],
      "loc": "Envigado, Antioquia",
      "fotos": 24,
      "tags": [
        {
          "cls": "tag",
          "text": "Villa"
        },
        {
          "cls": "tag",
          "text": "Con jardin"
        }
      ]
    },
    {
      "id": "casa-vertical",
      "nombre": "Casa Vertical",
      "img": "casa-vertical",
      "alt": "Casa Vertical, casa en Chapinero",
      "precio": 7052000000,
      "precioTxt": "$ 7.052.000.000",
      "precioAntesTxt": "",
      "tipo": "casa",
      "zona": "chapinero",
      "hab": 4,
      "banos": 4,
      "m2": 285,
      "extra": [
        "terraza",
        "ascensor"
      ],
      "loc": "Chapinero",
      "fotos": 20,
      "tags": [
        {
          "cls": "tag tag--solid",
          "text": "Exclusiva"
        },
        {
          "cls": "tag",
          "text": "Reformada"
        }
      ]
    },
    {
      "id": "loft-rio",
      "nombre": "Loft del Rio",
      "img": "loft-rio",
      "alt": "Loft del Rio, loft en Centro, Bogotá",
      "precio": 2128500000,
      "precioTxt": "$ 2.128.500.000",
      "precioAntesTxt": "",
      "tipo": "loft",
      "zona": "centro",
      "hab": 2,
      "banos": 1,
      "m2": 120,
      "extra": [
        "terraza",
        "ascensor"
      ],
      "loc": "Centro, Bogotá",
      "fotos": 12,
      "tags": [
        {
          "cls": "tag tag--ok",
          "text": "Oportunidad"
        },
        {
          "cls": "tag",
          "text": "Venta"
        }
      ]
    },
    {
      "id": "atlas-panoramico",
      "nombre": "Atico Atlas",
      "img": "atlas-panoramico",
      "alt": "Atico Atlas, atico en Santa Fe, Bogotá",
      "precio": 4945000000,
      "precioTxt": "$ 4.945.000.000",
      "precioAntesTxt": "$ 5.332.000.000",
      "tipo": "atico",
      "zona": "santafe",
      "hab": 3,
      "banos": 2,
      "m2": 210,
      "extra": [
        "terraza",
        "garaje",
        "ascensor"
      ],
      "loc": "Santa Fe, Bogotá",
      "fotos": 21,
      "tags": [
        {
          "cls": "tag",
          "text": "Atico"
        },
        {
          "cls": "tag",
          "text": "Con terraza"
        }
      ]
    },
    {
      "id": "casa-jardin",
      "nombre": "Casa Jardin",
      "img": "casa-jardin",
      "alt": "Casa Jardin, casa en El Poblado, Medellín",
      "precio": 6235000000,
      "precioTxt": "$ 6.235.000.000",
      "precioAntesTxt": "",
      "tipo": "casa",
      "zona": "elpoblado",
      "hab": 5,
      "banos": 3,
      "m2": 380,
      "extra": [
        "jardin",
        "piscina",
        "garaje"
      ],
      "loc": "El Poblado, Medellín",
      "fotos": 27,
      "tags": [
        {
          "cls": "tag",
          "text": "Con jardin"
        },
        {
          "cls": "tag",
          "text": "Piscina"
        }
      ]
    },
    {
      "id": "duplex-norte",
      "nombre": "Duplex Norte",
      "img": "duplex-norte",
      "alt": "Duplex Norte, apartamento en Granada, Cali",
      "precio": 3096000000,
      "precioTxt": "$ 3.096.000.000",
      "precioAntesTxt": "",
      "tipo": "apartamento",
      "zona": "cali",
      "hab": 3,
      "banos": 2,
      "m2": 165,
      "extra": [
        "terraza",
        "ascensor"
      ],
      "loc": "Granada, Cali",
      "fotos": 15,
      "tags": [
        {
          "cls": "tag",
          "text": "Duplex"
        },
        {
          "cls": "tag",
          "text": "Luminoso"
        }
      ]
    },
    {
      "id": "casa-encinas",
      "nombre": "Casa Encinas",
      "img": "casa-encinas",
      "alt": "Casa Encinas, casa en Envigado, Antioquia",
      "precio": 4042000000,
      "precioTxt": "$ 4.042.000.000",
      "precioAntesTxt": "",
      "tipo": "casa",
      "zona": "envigado",
      "hab": 4,
      "banos": 3,
      "m2": 295,
      "extra": [
        "jardin",
        "garaje"
      ],
      "loc": "Envigado, Antioquia",
      "fotos": 22,
      "tags": [
        {
          "cls": "tag",
          "text": "Venta"
        },
        {
          "cls": "tag",
          "text": "Trastero"
        }
      ]
    },
    {
      "id": "estudio-centro",
      "nombre": "Estudio Centro",
      "img": "estudio-centro",
      "alt": "Estudio Centro, apartamento en Centro, Bogotá",
      "precio": 1242700000,
      "precioTxt": "$ 1.242.700.000",
      "precioAntesTxt": "",
      "tipo": "apartamento",
      "zona": "centro",
      "hab": 1,
      "banos": 1,
      "m2": 62,
      "extra": [
        "ascensor"
      ],
      "loc": "Centro, Bogotá",
      "fotos": 8,
      "tags": [
        {
          "cls": "tag",
          "text": "Estudio"
        },
        {
          "cls": "tag",
          "text": "A estrenar"
        }
      ]
    },
    {
      "id": "casa-pabellon",
      "nombre": "Pabellon Norte",
      "img": "casa-pabellon",
      "alt": "Pabellon Norte, villa en Envigado, Antioquia",
      "precio": 10105000000,
      "precioTxt": "$ 10.105.000.000",
      "precioAntesTxt": "",
      "tipo": "villa",
      "zona": "envigado",
      "hab": 6,
      "banos": 5,
      "m2": 520,
      "extra": [
        "jardin",
        "piscina",
        "garaje"
      ],
      "loc": "Envigado, Antioquia",
      "fotos": 32,
      "tags": [
        {
          "cls": "tag tag--solid",
          "text": "Exclusiva"
        },
        {
          "cls": "tag",
          "text": "Venta"
        }
      ]
    },
    {
      "id": "casa-sendero",
      "nombre": "Casa Sendero",
      "img": "casa-sendero",
      "alt": "Casa Sendero, casa en El Poblado, Medellín",
      "precio": 3375500000,
      "precioTxt": "$ 3.375.500.000",
      "precioAntesTxt": "",
      "tipo": "casa",
      "zona": "elpoblado",
      "hab": 4,
      "banos": 2,
      "m2": 260,
      "extra": [
        "jardin",
        "garaje"
      ],
      "loc": "El Poblado, Medellín",
      "fotos": 17,
      "tags": [
        {
          "cls": "tag",
          "text": "Luminoso"
        },
        {
          "cls": "tag",
          "text": "Venta"
        }
      ]
    },
    {
      "id": "atrio-luz",
      "nombre": "Atrio de Luz",
      "img": "atrio-luz",
      "alt": "Atrio de Luz, atico en Chapinero",
      "precio": 8514000000,
      "precioTxt": "$ 8.514.000.000",
      "precioAntesTxt": "",
      "tipo": "atico",
      "zona": "chapinero",
      "hab": 4,
      "banos": 3,
      "m2": 245,
      "extra": [
        "terraza",
        "garaje",
        "ascensor",
        "piscina"
      ],
      "loc": "Chapinero",
      "fotos": 29,
      "tags": [
        {
          "cls": "tag",
          "text": "Atico"
        },
        {
          "cls": "tag",
          "text": "Exclusiva"
        }
      ]
    }
  ];

  /* ---------------- Detalle de ficha ----------------
     Lo que la ficha necesita y la tarjeta del listado no muestra.
     Cada vivienda aporta su ficha; si falta un campo se dibuja sin el. */
  var detalle = {};
  detalle["casa-alameda"] = {
    ref: "CC-1042",
    dir: "Calle 53 # 10-42",
    anno: 2024,
    plantas: 2,
    parcela: "480 m2",
    agente: "agente-1",
    thumbs: [
      ["casa-alameda", "fachada principal"],
      ["loft-rio", "salon con doble altura"],
      ["atrio-luz", "patio central"],
      ["estudio-centro", "estudio con vista al patio"],
      ["casa-vertical", "terraza y pergola"]
    ],
    desc: [
      "Vivienda unifamiliar de 320 m2 construida en 2024 sobre una parcela de 480 m2 en Chapinero. La planta baja se organiza en torno a un patio central que aporta luz natural a la escalera y a la cocina.",
      "La cocina y el salon se abren a una terraza de 45 m2 con pergola de madera y acceso directo al jardin. En la primera planta quedan los cuatro dormitorios, dos de ellos en suite, mas un estudio con vista al patio.",
      "El semisotano dispone de garaje para dos vehiculos, trastero y sala de instalaciones. Calefaccion por suelo radiante, energia solar para el agua caliente y certificado de eficiencia energetica A."
    ],
    carac: [
      "Terraza de 45 m2 con pergola",
      "Jardin privado de 380 m2 con cesped sintetico",
      "Garaje para dos vehiculos con acceso directo",
      "Dos dormitorios en suite con vestidor",
      "Calefaccion por suelo radiante en toda la vivienda",
      "Energia solar para agua caliente",
      "Carpinteria de aluminio con vidrio doble",
      "Certificado de eficiencia energetica A"
    ],
    ubica: "Situada a 900 m del parque de la 93 y a 1,2 km de la Plaza de Bolivar. La estacion de Transmilenio queda a 450 m y hay colegios, supermercado y farmacia a menos de 200 m."
  };
  detalle["casa-robledo"] = {
    ref: "CC-1058",
    dir: "Carrera 37 # 8A-45",
    anno: 2019,
    plantas: 2,
    parcela: "960 m2",
    agente: "agente-3",
    thumbs: [
      ["casa-robledo", "fachada y jardin frontal"],
      ["casa-jardin", "piscina climatizada"],
      ["casa-sendero", "terraza cubierta"],
      ["casa-pabellon", "cocina integrada"],
      ["casa-encinas", "jardin posterior"]
    ],
    desc: [
      "Villa de 410 m2 sobre una parcela de 960 m2 en Envigado, con doble acceso desde la carrera 37. El volumen principal se abre a un jardin elevado y a la piscina climatizada, que ocupan la parte posterior del lote.",
      "La planta baja tiene salon de doble altura, comedor para doce personas y cocina con isla central. En el nivel superior se distribuyen cinco dormitorios, la principal con vestidor y dos banos comunes.",
      "La cubierta y la instalacion electrica se renovaron en 2023. Cuenta con garaje para tres vehiculos, deposito de 40 m2 y zona de servicio independiente."
    ],
    carac: [
      "Parcela de 960 m2 con doble acceso",
      "Piscina climatizada de 10 x 5 m",
      "Jardin elevado con riego automatico",
      "Garaje para tres vehiculos",
      "Salon de doble altura con chimenea",
      "Dormitorio principal con vestidor",
      "Cuarto de servicio con acceso propio",
      "Zona de lavanderia y deposito de 40 m2"
    ],
    ubica: "A 700 m del centro comercial El Abra y a 1,1 km de la estacion de Metrosaban. Colegios y clinicas a menos de 300 m, en una zona residencial de baja densidad."
  };

  detalle["casa-vertical"] = {
    ref: "CC-1073",
    dir: "Calle 85 # 11-09",
    anno: 2016,
    plantas: 4,
    parcela: "310 m2",
    agente: "agente-2",
    thumbs: [
      ["casa-vertical", "fachada sobre la calle 85"],
      ["atrio-luz", "atrio interior"],
      ["atlas-panoramico", "terraza con vista a los andes"],
      ["casa-alameda", "salon con luz cenital"],
      ["loft-rio", "escalera de la zona social"]
    ],
    desc: [
      "Casa de cuatro plantas en un sector de alto valor en Chapinero. La reforma de 2021 abrio los niveles intermedios para ganar luz y ventana, de modo que la zona de dia ocupa los dos primeros niveles con doble altura.",
      "El primer nivel aloja el acceso, la cocina y el comedor. El segundo, el salon con chimenea y una terraza de 60 m2 sobre el jardin. Los dos niveles superiores cuentan con cuatro dormitorios en suite.",
      "Dispone de ascensor con parada en los cuatro niveles, seguridad 24 horas y dos parqueaderos."
    ],
    carac: [
      "Ascensor con parada en los cuatro niveles",
      "Terraza de 60 m2 con vista abierta",
      "Reforma integral de 2021",
      "Todos los dormitorios en suite",
      "Chimenea a gas en el salon",
      "Agua caliente a gas y termos solar",
      "Zona de servicio con entrada propia",
      "Seguridad 24 horas con video"
    ],
    ubica: "En Chapinero Alto, a 600 m del centro comercial, a 900 m de la estacion de Transmilenio y a 1,3 km del parque de la 93."
  };
  detalle["loft-rio"] = {
    ref: "CC-1081",
    dir: "Carrera 3 # 12-44",
    anno: 2018,
    plantas: 2,
    parcela: "",
    agente: "agente-2",
    thumbs: [
      ["loft-rio", "distribucion con doble altura"],
      ["estudio-centro", "cocina abierta"],
      ["casa-alameda", "fachada sobre la carrera"],
      ["atrio-luz", "estructura vista y patio"],
      ["casa-vertical", "terraza con barbacoa"]
    ],
    desc: [
      "Loft de 120 m2 en un edificio industrial rehabilitado del centro de Bogota, a dos cuadras de la Septima. Mantiene la estructura original: columnas de concreto, vigas vistas y una altura libre de 3,6 m.",
      "La distribucion es abierta en la planta baja, con cocina a medida, comedor para seis y salon. La mezzanine aloja el dormitorio principal, un estudio y el segundo baño.",
      "La terraza de 40 m2 mira al interior de la manzana y recibe luz directa hasta las cuatro de la tarde. El edificio tiene ascensor, seguridad y deposito para cada unidad."
    ],
    carac: [
      "Altura libre de 3,6 m con vigas vistas",
      "Terraza privada de 40 m2",
      "Cocina y comedor a medida",
      "Dormitorio en mezzanine con estudio",
      "Dos baños con ducha de lluvia",
      "Piso en hormigon pulido",
      "Deposito privado en la misma planta",
      "Edificio rehabilitado con ascensor"
    ],
    ubica: "A 250 m de la Septima y a 600 m de la Plaza de Bolivar. Transmilenio y servicios a pie, y edificios de oficinas a menos de una cuadra."
  };

  detalle["atlas-panoramico"] = {
    ref: "CC-1064",
    dir: "Carrera 7 # 32-18",
    anno: 2020,
    plantas: 1,
    parcela: "",
    agente: "agente-2",
    thumbs: [
      ["atlas-panoramico", "terraza con vista panoramica"],
      ["loft-rio", "salon con luz natural"],
      ["casa-vertical", "cocina con isla"],
      ["casa-alameda", "dormitorio principal"],
      ["atrio-luz", "piscina de la terraza"]
    ],
    desc: [
      "Atico duplex de 210 m2 en Santa Fe, en el ultimo piso de una torre de 2019. Su gran valor esta en la terraza: 70 m2 con piscina pequeña, barbacoa y vista a los cerros orientales de la ciudad.",
      "El interior reparte tres dormitorios, dos de ellos en suite, y una sala con doble altura. La cocina se abre por completo a la terraza mediante una carpinteria de piso a techo.",
      "El edificio tiene ascensor con llave, gimnasio en el piso 12, sala de reuniones y dos parqueaderos."
    ],
    carac: [
      "Terraza de 70 m2 con piscina",
      "Barbacoa de gas integrada",
      "Vistas panoramicas al oriente",
      "Carpinteria de piso a techo",
      "Ascensor con llave y acceso directo",
      "Gimnasio con vestidores en el piso 12",
      "Sala de reuniones para vigilancia",
      "Dos parqueaderos y deposito"
    ],
    ubica: "A 350 m de la avenida Caracas y a 700 m de la estacion de Transmilenio de la 26. Restaurantes, gimnasios y oficinas en las cuadras siguientes."
  };
  detalle["casa-jardin"] = {
    ref: "CC-1055",
    dir: "Carrera 37 # 10-22",
    anno: 2017,
    plantas: 2,
    parcela: "720 m2",
    agente: "agente-3",
    thumbs: [
      ["casa-jardin", "fachada con jardin"],
      ["casa-robledo", "piscina y terraza"],
      ["casa-sendero", "salon familiar"],
      ["casa-pabellon", "cocina abierta"],
      ["casa-encinas", "cuarto de servicio"]
    ],
    desc: [
      "Casa de 380 m2 en El Poblado, construida en 2017 sobre una parcela de 720 m2. El jardin ocupa el fondo completo y funciona como extension de la casa durante todo el ano.",
      "La planta baja concentra el salon, el comedor y una cocina que se abre a la piscina cubierta. Cinco dormitorios, uno de ellos principal con terraza propia, ocupan el nivel superior.",
      "Cuenta con piscina cubierta climatizada, zona de barbacoa, cuarto de servicio con entrada independiente y dos parqueaderos."
    ],
    carac: [
      "Jardin de 720 m2 con arboles maduros",
      "Piscina cubierta climatizada",
      "Barbacoa con cocina exterior",
      "Dormitorio principal con terraza",
      "Dos dormitorios con vestidor",
      "Cuarto de servicio con entrada propia",
      "Dos parqueaderos con techo",
      "Zona de juegos infantil en el jardin"
    ],
    ubica: "A 500 m del parque Lleras y a 800 m del centro comercial El Tesoro. Colegios, clinicas y restaurantes a pie en un sector con alta demanda de vivienda."
  };

  detalle["duplex-norte"] = {
    ref: "CC-1087",
    dir: "Avenida 6N # 26-14",
    anno: 2022,
    plantas: 2,
    parcela: "",
    agente: "agente-1",
    thumbs: [
      ["duplex-norte", "fachada del edificio"],
      ["estudio-centro", "interior de la escalera"],
      ["loft-rio", "salon de doble altura"],
      ["atrio-luz", "terraza techada"],
      ["casa-alameda", "cocina abierta"]
    ],
    desc: [
      "Apartamento duplex de 165 m2 en Granada, Cali, en un edificio de 2022 con ascensor y terraza techada comunitaria. La distribucion aprovecha la doble altura para crear un salon aireado con luz de dos alturas.",
      "Tres dormitorios, dos banos completos mas un social, y una cocina abierta con isla. El nivel inferior incluye la terraza de 25 m2 y el deposito.",
      "El conjunto tiene piscina, gimnasio, zonas verdes y vigilancia 24 horas. La venta incluye parqueadero cubierto y una bodega."
    ],
    carac: [
      "Duplex con doble altura en el salon",
      "Terraza privada de 25 m2",
      "Cocina abierta con isla central",
      "Tres dormitorios con closets",
      "Bano social en la zona de dia",
      "Deposito privado en el nivel inferior",
      "Piscina y gimnasio en el edificio",
      "Parqueadero cubierto y vigilancia 24 horas"
    ],
    ubica: "En Granada, a 900 m del Parkway y a 1,2 km del centro comercial. El cable-car y el centro medico mas cercano quedan a menos de quince minutos."
  };
  detalle["casa-encinas"] = {
    ref: "CC-1069",
    dir: "Calle 33 Sur # 42-18",
    anno: 2015,
    plantas: 2,
    parcela: "520 m2",
    agente: "agente-1",
    thumbs: [
      ["casa-encinas", "fachada principal"],
      ["casa-sendero", "jardin lateral"],
      ["casa-robledo", "porche de acceso"],
      ["casa-jardin", "cocina con isla"],
      ["casa-pabellon", "terraza posterior"]
    ],
    desc: [
      "Casa de 295 m2 en Envigado, sobre una parcela de 520 m2 con arbolado adulto. La zona de dia se abre en porche cubierto hacia el jardin, que da a una terraza con arboles.",
      "Distribuye cuatro dormitorios, tres banos y una cocina con isla y despensa. El nivel inferior esta terminado y se puede usar como estudio, taller o apartamento de visitas, con entrada propia.",
      "Dispone de garaje para dos vehiculos, trastero de 12 m2 y programador para el riego y los consumos del servicio."
    ],
    carac: [
      "Porche cubierto hacia el jardin",
      "Jardin con arbolado adulto y cesped",
      "Nivel inferior terminado con acceso propio",
      "Cocina con isla y despensa",
      "Tres banos, dos de ellos en suite",
      "Garaje para dos vehiculos",
      "Trastero de 12 m2",
      "Riego automatico y contador propio"
    ],
    ubica: "A 600 m de la avenida NQS y a 1 km de la estacion de Metrosaban. Colegio, supermercado y farmacia a menos de 250 m, en la parte alta del municipio."
  };

  detalle["estudio-centro"] = {
    ref: "CC-1090",
    dir: "Calle 11 # 5-38",
    anno: 2023,
    plantas: 1,
    parcela: "",
    agente: "agente-2",
    thumbs: [
      ["estudio-centro", "estudio amoblado"],
      ["loft-rio", "distribucion abierta"],
      ["casa-vertical", "cocina equipada"],
      ["casa-alameda", "ventanal al patio"],
      ["atrio-luz", "bano con ducha"]
    ],
    desc: [
      "Estudio de 62 m2 a estrenar en un edificio pequeno del centro, pensado para alquiler por temporada o inversion. Tiene distribucion abierta, cocina equipada y un bano completo.",
      "El ventanal da a un patio interior luminoso, y la ventana superior aporta ventilacion cruzada. Va amoblado, con lavadora, secadora y fibra optica.",
      "El edificio es de 2019, con ascensor, vigilancia y deposito. Se vende totalmente amoblado y con contrato de alquiler vigente hasta fin de ano.",
      "Sirve como primera vivienda, apartamento de huespedes o base de trabajo remoto."
    ],
    carac: [
      "Distribucion abierta de 62 m2",
      "Cocina equipada con electrodomesticos",
      "Amoblado y listo para estrenar",
      "Ventanal al patio interior",
      "Lavadora y secadora incluidas",
      "Fibra optica de 300 Mbps",
      "Deposito en el edificio",
      "Ascensor y vigilancia 24 horas"
    ],
    ubica: "A dos cuadras de la Plaza de Bolivar y a cinco de la Septima. Restaurantes, cafes y tiendas a menos de 300 m."
  };
  detalle["casa-pabellon"] = {
    ref: "CC-1049",
    dir: "Carrera 37 # 8-10",
    anno: 2013,
    plantas: 3,
    parcela: "1.400 m2",
    agente: "agente-3",
    thumbs: [
      ["casa-pabellon", "fachada y jardin"],
      ["casa-robledo", "piscina con cascada"],
      ["casa-jardin", "salon de reuniones"],
      ["casa-encinas", "escalera principal"],
      ["casa-sendero", "terraza de la cubierta"]
    ],
    desc: [
      "La casa mas grande de nuestro catalogo: 520 m2 en tres plantas sobre una parcela de 1.400 m2 en Envigado. El jardin tiene piscina con cascada, clima humedo y un quiosco de madera a la sombra de los arboles.",
      "La planta baja concentra el salon de 70 m2 con chimenea, el comedor y la cocina de 30 m2. Dos dormitorios con vestidor y un baño completo quedan en la segunda planta; los cuatro restantes, con suites, en la tercera.",
      "Incluye casa de servicio independiente de 40 m2, garaje para cuatro vehiculos, cuadra de mascotas y un cuarto de equipos con generador."
    ],
    carac: [
      "Parcela de 1.400 m2 con arbolado",
      "Piscina con cascada y clima humedo",
      "Salon de 70 m2 con chimenea",
      "Cocina de 30 m2 con isla de granito",
      "Casa de servicio independiente de 40 m2",
      "Garaje para cuatro vehiculos",
      "Riego y agua de recirculacion de la piscina",
      "Cuarto de equipos con generador electrico"
    ],
    ubica: "En el sector de Tomas Lerma, a 1 km del centro comercial El Abra y a 1,4 km del Parkway. Colegio privado y clinicas a menos de 500 m."
  };
  detalle["casa-sendero"] = {
    ref: "CC-1082",
    dir: "Calle 32 # 8-15",
    anno: 2021,
    plantas: 2,
    parcela: "460 m2",
    agente: "agente-3",
    thumbs: [
      ["casa-sendero", "fachada con jardin"],
      ["casa-jardin", "porche y terraza"],
      ["casa-encinas", "cocina abierta"],
      ["atrio-luz", "patio interior"],
      ["casa-robledo", "jardin posterior"]
    ],
    desc: [
      "Casa de 260 m2 en El Poblado, construida en 2021 sobre una parcela de 460 m2. Es compacta y luminosa: la fachada tiene pocos muros ciegos, de modo que el jardin entra desde la cocina y el comedor.",
      "Cuatro dormitorios y dos banos ocupan el nivel superior; la zona de dia y una terraza de 30 m2 quedan abajo. La cocina tiene isla y salida directa al jardin.",
      "El jardin esta nivelado, con cesped y arboles jovenes. Dos parqueaderos cubiertos y trastero."
    ],
    carac: [
      "Jardin nivelado de 460 m2",
      "Terraza de 30 m2 con toldo",
      "Cocina con isla y salida al jardin",
      "Dormitorio principal con vestidor",
      "Dos baños completos",
      "Luz natural en todos los ambientes",
      "Dos parqueaderos cubiertos",
      "Trastero de 8 m2"
    ],
    ubica: "A 450 m del parque Lleras y a 700 m de la estacion de Metro. Colegio, farmacia y supermercado en las cuadras siguientes."
  };

  detalle["atrio-luz"] = {
    ref: "CC-1051",
    dir: "Calle 82 # 11-46",
    anno: 2019,
    plantas: 3,
    parcela: "420 m2",
    agente: "agente-2",
    thumbs: [
      ["atrio-luz", "atrio con losa de vidrio"],
      ["atlas-panoramico", "terraza de 90 m2"],
      ["casa-vertical", "escalera del atrio"],
      ["casa-alameda", "dormitorios en suite"],
      ["casa-jardin", "piscina de la terraza"]
    ],
    desc: [
      "Atico de 245 m2 en Chapinero Alto, con un atrio central cubierto por una losa de vidrio que lleva luz natural hasta el nivel inferior. La distribucion gira en torno a ese vacio.",
      "La terraza de 90 m2 es la pieza central: tiene piscina pequeña, zona de barbacoa y vistas abiertas al norte. En el interior, cuatro dormitorios en suite y un estudio de 25 m2.",
      "El edificio, de 2019, tiene ascensor, gimnasio, sala de reuniones y control de acceso con video. Dos parqueaderos."
    ],
    carac: [
      "Atrio central con losa de vidrio",
      "Terraza de 90 m2 con piscina",
      "Barbacoa y zona de estar exterior",
      "Cuatro dormitorios en suite",
      "Estudio de 25 m2 con salida al atrio",
      "Vistas abiertas al norte",
      "Gimnasio y sala de reuniones",
      "Dos parqueaderos y control con video"
    ],
    ubica: "En Chapinero Alto, a 800 m de la estacion de Transmilenio de la 71 y a 1 km del parque de la 93. Colegio, mercado y farmacia a menos de 300 m."
  };

  var byId = {};
  props.forEach(function (p) { byId[p.id] = p; });

  function prop(id) { return byId[id]; }

  /* La ficha abierta: se lee de ?id=. Sin parametro, o con uno desconocido,
     cae en la primera vivienda para que la pagina nunca quede vacia. */
  function actual() {
    var id = new URLSearchParams(location.search).get("id");
    return byId[id] || props[0];
  }

  /* Ficha completa de una vivienda: su tarjeta, su detalle y los valores
     calculados que dependen del precio. */
  function fichaDe(id) {
    var p = prop(id) || props[0];
    var d = detalle[p.id] || {};
    return {
      p: p,
      ref: d.ref || "CC-0000",
      dir: d.dir || "",
      anno: d.anno || 2024,
      plantas: d.plantas || 1,
      parcela: d.parcela || "",
      agente: d.agente || "agente-1",
      thumbs: d.thumbs || [],
      desc: d.desc || [],
      carac: d.carac || [],
      ubica: d.ubica || "",
      m2Precio: Math.round(p.precio / p.m2),
      cuota: cuota(p.precio)
    };
  }

  /* Precio por m2 en pesos, sin decimales. */
  function m2Precio(p) { return Math.round(p.precio / p.m2); }

  /* Cuota mensual orientativa: 80% del precio, 30 anos, 10,9% efectivo anual. */
  var FINANCIACION = { cuota: 0.8, anios: 30, eae: 0.109 };
  function cuota(precio) {
    var i = Math.pow(1 + FINANCIACION.eae, 1 / 12) - 1;
    var n = FINANCIACION.anios * 12;
    var capital = precio * FINANCIACION.cuota;
    return Math.round(capital * i / (1 - Math.pow(1 + i, -n)));
  }

  /* Tres viviendas parecidas: primero las de la misma zona, luego las mas
     cercanas en precio. Siempre distintas de la que se esta viendo. */
  function similaresDe(id, cuantos) {
    var p = prop(id);
    var n = cuantos || 3;
    return props
      .filter(function (x) { return x.id !== id; })
      .map(function (x) {
        var distancia = Math.abs(x.precio - p.precio) / p.precio;
        var mismaZona = x.zona === p.zona ? 0 : 0.5;
        var mismoTipo = x.tipo === p.tipo ? 0 : 0.15;
        return { p: x, peso: distancia + mismaZona + mismoTipo };
      })
      .sort(function (a, b) { return a.peso - b.peso; })
      .slice(0, n)
      .map(function (x) { return x.p; });
  }

  /* Agentes indexados por su clave para resolver la ficha. */
  function agenteDe(clave) {
    var lista = api.agents;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].img === clave) return lista[i];
    }
    return lista[0];
  }

  /* Etiquetas de los filtros, en el mismo orden que el HTML */
  var TIPO = {
    casa: "Casa",
    apartamento: "Apartamento",
    atico: "Atico",
    villa: "Villa",
    loft: "Loft",
    terraza: "Terraza",
    jardin: "Jardin",
    piscina: "Piscina",
    garaje: "Garaje",
    ascensor: "Ascensor",
    centro: "Centro, Bogota",
    chapinero: "Chapinero",
    santafe: "Santa Fe",
    cali: "Granada, Cali",
    elpoblado: "El Poblado",
    envigado: "Envigado"
  };

  var api = {
    base: base,
    path: path,
    svg: svg,
    img: img,
    esc: esc,
    ICON: ICON,
    TIPO: TIPO,
    props: props,
    prop: prop,
    byId: byId,
    detalle: detalle,
    actual: actual,
    fichaDe: fichaDe,
    m2Precio: m2Precio,
    cuota: cuota,
    FINANCIACION: FINANCIACION,
    similaresDe: similaresDe,
    agenteDe: agenteDe,

    /* Portada */
    hero: "hero",
    promo: "casa-vertical",
    featured: [
      {
        "id": "casa-alameda",
        "delay": 0
      },
      {
        "id": "loft-rio",
        "delay": 1
      },
      {
        "id": "casa-pabellon",
        "delay": 2
      },
      {
        "id": "atlas-panoramico",
        "delay": 0
      },
      {
        "id": "casa-jardin",
        "delay": 1
      },
      {
        "id": "duplex-norte",
        "delay": 2
      }
    ],
    cats: [
      {
        "href": "pages/properties.html?tipo=casa",
        "delay": 0,
        "img": "casa-robledo",
        "kicker": "624 propiedades",
        "titulo": "Casas",
        "texto": "Unifamiliares, adosadas y pareadas con jardin, piscina o vistas abiertas.",
        "cta": "Ver casas"
      },
      {
        "href": "pages/properties.html?tipo=apartamento",
        "delay": 1,
        "img": "atrio-luz",
        "kicker": "489 propiedades",
        "titulo": "Apartamentos",
        "texto": "Lofts, duplex y pisos luminosos en barrios con vida y servicios a pie.",
        "cta": "Ver apartamentos"
      },
      {
        "href": "pages/properties.html?tipo=atico",
        "delay": 2,
        "img": "atlas-panoramico",
        "kicker": "127 propiedades",
        "titulo": "Aticos y villas",
        "texto": "Vida de alta gama con terraza, vistas privilegiadas y acabados premium.",
        "cta": "Ver todo"
      }
    ],
    quotes: [
      {
        "delay": 0,
        "texto": "Buscabamos algo con luz por la tarde y acabamos en un duplex que no desbordaba el presupuesto. Nos dejaron claros todos los detalles del precio, incluidos los gastos de administracion.",
        "img": "agente-2",
        "autor": "Marta y Javier",
        "rol": "Compradores, Cali"
      },
      {
        "delay": 1,
        "texto": "Vendimos la casa de mi madre y no queríamos complicarnos. Nos ocuparon de las licencias, el aviso y tres visitas en dos semanas. Todo muy ordenado.",
        "img": "agente-4",
        "autor": "Elena Ruiz",
        "rol": "Vendedora, Chapinero"
      },
      {
        "delay": 2,
        "texto": "Nos enseñaron tres casas antes de esta. Aquí nadie presionó. Nos enseñaron tambien una que no nos encajaba, y eso es justamente lo que valoramos.",
        "img": "agente-1",
        "autor": "Andres Molina",
        "rol": "Comprador, Envigado"
      }
    ],
    agents: [
      {
        "delay": 0,
        "img": "agente-1",
        "alt": "Retrato de Lucia Ferrer",
        "w": 88,
        "h": 88,
        "nombre": "Lucia Ferrer",
        "cargo": "Directora comercial",
        "tel": "tel:+573001111222",
        "mail": "mailto:lucia@casacielo.com.co"
      },
      {
        "delay": 1,
        "img": "agente-2",
        "alt": "Retrato de Diego Sanchez",
        "w": 88,
        "h": 88,
        "nombre": "Diego Sanchez",
        "cargo": "Especialista en obra nueva",
        "tel": "tel:+573002222333",
        "mail": "mailto:diego@casacielo.com.co"
      },
      {
        "delay": 2,
        "img": "agente-3",
        "alt": "Retrato de Carmen Ortiz",
        "w": 88,
        "h": 88,
        "nombre": "Carmen Ortiz",
        "cargo": "Zonas residenciales",
        "tel": "tel:+573003333444",
        "mail": "mailto:carmen@casacielo.com.co"
      }
    ],

    /* La ficha se construye con fichaDe() y estos thumbnail son solo un
       respaldo para cuando se abre la pagina sin ?id=. */
    thumbs: [
      {
        "img": "casa-alameda",
        "alt": "Casa Alameda, fachada principal"
      },
      {
        "img": "loft-rio",
        "alt": "Casa Alameda, salon con doble altura"
      },
      {
        "img": "atrio-luz",
        "alt": "Casa Alameda, patio central"
      },
      {
        "img": "estudio-centro",
        "alt": "Casa Alameda, estudio con vista al patio"
      },
      {
        "img": "casa-vertical",
        "alt": "Casa Alameda, terraza y pergola"
      }
    ],
    similares: [
      "casa-robledo",
      "casa-jardin",
      "casa-sendero"
    ]
  };

  return api;
})();
