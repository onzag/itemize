const en = `[en]
app_name = $APPNAME
app_short_name = $APPNAME
app_description = $APPNAME

terms_and_conditions = terms and conditions
terms_and_conditions_url = terms-and-conditions/$LANGUAGE.html

privacy_policy = privacy policy
privacy_policy_url = privacy-policy/$LANGUAGE.html
`

const es = `[es]
app_name = $APPNAME
app_short_name = $APPNAME
app_description = $APPNAME

terms_and_conditions = términos y condiciones
terms_and_conditions_url = terms-and-conditions/$LANGUAGE.html

privacy_policy = política de privacidad
privacy_policy_url = privacy-policy/$LANGUAGE.html
`

const ALL = { en, es };
const any = en;

return config.supportedLanguages.map((language) => {
  const unregionalizedName = language.split("-")[0];
  if (ALL[language]) {
    return ALL[language].replace(/\$LANGUAGE/g, language);
  } else if (ALL[unregionalizedName]) {
    return ALL[unregionalizedName].replace("[" + unregionalizedName + "]", "[" + language + "]").replace(/\$LANGUAGE/g, language);
  } else {
    return ALL.en.replace("[en]", "[" + language + "]").replace(/\$LANGUAGE/g, language);
  }
}).map((l) => {
  return l.replace(/\$APPNAME/g, config.appName.replace(/\s/g, "_"));
}).join("\n\n");