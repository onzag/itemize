const en = `[en]
name = article
fts_search_field_label = search article
fts_search_field_placeholder = insert relevant information about the article

custom.read_more = read more....

properties.summary.label = summary
properties.summary.placeholder = write a short summary about the article
properties.summary.error.TOO_LARGE = summary is too long
properties.summary.error.NOT_NULLABLE = summary can't be blank

properties.locale.label = locale
properties.locale.search.label = locale
properties.locale.placeholder = the locale this article is intented to be published
properties.locale.search.placeholder = the locale of the article
properties.locale.description = The locale is either a language, eg. en, a country code eg. US or a combination en-US
properties.locale.error.NOT_NULLABLE = the locale cannot be empty
properties.locale.error.INVALID_SUBTYPE_VALUE = invalid locale`

const es = `[es]
name = artículo
fts_search_field_label = buscar artículo
fts_search_field_placeholder = inserte información relevante

custom.read_more = leer más...

properties.summary.label = sumario
properties.summary.placeholder = escriba un sumario corto sobre el artículo
properties.summary.error.TOO_LARGE = el sumario es demasiado largo
properties.summary.error.NOT_NULLABLE = el sumario no puede quedar vacío

properties.locale.label = regionalización
properties.locale.search.label = región
properties.locale.placeholder = la región localizada en la que el artículo va a ser publicado
properties.locale.search.placeholder = la región del artículo a buscar
properties.locale.description = La locale puede ser a un lenguaje, eg. es, un código del país eg. ES o una combinación es-ES
properties.locale.error.NOT_NULLABLE = la opción de regionalización debe ser definida
properties.locale.error.INVALID_SUBTYPE_VALUE = la configuración regional es inválida`

const ALL = {en, es};

return config.supportedLanguages.map((language) => {
  const unregionalizedName = language.split("-")[0];
  if (ALL[language]) {
    return ALL[language]
  } else if (ALL[unregionalizedName]) {
    return ALL[unregionalizedName].replace("[" + unregionalizedName + "]", "[" + language + "]");
  } else {
    return ALL.en.replace("[en]", "[" + language + "]");
  }
}).join("\n\n");