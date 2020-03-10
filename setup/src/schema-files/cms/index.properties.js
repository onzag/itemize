const any = `[any]
name = cms`

return config.supportedLanguages.map((language) => {
  return any.replace("[any]", "[" + language + "]");
}).join("\n\n");