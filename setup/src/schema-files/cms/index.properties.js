const en = `[en]
name = cms
search_field_label = search
search_field_placeholder = search in the cms
search_keywords = cms
search_value_too_large = search is too long

custom.info = info
custom.info_content = In this page you can create and modify fragments, fragments are pieces of content meant to the part of the app layout, and meant to be loaded programatically; articles are part of the application content and are meant to be searched and interacted by the user.
custom.info_content_2 = All the content in this page is kept realtime and synchronized, just as it would be in the app, you can debug content here.

custom.id = id
custom.version = version
custom.submit = create or update
custom.success = success

properties.content.label = content
properties.content.search.label = content
properties.content.placeholder = the content of the fragment or article
properties.content.search.placeholder = search within the content
properties.content.error.NOT_NULLABLE = the content must be set
properties.content.error.TOO_LARGE = the content is too long
properties.content.error.MEDIA_PROPERTY_TOO_LARGE = you have attached too many files`

const es = `[es]
name = cms
search_field_label = buscar
search_field_placeholder = buscar en el cms
search_keywords = cms
search_value_too_large = el valor es demasiado largo

custom.info = información
custom.info_content = En esta página puede crear y modificar fragmentos, los fragmentos son piezas de contenido que son parte de la aplicación misma, y están diseñadas para ser cargadas programáticamente; los artículos a diferencia, contienen contenido para ser buscado y mostrado a los usuarios
custom.info_content_2 = Todo el contenido de esta sección está en tiempo real y es continuamente sincronizado, así como estaría en la aplicación misma, aquí puedes depurar el contenido.

custom.id = id
custom.version = versión
custom.submit = crear o actualizar
custom.success = hecho exitosamente

properties.content.label = contenido
properties.content.search.label = contenido
properties.content.placeholder = el contenido del fragmento o artículo
properties.content.search.placeholder = buscar entre el contenido
properties.content.error.NOT_NULLABLE = debe ofrecer contenido
properties.content.error.TOO_LARGE = el contenido es demasiado largo
properties.content.error.MEDIA_PROPERTY_TOO_LARGE = ha añadido demasiados archivos adjuntos`

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