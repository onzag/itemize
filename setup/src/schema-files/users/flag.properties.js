const en = `name = flag
search_field_label = flag search
search_field_placeholder = insert relevant flag data
search_value_too_large = your search is too long, please narrow it down
search_keywords = flag

custom.report = report
custom.send = send report
custom.success = report sent successfully

properties.reason.label = reason
properties.reason.placeholder = reason
properties.reason.values.PORN = pornography
properties.reason.values.VIOLENCE = violent content or endorsement
properties.reason.values.OTHER = other
properties.reason.null_value = unspecified
properties.reason.search.label = reason
properties.reason.search.placeholder = reason
properties.reason.search.null_value = any
properties.reason.error.INVALID_VALUE = invalid reason
properties.reason.error.NOT_NULLABLE = you need to provide a reason

properties.status.label = status
properties.status.placeholder = status
properties.status.values.OPEN = open report
properties.status.values.CLOSED_NO_EFFECT = closed without effect
properties.status.values.CLOSED_APPLIED = closed with ban/block
properties.status.null_value = unspecified
properties.status.search.label = filter by status
properties.status.search.placeholder = status
properties.status.search.null_value = any
properties.status.error.INVALID_VALUE = invalid reason

properties.reason_text.label = additional information
properties.reason_text.placeholder = additional information
properties.reason_text.error.TOO_LARGE = text is too long`;

const es = `name = reporte
search_field_label = buscar reporte
search_field_placeholder = inserte información necesaria sobre el reporte
search_value_too_large = los atributos de búsqueda son demasiado largos
search_keywords = reporte

custom.report = reportar
custom.send = crear reporte
custom.success = reporte enviado exitosamente

properties.reason.label = razón
properties.reason.placeholder = razón
properties.reason.values.PORN = pornografía
properties.reason.values.VIOLENCE = contenido violento
properties.reason.values.OTHER = otra
properties.reason.null_value = sin especificar
properties.reason.search.label = razón
properties.reason.search.placeholder = razón
properties.reason.search.null_value = cualquiera
properties.reason.error.INVALID_VALUE = razón inválida
properties.reason.error.NOT_NULLABLE = debe proveer una razón

properties.status.label = estado
properties.status.placeholder = estado
properties.status.values.OPEN = reporte abierto
properties.status.values.CLOSED_NO_EFFECT = cerrado sin efecto
properties.status.values.CLOSED_APPLIED = cerrado con ban o bloqueo
properties.status.null_value = sin especificar
properties.status.search.label = filtrar por estado
properties.status.search.placeholder = estado
properties.status.search.null_value = cualquiera
properties.status.error.INVALID_VALUE = razón inválida

properties.reason_text.label = información adicional
properties.reason_text.placeholder = información adicional
properties.reason_text.error.TOO_LARGE = el texto es muy largo`

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