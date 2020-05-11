const en = `[en]
name = content fragment
custom.id = id
custom.version = version
custom.submit = create or update
custom.fragment_success = success`

const es = `[es]
name = fragmento de contenido
custom.id = id
custom.version = versión
custom.submit = crear o actualizar
custom.fragment_success = hecho exitosamente`

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