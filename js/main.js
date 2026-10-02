/* ==========================================================================
   Casa & Cielo — Comportamiento de la plantilla
   Vanilla JS, sin dependencias.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ======================================================================
     Renderizado desde js/data.js
     El HTML solo trae marcadores; las imagenes y las listas se dibujan aqui.
     ====================================================================== */
  function D() { return window.CC; }

  function fichaHref() {
    return D().base ? "property.html" : "pages/property.html";
  }

  function imgHTML(key, alt, w, h, eager) {
    return D().img(key, alt, w, h, "", !eager);
  }

  function revealAttrs(delay) {
    return " data-reveal" + (delay ? ' data-reveal-delay="' + delay + '"' : "");
  }

  /* --- Marcadores sueltos: <span data-img="hero"></span> ---
     Se sustituyen por el <img> en jpeg que genera CC.img(). */
  function initImages() {
    $$("[data-img]").forEach(function (el) {
      var holder = document.createElement("div");
      holder.innerHTML = D().img(
        el.dataset.img,
        el.dataset.alt || "",
        el.dataset.w ? Number(el.dataset.w) : 0,
        el.dataset.h ? Number(el.dataset.h) : 0,
        el.className || "",
        !el.dataset.eager
      );

      var img = holder.firstElementChild;

      /* Conserva los data-* que consume el JS (data-gallery-main, etc.) */
      Object.keys(el.dataset).forEach(function (k) {
        if (k === "img" || k === "alt" || k === "w" || k === "h" || k === "eager") return;
        var attr = "data-" + k.replace(/[A-Z]/g, function (c) { return "-" + c.toLowerCase(); });
        img.setAttribute(attr, el.getAttribute(attr) || el.dataset[k]);
      });
      if (el.getAttribute("aria-hidden") !== null) img.setAttribute("aria-hidden", "true");

      el.parentNode.replaceChild(img, el);
    });
  }

  /* --- Tarjeta de vivienda, compartida por las tres paginas --- */
  function cardHTML(p, o) {
    var D2 = D();
    var esc = D2.esc;
    if (!p) return "";
    o = o || {};

    var attrs = [
      'class="card"',
      'data-type="' + esc(p.tipo) + '"',
      'data-zona="' + esc(p.zona) + '"',
      'data-precio="' + p.precio + '"',
      'data-hab="' + p.hab + '"',
      'data-m2="' + p.m2 + '"',
      'data-extra="' + esc(p.extra.join(" ")) + '"'
    ];
    if (o.reveal) attrs.push(revealAttrs(o.delay).trim());

    var precio = p.precioAntesTxt
      ? '<p class="card__price">' + esc(p.precioTxt) + " <del>" + esc(p.precioAntesTxt) + "</del></p>"
      : '<p class="card__price">' + esc(p.precioTxt) + "</p>";

    return "<article " + attrs.join(" ") + ">" +
      '<div class="card__media">' +
      imgHTML(p.img, p.alt, 1200, 800) +
      '<div class="card__tags">' + p.tags.map(function (tag) {
        return '<span class="' + esc(tag.cls) + '">' + esc(tag.text) + "</span>";
      }).join("") + "</div>" +
      '<button class="card__fav" type="button" aria-label="Guardar ' + esc(p.nombre) + '" data-fav>' + D2.svg("heart") + "</button>" +
      '<span class="card__gallery-count">' + D2.svg("camera") + p.fotos + "</span>" +
      "</div>" +
      '<div class="card__body">' + precio +
      '<h3 class="card__title"><a href="' + esc(o.href || fichaHref() + "?id=" + encodeURIComponent(p.id)) + '">' + esc(p.nombre) + "</a></h3>" +
      '<p class="card__loc">' + D2.svg("pin") + esc(p.loc) + "</p>" +
      '<ul class="card__meta">' +
      "<li>" + D2.svg("bed") + "<b>" + p.hab + "</b> hab.</li>" +
      "<li>" + D2.svg("bath") + "<b>" + p.banos + "</b> " + (p.banos === 1 ? "bano" : "banos") + "</li>" +
      "<li>" + D2.svg("area") + "<b>" + p.m2 + "</b> m&sup2;</li>" +
      "</ul>" +
      "</div>" +
      "</article>";
  }

  var RENDER = {
    /* Listado completo: 12 fichas */
    props: function (D2) {
      return D2.props.map(function (p) { return cardHTML(p); }).join("");
    },

    /* Portada: 6 destacadas con animacion escalonada */
    destacados: function (D2) {
      return D2.featured.map(function (f) {
        return cardHTML(D2.prop(f.id), { reveal: true, delay: f.delay });
      }).join("");
    },

    /* Ficha: 3 propiedades similares, las mas parecidas a la que se mira */
    similares: function (D2) {
      return D2.similaresDe(D2.actual().id, 3).map(function (p) { return cardHTML(p); }).join("");
    },

    /* Portada: 3 categorias */
    cats: function (D2) {
      var esc = D2.esc;
      return D2.cats.map(function (c) {
        return '<a class="cat" href="' + esc(c.href) + '"' + revealAttrs(c.delay) + ">" +
          imgHTML(c.img, "", 1200, 800) +
          '<div class="cat__inner">' +
          '<span class="cat__kicker">' + esc(c.kicker) + "</span>" +
          "<h3>" + esc(c.titulo) + "</h3>" +
          "<p>" + esc(c.texto) + "</p>" +
          '<span class="cat__count">' + esc(c.cta) + " " + D2.svg("arrow") + "</span>" +
          "</div></a>";
      }).join("");
    },

    /* Portada: 3 testimonios */
    quotes: function (D2) {
      var esc = D2.esc;
      var stars = "";
      for (var i = 0; i < 5; i++) stars += D2.svg("star");
      return D2.quotes.map(function (q) {
        return '<figure class="quote"' + revealAttrs(q.delay) + ">" +
          '<div class="quote__mark" aria-hidden="true">&ldquo;</div>' +
          '<div class="stars" aria-label="5 de 5 estrellas">' + stars + "</div>" +
          "<blockquote><p>" + esc(q.texto) + "</p></blockquote>" +
          '<figcaption class="quote__author">' + imgHTML(q.img, "", 44, 44) +
          "<span><b>" + esc(q.autor) + "</b><span>" + esc(q.rol) + "</span></span>" +
          "</figcaption></figure>";
      }).join("");
    },

    /* Portada: 3 agentes */
    agentes: function (D2) {
      var esc = D2.esc;
      return D2.agents.map(function (a) {
        return '<article class="agent__card"' + revealAttrs(a.delay) + ">" +
          imgHTML(a.img, a.alt, a.w, a.h) +
          "<h3>" + esc(a.nombre) + "</h3>" +
          "<span>" + esc(a.cargo) + "</span>" +
          '<div class="agent__contact">' +
          '<a class="icon-btn" href="' + esc(a.tel) + '" aria-label="Llamar a ' + esc(a.nombre) + '">' + D2.svg("phone") + "</a>" +
          '<a class="icon-btn" href="' + esc(a.mail) + '" aria-label="Escribir a ' + esc(a.nombre) + '">' + D2.svg("mail") + "</a>" +
          "</div></article>";
      }).join("");
    },

    /* Ficha: miniaturas de la galeria */
    galeriaThumbs: function (D2) {
      var f = fichaActual();
      return f.thumbs.map(function (t, i) {
        return '<button class="gallery__thumb' + (i === 0 ? " is-active" : "") +
          '" type="button" aria-label="Ver foto ' + (i + 1) + '" data-alt="' +
          D2.esc(f.p.nombre + ", " + t[1]) + '">' +
          imgHTML(t[0], "", 480, 360) + "</button>";
      }).join("");
    },

    /* Ficha: agente asignado */
    agenteFicha: function (D2) {
      var a = D2.agenteDe(fichaActual().agente);
      return imgHTML(a.img, "", 52, 52) +
        "<div><b>" + D2.esc(a.nombre) + "</b><span>Agente asignada &middot; " + D2.esc(a.tel.replace("tel:", "").replace(/\s/g, " ")) + "</span></div>";
    },

    /* Ficha: las seis especificaciones */
    specs: function (D2) {
      var f = fichaActual();
      var p = f.p;
      var esc = D2.esc;
      var items = [
        ["bed", p.hab, "Dormitorios"],
        ["bath", p.banos, "Banos"],
        ["area", p.m2, "Metros"],
        ["home", f.plantas, "Plantas"],
        ["clock", f.anno, "Anio"],
        ["bath", esc(f.m2Precio), "COP/m&sup2;"]
      ];
      return items.map(function (it) {
        return '<li class="spec">' + D2.svg(it[0]) + "<b>" + it[1] + "</b><span>" + it[2] + "</span></li>";
      }).join("");
    },

    /* Ficha: parrafos de la descripcion */
    desc: function (D2) {
      return fichaActual().desc.map(function (t) { return "<p>" + D2.esc(t) + "</p>"; }).join("");
    },

    /* Ficha: lista de caracteristicas */
    carac: function (D2) {
      var check = D2.ICON.check;
      return fichaActual().carac.map(function (t) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round">' + check + "</svg>" + D2.esc(t) + "</li>";
      }).join("");
    },

    /* Ficha: lista de la financiacion */
    finLista: function (D2) {
      var f = fichaActual();
      var check = D2.ICON.check;
      var lineas = [
        "Prestamo hipotecario: ingresos minimos de " + Math.round(f.p.precio / 1380 / 1000000) + " millones COP",
        "Subrogacion: avaluo comercial vigente",
        "Gastos de compra: retencion en la fuente, escritura y matricula"
      ];
      return lineas.map(function (t) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
          'stroke-linecap="round" stroke-linejoin="round">' + check + "</svg>" + D2.esc(t) + "</li>";
      }).join("");
    },

    /* Ficha: distintivos sobre la foto */
    badges: function (D2) {
      var f = fichaActual();
      var primero = f.p.tags[0] || { text: "Venta" };
      return '<span class="' + D2.esc(primero.cls) + '">' + D2.esc(primero.text) + "</span>" +
        '<span class="tag">Referencia ' + D2.esc(f.ref) + "</span>";
    },

    /* Ficha: tarjeta del mapa */
    mapa: function (D2) {
      var f = fichaActual();
      return D2.svg("pin") +
        "<span>" + D2.esc(direccionCompleta(f)) + "<br><small>Ubicacion aproximada en la plantilla</small></span>";
    }
  };

  /* La ficha que se esta viendo ahora mismo, con sus valores ya resueltos. */
  function fichaActual() {
    return D().fichaDe(D().actual().id);
  }

  function direccionCompleta(f) {
    return f.dir ? f.dir + ", " + f.p.loc : f.p.loc;
  }

  /* Rellena los huecos de texto sueltos: <span data-bind="nombre"></span> */
  function initBind() {
    var f = fichaActual();
    var p = f.p;
    var esc = D().esc;
    var valores = {
      nombre: p.nombre,
      titulo: p.nombre + " en venta | " + p.precioTxt + " | Casa & Cielo",
      ref: f.ref,
      zona: p.loc,
      zonaHref: "properties.html?zona=" + p.zona,
      direccion: direccionCompleta(f),
      dir: f.dir,
      ubicaTexto: f.ubica,
      precio: p.precioTxt,
      m2Precio: esc(f.m2Precio),
      cuota: esc(f.cuota),
      metaDesc: p.nombre + " en " + p.loc + ". " + p.hab + " dormitorios, " + p.banos +
        " banos y " + p.m2 + " m2. Precio " + p.precioTxt.replace("$ ", "") +
        " pesos. Referencia " + f.ref + "."
    };

    $$("[data-bind]").forEach(function (el) {
      var clave = el.dataset.bind;
      if (!(clave in valores)) return;
      if (el.tagName === "META") {
        el.setAttribute("content", valores[clave]);
      } else if (el.tagName === "A") {
        el.href = valores[clave];
        if (el.dataset.bindText) el.textContent = valores[el.dataset.bindText];
      } else {
        el.textContent = valores[clave];
      }
    });

    /* La foto grande de la galeria tambien depende de la vivienda abierta */
    var main = $("[data-gallery-main]");
    if (main) {
      main.dataset.img = p.img;
      main.dataset.alt = p.nombre + ", fachada principal";
      main.dataset.w = 1200;
      main.dataset.h = 800;
    }
  }

  function initRender() {
    if (!window.CC) return;
    $$("[data-render]").forEach(function (el) {
      var fn = RENDER[el.dataset.render];
      if (!fn) return;
      el.innerHTML = fn(D());
      if (el.hasAttribute("aria-busy")) el.setAttribute("aria-busy", "false");
    });
  }

  /* ---------------- Año del pie de pagina ---------------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------- Header fijo con sombra ---------------- */
  function initStickyHeader() {
    var header = $("#header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Menu movil ---------------- */
  function initMobileNav() {
    var burger = $("#burger");
    var nav = $("#nav");
    var backdrop = $("#navBackdrop");
    if (!burger || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
      if (backdrop) {
        backdrop.hidden = false;
        requestAnimationFrame(function () {
          backdrop.classList.toggle("is-open", open);
        });
      }
      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------------- Animaciones al hacer scroll ---------------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Favoritos ---------------- */
  function initFavorites() {
    var saved = readStore("cc:favs", {});
    $$("[data-fav]").forEach(function (btn) {
      var card = btn.closest(".card");
      var key = card ? card.querySelector(".card__title").textContent.trim() : "";
      if (saved[key]) btn.classList.add("is-active");
      btn.addEventListener("click", function () {
        var on = btn.classList.toggle("is-active");
        saved[key] = on;
        writeStore("cc:favs", saved);
        var counter = $("[data-save-count]");
        if (counter) {
          counter.textContent = String(Object.keys(saved).filter(Boolean).length);
        }
      });
    });
    var counter = $("[data-save-count]");
    if (counter) {
      counter.textContent = String(Object.keys(saved).filter(Boolean).length);
    }
  }

  /* ---------------- Buscador de la portada ---------------- */
  function initHomeSearch() {
    var form = $("#searchForm");
    if (!form) return;

    var tabs = $$(".searchbar__tab", form);
    var tipo = $("#tipo", form);
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        if (!tipo) return;
        var v = tab.dataset.type;
        tipo.value = v === "all" ? "" : v;
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var params = new URLSearchParams();
      if ($("#q", form).value.trim()) params.set("q", $("#q", form).value.trim());
      if (tipo && tipo.value) params.set("tipo", tipo.value);
      if ($("#precio", form).value) params.set("precio", $("#precio", form).value);
      if ($("#hab", form).value) params.set("hab", $("#hab", form).value);
      var qs = params.toString();
      window.location.href = "pages/properties.html" + (qs ? "?" + qs : "");
    });
  }

  /* ---------------- Filtros del listado ---------------- */
  function initListing() {
    var grid = $("[data-property-grid]");
    if (!grid) return;

    var form = $("#filtersForm");
    var sort = $("#sort");
    var countEl = $("[data-result-count]");
    var emptyEl = $("[data-empty]");
    var chipsEl = $("[data-chips]");
    var pager = $("[data-pagination]");
    var pageSize = parseInt(grid.dataset.pageSize || "6", 10);
    var page = 1;

    var all = $$(".card", grid);
    all.forEach(function (card, i) {
      card.dataset.order = String(i);
      card.dataset.name = (card.querySelector(".card__title") || {}).textContent || "";
    });

    /* Las etiquetas salen de js/data.js para que filtros y chips no se desincronicen */
    var labels = window.CC ? window.CC.TIPO : {};

    function checkedValues(name) {
      return $$('input[name="' + name + '"]:checked', form).map(function (i) { return i.value; });
    }

    function matches(card) {
      var tipos = checkedValues("tipo");
      if (tipos.length && tipos.indexOf(card.dataset.type) === -1) return false;

      var zona = card.dataset.zona || "";
      var zonas = checkedValues("zona");
      if (zonas.length && zonas.indexOf(zona) === -1) return false;

      var habMin = checkedValues("hab").map(Number);
      if (habMin.length) {
        var hab = parseInt(card.dataset.hab, 10) || 0;
        var ok = habMin.some(function (min) { return hab >= min; });
        if (!ok) return false;
      }

      var extras = checkedValues("extra");
      if (extras.length) {
        var have = (card.dataset.extra || "").split(/\s+/);
        var okEx = extras.every(function (e) { return have.indexOf(e) !== -1; });
        if (!okEx) return false;
      }

      var max = $("#f-price", form) ? $("#f-price", form).value : "";
      if (max && parseInt(card.dataset.precio, 10) > parseInt(max, 10)) return false;

      var q = $("#f-q", form) ? $("#f-q", form).value.trim().toLowerCase() : "";
      if (q) {
        var hay = (card.textContent + " " + (card.dataset.zona || "")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }

    function sortCards(list) {
      var mode = sort ? sort.value : "destacado";
      return list.sort(function (a, b) {
        if (mode === "precio-asc") return a.dataset.precio - b.dataset.precio;
        if (mode === "precio-desc") return b.dataset.precio - a.dataset.precio;
        if (mode === "m2-desc") return b.dataset.m2 - a.dataset.m2;
        return a.dataset.order - b.dataset.order;
      });
    }

    function renderChips() {
      if (!chipsEl) return;
      var active = [];
      $$("input[type=checkbox]:checked", form).forEach(function (i) {
        active.push({ key: i.value, name: i.name, label: labels[i.value] || i.value });
      });
      if ($("#f-price", form).value) {
        active.push({ key: "precio", name: "precio", label: "Max. " + $("#f-price", form).selectedOptions[0].textContent });
      }
      if (!active.length) {
        chipsEl.hidden = true;
        chipsEl.innerHTML = "";
        return;
      }
      chipsEl.hidden = false;
      chipsEl.innerHTML = active.map(function (a) {
        return '<span class="chip">' + a.label +
          '<button type="button" data-chip="' + a.name + '" data-value="' + a.key +
          '" aria-label="Quitar filtro ' + a.label + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
          '</button></span>';
      }).join("");
    }

    function renderPager(total) {
      if (!pager) return;
      var pages = Math.max(1, Math.ceil(total / pageSize));
      if (pages <= 1) { pager.innerHTML = ""; return; }
      var html = '<button type="button" data-page="prev"' + (page === 1 ? " disabled" : "") +
        ' aria-label="Pagina anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>';
      for (var p = 1; p <= pages; p++) {
        html += '<button type="button" data-page="' + p + '"' + (p === page ? ' class="is-active" aria-current="page"' : "") + ">" + p + "</button>";
      }
      html += '<button type="button" data-page="next"' + (page === pages ? " disabled" : "") +
        ' aria-label="Pagina siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>';
      pager.innerHTML = html;
    }

    function apply(resetPage) {
      if (resetPage) page = 1;
      var list = sortCards(all.filter(matches));
      var pages = Math.max(1, Math.ceil(list.length / pageSize));
      if (page > pages) page = pages;
      var visible = list.slice((page - 1) * pageSize, page * pageSize);

      all.forEach(function (c) { c.hidden = true; });
      visible.forEach(function (c) { c.hidden = false; });

      /* Reordena el DOM para que el orden visual coincida con el criterio */
      list.forEach(function (c) { grid.appendChild(c); });

      if (countEl) countEl.textContent = String(list.length);
      if (emptyEl) emptyEl.hidden = list.length > 0;
      renderChips();
      renderPager(list.length);
    }

    if (form) {
      form.addEventListener("change", function () { apply(true); });
      form.addEventListener("input", function (e) {
        if (e.target.type === "search") apply(true);
      });
      form.addEventListener("submit", function (e) { e.preventDefault(); apply(true); });
    }
    if (sort) sort.addEventListener("change", function () { apply(true); });

    document.addEventListener("click", function (e) {
      var reset = e.target.closest("[data-reset]");
      if (reset) {
        if (form) form.reset();
        if (sort) sort.value = "destacado";
        apply(true);
        return;
      }
      var chip = e.target.closest("[data-chip]");
      if (chip && form) {
        var name = chip.dataset.chip;
        if (name === "precio") {
          $("#f-price", form).value = "";
        } else {
          var input = $('input[name="' + name + '"][value="' + chip.dataset.value + '"]', form);
          if (input) input.checked = false;
        }
        apply(true);
        return;
      }
      var pg = e.target.closest("[data-page]");
      if (pg && !pg.disabled) {
        var v = pg.dataset.page;
        if (v === "prev") page = Math.max(1, page - 1);
        else if (v === "next") page = page + 1;
        else page = parseInt(v, 10);
        apply(false);
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    /* Parametros de la URL */
    var params = new URLSearchParams(window.location.search);
    if (params.get("tipo") && form) {
      var ti = $('input[name="tipo"][value="' + params.get("tipo") + '"]', form);
      if (ti) ti.checked = true;
    }
    if (params.get("zona") && form) {
      var zi = $('input[name="zona"][value="' + params.get("zona") + '"]', form);
      if (zi) zi.checked = true;
    }
    if (params.get("hab") && form) {
      var hi = $('input[name="hab"][value="' + params.get("hab") + '"]', form);
      if (hi) hi.checked = true;
    }
    if (params.get("precio") && $("#f-price", form)) {
      $("#f-price", form).value = params.get("precio");
    }
    if (params.get("q") && $("#f-q", form)) {
      $("#f-q", form).value = params.get("q");
    }

    apply(true);
  }

  /* ---------------- Panel de filtros en movil ---------------- */
  function initFiltersDrawer() {
    var panel = $("#filters");
    var open = $("[data-filters-open]");
    var close = $("[data-filters-close]");
    var backdrop = $("#filtersBackdrop");
    if (!panel || !open) return;

    function setOpen(state) {
      panel.classList.toggle("is-open", state);
      if (backdrop) {
        backdrop.hidden = false;
        requestAnimationFrame(function () { backdrop.classList.toggle("is-open", state); });
      }
      document.body.style.overflow = state ? "hidden" : "";
    }

    open.addEventListener("click", function () { setOpen(true); });
    if (close) close.addEventListener("click", function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------------- Galeria de la ficha ---------------- */
  function initGallery() {
    var gallery = $("[data-gallery]");
    if (!gallery) return;
    var main = $("[data-gallery-main]", gallery);
    var thumbs = $$("[data-gallery-thumb], .gallery__thumb", gallery);
    if (!main || !thumbs.length) return;
    var index = 0;

    function show(i) {
      index = (i + thumbs.length) % thumbs.length;
      var t = thumbs[index];
      main.src = t.querySelector("img").getAttribute("src");
      main.alt = t.dataset.alt || main.alt;
      thumbs.forEach(function (x, n) { x.classList.toggle("is-active", n === index); });
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); });
    });
    var prev = $("[data-gallery-prev]", gallery);
    var next = $("[data-gallery-next]", gallery);
    if (prev) prev.addEventListener("click", function () { show(index - 1); });
    if (next) next.addEventListener("click", function () { show(index + 1); });
  }

  /* ---------------- Pestanas ---------------- */
  function selectTab(buttons, panels, key) {
    buttons.forEach(function (b) {
      var on = b.dataset.tab === key;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (p) {
      p.hidden = p.dataset.panel !== key;
    });
  }

  function initTabs() {
    $$(".tabs").forEach(function (tabBar) {
      /* Los paneles se buscan en el bloque que contiene la barra, para que dos
         grupos de pestanas en la misma pagina no se pisen. */
      var block = tabBar.parentNode;
      var buttons = $$("[data-tab]", tabBar);
      var panels = $$("[data-panel]", block);
      if (!buttons.length || !panels.length) return;

      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          selectTab(buttons, panels, btn.dataset.tab);
        });
      });

      /* Enlaces dentro del texto ("¿Todavia no tienes cuenta? Crear una"). */
      $$("[data-tab-jump]", block).forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          selectTab(buttons, panels, link.dataset.tabJump);
        });
      });
    });
  }

  /* ---------------- Ver / ocultar contrasena ---------------- */
  function initPasswordToggles() {
    $$("[data-password-toggle]").forEach(function (btn) {
      var input = btn.parentNode.querySelector("[data-password]");
      if (!input) return;
      btn.addEventListener("click", function () {
        var visible = input.type === "text";
        input.type = visible ? "password" : "text";
        btn.setAttribute("aria-pressed", visible ? "false" : "true");
        btn.setAttribute("aria-label", visible ? "Mostrar contrasena" : "Ocultar contrasena");
      });
    });
  }

  /* ---------------- Formularios (plantilla) ---------------- */
  function initForms() {
    $$("form").forEach(function (form) {
      var status = form.querySelector("[data-form-status]");
      if (!status) return;
      var ok = form.dataset.formOk || "Gracias. Te contactamos en menos de 24 horas laborables.";
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          status.textContent = "Revisa los campos obligatorios.";
          return;
        }
        status.textContent = ok;
        form.reset();
      });
    });

    $$("[data-newsletter]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var btn = form.querySelector("button");
        if (btn) btn.innerHTML = "&#10003;";
        form.reset();
      });
    });
  }

  /* ---------------- Utilidades de almacenamiento ---------------- */
  function readStore(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      /* modo privado: se ignora */
    }
  }

  /* ---------------- Arranque ---------------- */
  function boot() {
    initBind();
    initImages();
    initRender();
    initYear();
    initStickyHeader();
    initMobileNav();
    initReveal();
    initFavorites();
    initHomeSearch();
    initListing();
    initFiltersDrawer();
    initGallery();
    initTabs();
    initPasswordToggles();
    initForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
