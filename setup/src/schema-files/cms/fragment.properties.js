const en = `[en]
name = content fragment
custom.id = id
custom.version = version
custom.warning = Warning! this is an internal administrative tool, it lacks proper memory management, and it is not intended to be used by the public
custom.submit = create or update
custom.fragment_success = success

custom.load_fragment = load fragment
custom.fragment_id = fragment id
custom.fragment_country = fragment country
custom.fragment_language = fragment language`

const es = `[es]
name = fragmento de contenido
custom.id = id
custom.version = versión
custom.warning = ¡Atención! esta es una herramienta de administración interna, no tiene sistema de manejo de memoria y no fue diseñada para ser manejada por el público
custom.submit = crear o actualizar
custom.fragment_success = hecho exitosamente

custom.load_fragment = cargar fragmento
custom.fragment_id = id del fragmento
custom.fragment_country = región del fragmento
custom.fragment_language = lenguaje del fragmento`

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