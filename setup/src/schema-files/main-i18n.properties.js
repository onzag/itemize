const en = `[en]
name = english
number_decimal_separator = .
word_separator = ,
currency_format = $N

yes = yes
no = no
unspecified = unspecified
any = any

cancel = cancel
ok = ok

close = close

format_bold = bold
format_italic = italic
format_underline = underline
format_link = link
format_title = title
format_quote = quote
format_list_numbered = numbered list
format_list_bulleted = list
format_add_image = add image
format_add_file = add file
format_add_video = add embed video
format_add_container = add container
format_add_custom = add custom element
format_set_style = set style
format_set_hover_style = set hover style
format_set_active_style = set active style
format_set_class = set class names
format_set_event_handlers = set event handlers
format_set_context = set context
format_set_render_condition = set render condition
format_make_loop = make loop
format_set_ui_handler = set ui handler
format_set_ui_handler_arg = set ui handler arguments
format_set_ui_handler_arg_name = name
format_set_ui_handler_arg_value = value
format_add_template_text = add template text
format_add_template_html = add template HTML
format_delete_element = delete element
format_more = more options

rich_name = name
rich_alt = alt
rich_sizes = sizes
rich_container = container
rich_inline = inline
rich_text = text
rich_custom = custom
rich_file = file
rich_image = image
rich_link = link
rich_list = list
rich_list_item = list item
rich_paragraph = paragraph
rich_quote = quote
rich_title = title
rich_video = video
rich_styled_component = styled {0}
rich_template_component = template {0}
rich_interactive_component = interactive {0}
rich_style = style
rich_style_active = style active
rich_style_hover = style hover
rich_classes = rich classes
rich_settings = settings
rich_styles = styles
rich_templating = templating
rich_actions = actions
rich_each = loop for each
rich_render_condition = render condition
rich_context = context
rich_ui_handler = ui handler
rich_type = type
rich_standalone = standalone

file_uploader_placeholder_active = drop your files here...
image_uploader_placeholder_active = drop your pictures here...
file_uploader_placeholder_active_single = drop your file here...
image_uploader_placeholder_active_single = drop your picture here...
file_uploader_invalid_type = invalid file Type
image_uploader_invalid_type = this file is not an image
file_uploader_file_too_big = file is too big, maximum file size is {0}
image_uploader_file_too_big = your picture is too big, maximum file size is {0}
file_uploader_byte_limit_exceed = you have surpassed the limit of {0} for file uploads
file_uploader_select_file = select file
image_uploader_select_file = select picture
file_uploader_delete_file = delete file
image_uploader_delete_file = delete picture

video_loader_title = insert video
video_loader_label = video url
video_loader_placeholder = youtube/vimeo url links allowed
video_loader_invalid = invalid link
video_loader_submit = submit

link_setter_title = insert link
link_setter_label = url
link_setter_placeholder_local_only = insert link (only local links allowed)
link_setter_placeholder = insert link
link_setter_templated = or select one of these template values
link_setter_templated_label = template value
link_setter_templated_placeholder = template value
link_setter_templated_unspecified = none
link_setter_invalid = invalid link
link_setter_submit = submit

add_template_text_title = insert template text
add_template_text_label = select value
add_template_text_placeholder = select template text value
add_template_text_submit = submit

add_template_html_title = insert template HTML
add_template_html_label = select value
add_template_html_placeholder = select template HTML value
add_template_html_submit = submit

no_results = no results
result_out_of = result {0} out of {1}

callout_exclude_warning = warning!... this will mark your item as incomplete

unit_dialog_title = select a unit
unit_dialog_others = other units
unit_dialog_metric = metric
unit_dialog_imperial = imperial

currency_dialog_title = select currency

menu = menu
reload = reload
home = home

blocked_update = An older version of the app is currently running which prevents from updating this app, please close the old version in order to proceed
needs_update_navigation = outdated
needs_update_title = update app
needs_update_content = A new version of the app is currently available
needs_update_action = update

generic_error = error
generic_warning = warning
generic_info = info

unsaved_changes = you have unsaved changes
save = save
discard = discard

payment.type = type of payment
payment.status = status
payment.amount = amount
payment.currency = currency
payment.metadata = metadata
payment.create = create payment
payment.destroy = delete payment
payment.pending = pending
payment.paid = paid
payment.disputed = disputed
payment.reversed = reversed
payment.active = active
payment.inactive = inactive
payment.invoice = invoice
payment.refund = refund
payment.subscription_monthly = monthly subscription
payment.subscription_daily = daily subscription
payment.subscription_yearly = yearly subscription

error.INVALID_CREDENTIALS = invalid user or password
error.BLOCKED = the item has been blocked
error.NOT_FOUND = the item cannot be found
error.FORBIDDEN = forbidden
error.CANT_CONNECT = cannot communicate with the server
error.INVALID_DATA_SUBMIT_REFUSED = some fields are invalid
error.INTERNAL_SERVER_ERROR = internal server error
error.UNSPECIFIED = unspecified error
error.NOTHING_TO_UPDATE = nothing to update
error.MUST_BE_LOGGED_IN = you must be logged in
error.USER_BLOCKED = you have been banned
error.USER_REMOVED = the account related to this session has been removed
error.USER_EMAIL_TAKEN = this email has been taken already
error.INVALID_PROPERTY = invalid property
error.INVALID_INCLUDE = invalid include
error.INVALID_POLICY = policy security checks have failed`

const fi = `[fi]
name = suomi
number_decimal_separator = ,
word_separator = ,
currency_format = N$

yes = kyllä
no = ei
unspecified = määrittelemätön
any = mikä tahansa

cancel = perutaa
ok = ok

close = suljettu

format_bold = lihavoitu
format_italic = kursivoitu
format_underline = alleviivaus
format_link = linkki
format_title = otsikko
format_quote = lainaus
format_list_numbered = numeroitu lista
format_list_bulleted = lista
format_add_image = lisää kuva
format_add_file = lisää tiedosto
format_add_video = lisää upotettu video
format_add_container = add container
format_add_custom = add custom element
format_set_style = set style
format_set_hover_style = set hover style
format_set_active_style = set active style
format_set_class = set class names
format_set_event_handlers = set event handlers
format_set_context = set context
format_set_render_condition = set render condition
format_make_loop = make loop
format_set_ui_handler = set ui handler
format_set_ui_handler_arg = set ui handler arguments
format_set_ui_handler_arg_name = name
format_set_ui_handler_arg_value = value
format_add_template_text = add template text
format_add_template_html = add template HTML
format_delete_element = delete element
format_more = lisää

rich_name = nimi
rich_alt = alt
rich_sizes = sizes
rich_container = container
rich_inline = inline
rich_text = text
rich_custom = custom
rich_file = file
rich_image = image
rich_link = link
rich_list = list
rich_list_item = list item
rich_paragraph = paragraph
rich_quote = quote
rich_title = title
rich_video = video
rich_styled_component = styled {0}
rich_template_component = template {0}
rich_interactive_component = interactive {0}
rich_style = style
rich_style_active = style active
rich_style_hover = style hover
rich_classes = rich classes
rich_settings = settings
rich_styles = styles
rich_templating = templating
rich_actions = actions
rich_each = loop for each
rich_render_condition = render condition
rich_context = context
rich_ui_handler = ui handler
rich_type = type
rich_standalone = standalone

file_uploader_placeholder_active = pudota tiedostosi tähän...
image_uploader_placeholder_active = pudota kuvatiedostosi tähän...
file_uploader_placeholder_active_single = pudota tiedosto tähän...
image_uploader_placeholder_active_single = pudota kuvatiedosto tähän...
file_uploader_invalid_type = epäkelpo tiedostotyyppi
image_uploader_invalid_type = tiedosto ei ole kuvatiedosto
file_uploader_file_too_big = tiedosto liian suuri, suurin sallittu koko on {0}
image_uploader_file_too_big = kuvatiedosto liian suuri, suurin sallittu koko on {0}
file_uploader_byte_limit_exceed = olet ylittänyt tiedostojen latausrajasi, joka on {0}
file_uploader_select_file = valitse tiedosto
image_uploader_select_file = valitse kuvatiedosto
file_uploader_delete_file = poista tiedosto
image_uploader_delete_file = poista kuvatiedosto

video_loader_title = insert video
video_loader_label = video url
video_loader_placeholder = youtube/vimeo url links allowed
video_loader_invalid = invalid link
video_loader_submit = submit

link_setter_title = insert link
link_setter_label = url
link_setter_placeholder_local_only = insert link (only local links allowed)
link_setter_placeholder = insert link
link_setter_templated = or select one of these template values
link_setter_templated_label = template value
link_setter_templated_placeholder = template value
link_setter_templated_unspecified = none
link_setter_invalid = invalid link
link_setter_submit = submit

add_template_text_title = insert template text
add_template_text_label = select value
add_template_text_placeholder = select template text value
add_template_text_submit = submit

add_template_html_title = insert template HTML
add_template_html_label = select value
add_template_html_placeholder = select template HTML value
add_template_html_submit = submit

no_results = no results
result_out_of = result {0} out of {1}

callout_exclude_warning = warning!... this will mark your item as incomplete

unit_dialog_title = select a unit
unit_dialog_others = other units
unit_dialog_metric = metric
unit_dialog_imperial = imperial

currency_dialog_title = select currency

menu = menu
reload = reload
home = home

blocked_update = An older version of the app is currently running which prevents from updating this app, please close the old version in order to proceed
needs_update_navigation = outdated
needs_update_title = update app
needs_update_content = A new version of the app is currently available
needs_update_action = update

generic_error = error
generic_warning = warning
generic_info = info

unsaved_changes = you have unsaved changes
save = save
discard = discard

payment.type = type of payment
payment.status = status
payment.amount = amount
payment.currency = currency
payment.metadata = metadata
payment.create = create payment
payment.destroy = delete payment
payment.pending = pending
payment.paid = paid
payment.disputed = disputed
payment.reversed = reversed
payment.active = active
payment.inactive = inactive
payment.invoice = invoice
payment.refund = refund
payment.subscription_monthly = monthly subscription
payment.subscription_daily = daily subscription
payment.subscription_yearly = yearly subscription

error.INVALID_CREDENTIALS = invalid user or password
error.BLOCKED = the item has been blocked
error.NOT_FOUND = the item cannot be found
error.FORBIDDEN = forbidden
error.CANT_CONNECT = canņot communicate with the server
error.INVALID_DATA_SUBMIT_REFUSED = some fields are invalid
error.INTERNAL_SERVER_ERROR = internal server error
error.UNSPECIFIED = unspecified error
error.NOTHING_TO_UPDATE = nothing to update
error.MUST_BE_LOGGED_IN = you must be logged in
error.USER_BLOCKED = you have been banned
error.USER_REMOVED = the account related to this session has been removed
error.USER_EMAIL_TAKEN = this email has been taken already
error.INVALID_PROPERTY = invalid property
error.INVALID_INCLUDE = invalid include
error.INVALID_POLICY = policy security checks have failed`

const ru = `[ru]
name = suomi
number_decimal_separator = ,
word_separator = ,
currency_format = N$

yes = kyllä
no = ei
unspecified = määrittelemätön
any = mikä tahansa

cancel = cancel
ok = ok

close = close

format_bold = bold
format_italic = italic
format_underline = underline
format_link = link
format_title = title
format_quote = quote
format_list_numbered = numbered list
format_list_bulleted = list
format_add_image = add image
format_add_file = add file
format_add_video = add embed video
format_add_container = add container
format_add_custom = add custom element
format_set_style = set style
format_set_hover_style = set hover style
format_set_active_style = set active style
format_set_class = set class names
format_set_event_handlers = set event handlers
format_set_context = set context
format_set_render_condition = set render condition
format_make_loop = make loop
format_set_ui_handler = set ui handler
format_set_ui_handler_arg = set ui handler arguments
format_set_ui_handler_arg_name = name
format_set_ui_handler_arg_value = value
format_add_template_text = add template text
format_add_template_html = add template HTML
format_delete_element = delete element
format_more = more options

rich_name = name
rich_alt = alt
rich_sizes = sizes
rich_container = container
rich_inline = inline
rich_text = text
rich_custom = custom
rich_file = file
rich_image = image
rich_link = link
rich_list = list
rich_list_item = list item
rich_paragraph = paragraph
rich_quote = quote
rich_title = title
rich_video = video
rich_styled_component = styled {0}
rich_template_component = template {0}
rich_interactive_component = interactive {0}
rich_style = style
rich_style_active = style active
rich_style_hover = style hover
rich_classes = rich classes
rich_settings = settings
rich_styles = styles
rich_templating = templating
rich_actions = actions
rich_each = loop for each
rich_render_condition = render condition
rich_context = context
rich_ui_handler = ui handler
rich_type = type
rich_standalone = standalone

file_uploader_placeholder_active = drop your files here...
image_uploader_placeholder_active = drop your pictures here...
file_uploader_placeholder_active_single = drop your file here...
image_uploader_placeholder_active_single = drop your picture here...
file_uploader_invalid_type = invalid File Type
image_uploader_invalid_type = this file is not an image
file_uploader_file_too_big = file is too big, maximum file size is {0}
image_uploader_file_too_big = your picture is too big, maximum file size is {0}
file_uploader_byte_limit_exceed = you have surpassed the limit of {0} for file uploads
file_uploader_select_file = select File
image_uploader_select_file = select Picture
file_uploader_delete_file = delete File
image_uploader_delete_file = delete Picture

video_loader_title = insert video
video_loader_label = video url
video_loader_placeholder = youtube/vimeo url links allowed
video_loader_invalid = invalid link
video_loader_submit = submit

link_setter_title = insert link
link_setter_label = url
link_setter_placeholder_local_only = insert link (only local links allowed)
link_setter_placeholder = insert link
link_setter_templated = or select one of these template values
link_setter_templated_label = template value
link_setter_templated_placeholder = template value
link_setter_templated_unspecified = none
link_setter_invalid = invalid link
link_setter_submit = submit

add_template_text_title = insert template text
add_template_text_label = select value
add_template_text_placeholder = select template text value
add_template_text_submit = submit

add_template_html_title = insert template HTML
add_template_html_label = select value
add_template_html_placeholder = select template HTML value
add_template_html_submit = submit

no_results = no results
result_out_of = result {0} out of {1}

callout_exclude_warning = warning!... this will mark your item as incomplete

unit_dialog_title = select a unit
unit_dialog_others = other units
unit_dialog_metric = metric
unit_dialog_imperial = imperial

currency_dialog_title = select currency

menu = menu
reload = reload
home = home

blocked_update = An older version of the app is currently running which prevents from updating this app, please close the old version in order to proceed
needs_update_navigation = outdated
needs_update_title = update app
needs_update_content = A new version of the app is currently available
needs_update_action = update

generic_error = error
generic_warning = warning
generic_info = info

unsaved_changes = you have unsaved changes
save = save
discard = discard

payment.type = type of payment
payment.status = status
payment.amount = amount
payment.currency = currency
payment.metadata = metadata
payment.create = create payment
payment.destroy = delete payment
payment.pending = pending
payment.paid = paid
payment.disputed = disputed
payment.reversed = reversed
payment.active = active
payment.inactive = inactive
payment.invoice = invoice
payment.refund = refund
payment.subscription_monthly = monthly subscription
payment.subscription_daily = daily subscription
payment.subscription_yearly = yearly subscription

error.INVALID_CREDENTIALS = invalid user or password
error.BLOCKED = the item has been blocked
error.NOT_FOUND = the item cannot be found
error.FORBIDDEN = forbidden
error.CANT_CONNECT = canņot communicate with the server
error.INVALID_DATA_SUBMIT_REFUSED = some fields are invalid
error.INTERNAL_SERVER_ERROR = internal server error
error.UNSPECIFIED = unspecified error
error.NOTHING_TO_UPDATE = nothing to update
error.MUST_BE_LOGGED_IN = you must be logged in
error.USER_BLOCKED = you have been banned
error.USER_REMOVED = the account related to this session has been removed
error.USER_EMAIL_TAKEN = this email has been taken already
error.INVALID_PROPERTY = invalid property
error.INVALID_INCLUDE = invalid include
error.INVALID_POLICY = policy security checks have failed`

const de = `[de]
name = Deutsch
number_decimal_separator = ,
word_separator = ,
currency_format = $N

yes = ja
no = nein
unspecified = unbestimmt
any = alle

cancel = abbrechen
ok = ok

close = schliessen

format_bold = fett
format_italic = kursiv
format_underline = unterstrichen
format_link = link
format_title = Titel
format_quote = Zitat
format_list_numbered = Nummerierung
format_list_bulleted = Liste
format_add_image = Bild einfügen
format_add_file = Datei einfügen
format_add_video = Video einfügen
format_add_container = add container
format_add_custom = add custom element
format_set_style = set style
format_set_hover_style = set hover style
format_set_active_style = set active style
format_set_class = set class names
format_set_event_handlers = set event handlers
format_set_context = set context
format_set_render_condition = set render condition
format_make_loop = make loop
format_set_ui_handler = set ui handler
format_set_ui_handler_arg = set ui handler arguments
format_set_ui_handler_arg_name = name
format_set_ui_handler_arg_value = value
format_add_template_text = add template text
format_add_template_html = add template HTML
format_delete_element = delete element
format_more = more options

rich_name = name
rich_alt = alt
rich_sizes = sizes
rich_container = container
rich_inline = inline
rich_text = text
rich_custom = custom
rich_file = file
rich_image = image
rich_link = link
rich_list = list
rich_list_item = list item
rich_paragraph = paragraph
rich_quote = quote
rich_title = title
rich_video = video
rich_styled_component = styled {0}
rich_template_component = template {0}
rich_interactive_component = interactive {0}
rich_style = style
rich_style_active = style active
rich_style_hover = style hover
rich_classes = rich classes
rich_settings = settings
rich_styles = styles
rich_templating = templating
rich_actions = actions
rich_each = loop for each
rich_render_condition = render condition
rich_context = context
rich_ui_handler = ui handler
rich_type = type
rich_standalone = standalone

file_uploader_placeholder_active = Dateien hier her ziehen...
image_uploader_placeholder_active = Bilder hier her ziehen...
file_uploader_placeholder_active_single = Datei hier her ziehen...
image_uploader_placeholder_active_single = Bild hier her ziehen...
file_uploader_invalid_type = Dateityp unpassend
image_uploader_invalid_type = Datai ist kein Bild
file_uploader_file_too_big = Datei ist zu gross, maximum Dateigrösse ist {0}
image_uploader_file_too_big = Bild ist zu gross, maximum Bildgrösse ist {0}
file_uploader_byte_limit_exceed = Sie haben die erlaubte Menge {0} für Dateien überschritten
file_uploader_select_file = Datei auswählen
image_uploader_select_file = Bild auswählen
file_uploader_delete_file = Datei löschen
image_uploader_delete_file = Bild löschen

video_loader_title = insert video
video_loader_label = video url
video_loader_placeholder = youtube/vimeo url links allowed
video_loader_invalid = invalid link
video_loader_submit = submit

link_setter_title = insert link
link_setter_label = url
link_setter_placeholder_local_only = insert link (only local links allowed)
link_setter_placeholder = insert link
link_setter_templated = or select one of these template values
link_setter_templated_label = template value
link_setter_templated_placeholder = template value
link_setter_templated_unspecified = none
link_setter_invalid = invalid link
link_setter_submit = submit

add_template_text_title = insert template text
add_template_text_label = select value
add_template_text_placeholder = select template text value
add_template_text_submit = submit

add_template_html_title = insert template HTML
add_template_html_label = select value
add_template_html_placeholder = select template HTML value
add_template_html_submit = submit

no_results = no results
result_out_of = result {0} out of {1}

callout_exclude_warning = Warnung!... dies wird ihren Artikel als unvollständig markieren

unit_dialog_title = wählen Sie eine Einheit
unit_dialog_others = andere Einheiten
unit_dialog_metric = Metrisch
unit_dialog_imperial = Zoll

currency_dialog_title = select currency

menu = Menü
reload = reload
home = home

blocked_update = An older version of the app is currently running which prevents from updating this app, please close the old version in order to proceed
needs_update_navigation = outdated
needs_update_title = update app
needs_update_content = A new version of the app is currently available
needs_update_action = update

generic_error = error
generic_warning = warning
generic_info = info

unsaved_changes = you have unsaved changes
save = save
discard = discard

payment.type = type of payment
payment.status = status
payment.amount = amount
payment.currency = currency
payment.metadata = metadata
payment.create = create payment
payment.destroy = delete payment
payment.pending = pending
payment.paid = paid
payment.disputed = disputed
payment.reversed = reversed
payment.active = active
payment.inactive = inactive
payment.invoice = invoice
payment.refund = refund
payment.subscription_monthly = monthly subscription
payment.subscription_daily = daily subscription
payment.subscription_yearly = yearly subscription

error.INVALID_CREDENTIALS = ungültiger Benutzer oder Password
error.BLOCKED = der Artikel ist gesperrt
error.NOT_FOUND = der Artikel wurde nicht gefunden
error.FORBIDDEN = verboten
error.CANT_CONNECT = kann nicht mit Server verbinden
error.INVALID_DATA_SUBMIT_REFUSED = einige Felder sind ungültig
error.INTERNAL_SERVER_ERROR = interner Server Fehler
error.UNSPECIFIED = undefinierter Fehler
error.NOTHING_TO_UPDATE = keine Änderungen
error.MUST_BE_LOGGED_IN = Sie müssen eingeloggt sein
error.USER_BLOCKED = Sie wurden mit einem Verbot belegt
error.USER_REMOVED = das Konto für diese Sitzung wurde entfernt
error.USER_EMAIL_TAKEN = Diese E-Mail-Adresse ist bereits vergeben.
error.INVALID_PROPERTY = ungültige Eigenschaft
error.INVALID_INCLUDE = ungültige Einbindung
error.INVALID_POLICY = Sicherheitsabfrage gescheitert`

const es = `[es]
name = español
number_decimal_separator = ,
word_separator = ,
currency_format = N$

yes = si
no = no
unspecified = sin especificar
any = cualquiera

cancel = cancelar
ok = ok

close = cerrar

format_bold = negrita
format_italic = cursiva 
format_underline = subrayada
format_link = link
format_title = título
format_quote = citar
format_list_numbered = lista numérica
format_list_bulleted = lista
format_add_image = agregar foto
format_add_file = agregar archivo
format_add_video = agregar video embebido
format_add_container = agregar contenedor
format_add_custom = agregar elemento customizable
format_set_style = seleccionar estilos
format_set_hover_style = seleccionar estilos hover
format_set_active_style = seleccionar estilos activos
format_set_class = seleccionar clases
format_set_event_handlers = seleccionar eventos
format_set_context = seleccionar contexto
format_set_render_condition = seleccionar condición para visualización
format_make_loop = crear bucle
format_set_ui_handler = seleccionar administrador de UI
format_set_ui_handler_arg = colocar argumentos
format_set_ui_handler_arg_name = nombre
format_set_ui_handler_arg_value = valor
format_add_template_text = insertar texto de plantilla
format_add_template_html = insertar HTML de plantilla
format_delete_element = eliminar elemento
format_more = más opciones

rich_name = nombre
rich_alt = alt
rich_sizes = sizes
rich_container = contenedor
rich_inline = inline
rich_text = texto
rich_custom = elemento personalizado
rich_file = archivo
rich_image = imagen
rich_link = link
rich_list = lista
rich_list_item = elemento de lista
rich_paragraph = párrafo
rich_quote = cita
rich_title = título
rich_video = video
rich_styled_component = {0} estilizado
rich_template_component = {0} de plantilla
rich_interactive_component = {0} interactivo
rich_style = estilo
rich_style_active = estilo activo
rich_style_hover = estilo de hover
rich_classes = clases
rich_settings = configuración
rich_styles = estilo
rich_templating = plantillas
rich_actions = acciones
rich_each = bucle
rich_render_condition = condición de visibilidad
rich_context = contexto
rich_ui_handler = administrador de ui
rich_type = tipo
rich_standalone = imagen independiente

file_uploader_placeholder_active = suelta tus archivos aquí...
image_uploader_placeholder_active = suelta tus fotos aquí...
file_uploader_placeholder_active_single = suelta tu archivo aquí...
image_uploader_placeholder_active_single = suelta tu foto aquí...
file_uploader_invalid_type = tipo de archivo inválido
image_uploader_invalid_type = el archivo no es una imágen
file_uploader_file_too_big = el archivo es demasiado grande, el máximo es de {0}
image_uploader_file_too_big = tu foto es demasiado grande, el máximo es de {0}
file_uploader_byte_limit_exceed = has sobrepasado el límite de {0} para subir archivos
file_uploader_select_file = seleccionar archivo
image_uploader_select_file = seleccionar foto
file_uploader_delete_file = borrar archivo
image_uploader_delete_file = borrar foto

video_loader_title = insertar video
video_loader_label = url del video
video_loader_placeholder = sólo links de youtube/vimeo
video_loader_invalid = el link es inválido
video_loader_submit = insertar

link_setter_title = insertar link
link_setter_label = url
link_setter_placeholder_local_only = inserte el link (sólo se permiten links locales)
link_setter_placeholder = inserte el link
link_setter_templated = o seleccione uno de los valores de plantilla
link_setter_templated_label = valor
link_setter_templated_placeholder = valor de plantilla
link_setter_templated_unspecified = ninguno
link_setter_invalid = el link es inválido
link_setter_submit = insertar

add_template_text_title = insertar texto de plantilla
add_template_text_label = seleccionar valor
add_template_text_placeholder = seleccione el valor del texto
add_template_text_submit = insertar

add_template_html_title = insertar HTML de plantilla
add_template_html_label = seleccionar valor
add_template_html_placeholder = seleccione el valor HTML
add_template_html_submit = insertar

no_results = no se encontraron resultados
result_out_of = resultado {0} de {1}

callout_exclude_warning = atención!... esto marcará su item como incompleto

unit_dialog_title = seleccione una unidad
unit_dialog_others = otras Unidades
unit_dialog_metric = métricas
unit_dialog_imperial = imperiales

currency_dialog_title = seleccione divisa

menu = menú
reload = recargar
home = página principal

blocked_update = Una versión anterior de la aplicación está activa actualmente, por favor cierre la pestaña en cuestión para continuar
needs_update_navigation = necesita actualizar
needs_update_title = actualizar aplicación
needs_update_content = Una nueva versión de la aplicación ha sido publicada
needs_update_action = Actualizar

generic_error = error
generic_warning = ¡atención!
generic_info = información

unsaved_changes = sus cambios no han sido guardados
save = guardar
discard = descartar

payment.type = tipo de pago
payment.status = estado
payment.amount = cantidad
payment.currency = divisa
payment.metadata = metadata
payment.create = crear pago
payment.destroy = eliminar pago
payment.pending = en espera
payment.paid = pagado
payment.disputed = en dis
payment.reversed = reembolsado
payment.active = activo
payment.inactive = inactivo
payment.invoice = factura
payment.refund = reembolso
payment.subscription_monthly = subscripción mensual
payment.subscription_daily = subscripción diaria
payment.subscription_yearly = subscripción anual

error.INVALID_CREDENTIALS = contraseña o usuario inválido
error.BLOCKED = el item ha sido bloqueado
error.NOT_FOUND = el item no existe
error.FORBIDDEN = acción denegada
error.CANT_CONNECT = no se puede comunicar con el servidor
error.INVALID_DATA_SUBMIT_REFUSED = algunos campos son inválidos
error.INTERNAL_SERVER_ERROR = error interno en el servidor
error.UNSPECIFIED = error desconocido
error.NOTHING_TO_UPDATE = no existen cambios para actualizar
error.MUST_BE_LOGGED_IN = debes iniciar sesión para realizar esta acción
error.USER_BLOCKED = usted está baneado
error.USER_REMOVED = la cuenta relacionada con esta sesión ha sido eliminada
error.USER_EMAIL_TAKEN = el email ya ha sido tomado por otro usuario
error.INVALID_PROPERTY = propiedad inválida
error.INVALID_INCLUDE = elemento de inclusión inválido
error.INVALID_POLICY = chequeos de seguridad han fallado`

const ar = `[ar]
name = العربية
number_decimal_separator = ٫
word_separator = ،
currency_format = N$

yes = نعم
no = ﻻ
unspecified = غير محدد
any = أي اختيار

cancel = إلغاء
ok = حسناً

close = إغلاق

format_bold = عريض
format_italic = مائل
format_underline = تسطير
format_link = link
format_title = عنوان
format_quote = اقتباس
format_list_numbered = قائمة مرقمة
format_list_bulleted = قائمة
format_add_image = إضافة صورة
format_add_file = إضافة ملف
format_add_video = إضافة فيديو
format_add_container = add container
format_add_custom = add custom element
format_set_style = set style
format_set_hover_style = set hover style
format_set_active_style = set active style
format_set_class = set class names
format_set_event_handlers = set event handlers
format_set_context = set context
format_set_render_condition = set render condition
format_make_loop = make loop
format_set_ui_handler = set ui handler
format_set_ui_handler_arg = set ui handler arguments
format_set_ui_handler_arg_name = name
format_set_ui_handler_arg_value = value
format_add_template_text = add template text
format_add_template_html = add template HTML
format_delete_element = delete element
format_more = more options

rich_name = name
rich_alt = alt
rich_sizes = sizes
rich_container = container
rich_inline = inline
rich_text = text
rich_custom = custom
rich_file = file
rich_image = image
rich_link = link
rich_list = list
rich_list_item = list item
rich_paragraph = paragraph
rich_quote = quote
rich_title = title
rich_video = video
rich_styled_component = styled {0}
rich_template_component = template {0}
rich_interactive_component = interactive {0}
rich_style = style
rich_style_active = style active
rich_style_hover = style hover
rich_classes = rich classes
rich_settings = settings
rich_styles = styles
rich_templating = templating
rich_actions = actions
rich_each = loop for each
rich_render_condition = render condition
rich_context = context
rich_ui_handler = ui handler
rich_type = type
rich_standalone = standalone

file_uploader_placeholder_active = ضع ملفاتك هنا
image_uploader_placeholder_active = ضع صورك هنا
file_uploader_placeholder_active_single = ضع ملفاتك هنا
image_uploader_placeholder_active_single = ضع صورك هنا
file_uploader_invalid_type = نمط الملف غير صحح
image_uploader_invalid_type = هذا الملف ليس صورة
file_uploader_file_too_big = الملف كبير جدا، الحد الأقصى لحجم الملف {0}
image_uploader_file_too_big = صورتك كبيرة جدا، الحد الأقصى لحجم الملف {0}
file_uploader_byte_limit_exceed = لقد تجاوزت حد {0} لتحميل الملفات
file_uploader_select_file = اختيار ملف
image_uploader_select_file = اختيار صورة
file_uploader_delete_file = حذف ملف
image_uploader_delete_file = حذف صورة

video_loader_title = insert video
video_loader_label = video url
video_loader_placeholder = youtube/vimeo url links allowed
video_loader_invalid = invalid link
video_loader_submit = submit

link_setter_title = insert link
link_setter_label = url
link_setter_placeholder_local_only = insert link (only local links allowed)
link_setter_placeholder = insert link
link_setter_templated = or select one of these template values
link_setter_templated_label = template value
link_setter_templated_placeholder = template value
link_setter_templated_unspecified = none
link_setter_invalid = invalid link
link_setter_submit = submit

add_template_text_title = insert template text
add_template_text_label = select value
add_template_text_placeholder = select template text value
add_template_text_submit = submit

add_template_html_title = insert template HTML
add_template_html_label = select value
add_template_html_placeholder = select template HTML value
add_template_html_submit = submit

no_results = no results
result_out_of = result {0} out of {1}

callout_exclude_warning = تحذير !... هذا سيميز مادتك على أنها غير مكتملة

unit_dialog_title = اختر وحدة
unit_dialog_others = وحدات اخرى
unit_dialog_metric = المقياس المتري
unit_dialog_imperial = المقياس البريطاني

currency_dialog_title = select currency

menu = لائحة
reload = reload
home = home

blocked_update = An older version of the app is currently running which prevents from updating this app, please close the old version in order to proceed
needs_update_navigation = outdated
needs_update_title = update app
needs_update_content = A new version of the app is currently available
needs_update_action = update

generic_error = error
generic_warning = warning
generic_info = info

unsaved_changes = you have unsaved changes
save = save
discard = discard

payment.type = type of payment
payment.status = status
payment.amount = amount
payment.currency = currency
payment.metadata = metadata
payment.create = create payment
payment.destroy = delete payment
payment.pending = pending
payment.paid = paid
payment.disputed = disputed
payment.reversed = reversed
payment.active = active
payment.inactive = inactive
payment.invoice = invoice
payment.refund = refund
payment.subscription_monthly = monthly subscription
payment.subscription_daily = daily subscription
payment.subscription_yearly = yearly subscription

error.INVALID_CREDENTIALS = مستخدم او كلمة سر غير صحيحة
error.BLOCKED = المادة تم حظرها
error.NOT_FOUND = لا يمكن إيجاد هذه المادة
error.FORBIDDEN = ممنوع
error.CANT_CONNECT = لا يمكن الاتصال مع السيرفر
error.INVALID_DATA_SUBMIT_REFUSED = بعض الحقول غير مناسبة
error.INTERNAL_SERVER_ERROR = عطل داخلي للسيرفر
error.UNSPECIFIED = عطل غير محدد
error.NOTHING_TO_UPDATE = لا يوجد شيء للتحديث
error.MUST_BE_LOGGED_IN = يجب تسجيل الدخول
error.USER_BLOCKED = تم حظرك
error.USER_REMOVED = تم إزالة الحساب المتعلق بهذه الجلسة
error.USER_EMAIL_TAKEN = هذا البريد مأخوذ حاليا
error.INVALID_PROPERTY = خاصية غير مناسبة
error.INVALID_INCLUDE = مضمون غير مناسب
error.INVALID_POLICY = فشل إجراءات السياسة الأمنية`

const ALL = {en, fi, ru, de, es, ar};

return config.supportedLanguages.map((language) => {
  const unregionalizedName = language.split("-")[0];
  if (ALL[language]) {
    return ALL[language]
  } else if (ALL[unregionalizedName]) {
    return ALL[unregionalizedName].replace("[" + unregionalizedName + "]", "[" + language + "]");
  } else {
    return ALL.en.replace("[en]", "[" + language + "]").replace("name = english", "name = " + language);
  }
}).join("\n\n");