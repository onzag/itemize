const en = `[en]
name = users
fts_search_field_label = user search
fts_search_field_placeholder = insert relevant user data`

const es = `[es]
name = usuarios
fts_search_field_label = buscar usuario
fts_search_field_placeholder = inserte información relevante sobre el usuario`

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