const en = `[en]
name = cms

custom.warning = Warning! this is an internal administrative tool, it lacks proper memory management, and it is not intended to be used by the public
custom.info = info

properties.title.label = title
properties.title.search.label = title
properties.title.placeholder = the title of the fragment or article
properties.title.search.placeholder = search within the title
properties.title.error.NOT_NULLABLE = the title must be set
properties.title.error.TOO_LARGE = the title is too long

properties.content.label = content
properties.content.search.label = content
properties.content.placeholder = the content of the fragment or article
properties.content.search.placeholder = search within the content
properties.content.error.NOT_NULLABLE = the content must be set
properties.content.error.TOO_LARGE = the content is too long`

const es = `[es]
name = cms

custom.warning = ¡Atención! esta es una herramienta de administración interna, no tiene sistema de manejo de memoria y no fue diseñada para ser manejada por el público
custom.info = información

properties.title.label = título
properties.title.search.label = título
properties.title.placeholder = el título del fragmento o artículo
properties.title.search.placeholder = buscar entre el título
properties.title.error.NOT_NULLABLE = debe tener un título
properties.title.error.TOO_LARGE = el título es demasiado large

properties.content.label = contenido
properties.content.search.label = contenido
properties.content.placeholder = el contenido del fragmento o artículo
properties.content.search.placeholder = buscar entre el contenido
properties.content.error.NOT_NULLABLE = debe ofrecer contenido
properties.content.error.TOO_LARGE = el contenido es demasiado largo`

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