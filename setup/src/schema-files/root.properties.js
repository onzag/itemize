return config.supportedLanguages
  .map(l => "[" + l + "]\n" +
    "app_name = " + config.appName + "\n" + 
    "app_short_name = " + config.appName + "\n" +
    "app_description = " + config.appName + "\n"
  ).join("\n");