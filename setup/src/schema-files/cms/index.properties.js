const en = `[en]
name = cms

custom.warning = Warning! this is an internal administrative tool, it lacks proper memory management, and it is not intended to be used by the public
custom.info = info
custom.info_content = In this page you can create and modify fragments, fragments are pieces of content meant to the part of the app layout, and meant to be loaded programatically; articles are part of the application content and are meant to be searched and interacted by the user.
custom.info_content_2 = All the content in this page is kept realtime and synchronized, just as it would be in the app, you can debug content here.

custom.id = id
custom.version = version
custom.submit = create or update
custom.success = success

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
properties.content.error.TOO_LARGE = the content is too long
properties.content.error.MEDIA_PROPERTY_TOO_LARGE = you have attached too many files`

const es = `[es]
name = cms

custom.warning = ¡Atención! esta es una herramienta de administración interna, no tiene sistema de manejo de memoria y no fue diseñada para ser manejada por el público
custom.info = información
custom.info_content = En esta página puede crear y modificar fragmentos, los fragmentos son piezas de contenido que son parte de la aplicación misma, y están diseñadas para ser cargadas programáticamente; los artículos a diferencia, contienen contenido para ser buscado y mostrado a los usuarios
custom.info_content_2 = Todo el contenido de esta sección está en tiempo real y es continuamente sincronizado, así como estaría en la aplicación misma, aquí puedes depurar el contenido.

custom.id = id
custom.version = versión
custom.submit = crear o actualizar
custom.success = hecho exitosamente

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