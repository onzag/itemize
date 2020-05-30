const en = `[en]
app_name = $APPNAME
app_short_name = $APPNAME
app_description = $APPNAME

terms_and_conditions = terms and conditions
terms_and_conditions_url = terms-and-conditions/$LANGUAGE.html

privacy_policy = privacy policy
privacy_policy_url = privacy-policy/$LANGUAGE.html

contact = contact
contact_url = contact/$LANGUAGE.html

social = join us at
facebook_url = https://facebook.com
instagram_url = https://instagram.com
linkedin_url = https://linkedin.com
pinterest_url = https://pinterest.com
reddit_url = https://reddit.com
twitter_url = https://twitter.com
vk_url = https://vk.com
wechat_url = https://wechat.com
youtube_url = https://youtube.com
`

const es = `[es]
app_name = $APPNAME
app_short_name = $APPNAME
app_description = $APPNAME

terms_and_conditions = términos y condiciones
terms_and_conditions_url = terms-and-conditions/$LANGUAGE.html

privacy_policy = política de privacidad
privacy_policy_url = privacy-policy/$LANGUAGE.html

contact = contacto
contact_url = contact/$LANGUAGE.html

social = únase a la comunidad
facebook_url = https://facebook.com
instagram_url = https://instagram.com
linkedin_url = https://linkedin.com
pinterest_url = https://pinterest.com
reddit_url = https://reddit.com
twitter_url = https://twitter.com
vk_url = https://vk.com
wechat_url = https://wechat.com
youtube_url = https://youtube.com
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