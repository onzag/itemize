const en = `[en]
name = user
fts_search_field_label = user search
fts_search_field_placeholder = insert relevant user data
custom.login = login
custom.logout = logout
custom.signup = signup
custom.signup_instead = do not have an account? sign up
custom.login_instead = already have an account? log in
custom.profile = profile
custom.my_profile = my profile
custom.update_profile = update profile
custom.profile_updated_succesfully = profile updated!

properties.username.label = username
properties.username.placeholder = type an username
properties.username.search.label = username
properties.username.search.placeholder = type the username
properties.username.error.NOT_NULLABLE = missing username
properties.username.error.TOO_LARGE = username is too long
properties.username.error.NOT_UNIQUE = username is taken

properties.email.label = email
properties.email.placeholder = Your email address
properties.email.description = Your email will not be shared with anyone, it is kept private even to admins and moderators
properties.email.error.TOO_LARGE = email is too long
properties.email.error.INVALID_SUBTYPE_VALUE = email is invalid

properties.e_validated.label = email is validated
properties.e_validated.description = refers to whether the email is validated or not

properties.password.label = password
properties.password.placeholder = password
properties.password.error.NOT_NULLABLE = missing password
properties.password.error.TOO_LARGE = password too long

properties.role.label = role
properties.role.placeholder = choose an user role
properties.role.search.label = search Role
properties.role.search.placeholder = specify a role to search
properties.role.values.USER = user
properties.role.values.MODERATOR = moderator
properties.role.values.ADMIN = admin
$EXTRAROLES
properties.role.null_value = unspecified
properties.role.error.NOT_NULLABLE = missing role

properties.profile_picture.label = profile picture
properties.profile_picture.placeholder = upload a profile picture
properties.profile_picture.error.TOO_LARGE = only one file allowed

properties.address.label = address (optional)
properties.address.placeholder = type your address
properties.address.description = This address is used only for ease of use and it is not shared with anyone, not even admins or mods. It is used to prefill information for transactions.

policies.edit.REQUIRES_PASSWORD_CONFIRMATION.title = password confirmation
policies.edit.REQUIRES_PASSWORD_CONFIRMATION.fail = invalid password provided
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.title = password confirmation
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.fail = invalid password provided`

const es = `[es]
name = usuario
fts_search_field_label = buscar usuario
fts_search_field_placeholder = inserte información relevante sobre el usuario
custom.login = iniciar Sesión
custom.logout = cerrar Sesión
custom.signup = registrarse
custom.profile = perfil de usuario
custom.my_profile = mi Cuenta
custom.signup_instead = ¿no tiene cuenta? regístrese
custom.login_instead = ¿ya tiene cuenta? inicie sesión
custom.update_profile = actualizar información
custom.profile_updated_succesfully = ¡actualización exitosa!

properties.username.label = nombre de usuario
properties.username.placeholder = escriba un nombre de usuario
properties.username.search.label = nombre de usuario
properties.username.search.placeholder = escriba el nombre del usuario
properties.username.error.NOT_NULLABLE = falta el nombre del usuario
properties.username.error.TOO_LARGE = el nombre de usuario es demasiado largo
properties.username.error.NOT_UNIQUE = el nombre de usuario ya ha sido tomado

properties.email.label = email
properties.email.placeholder = dirección de correo electrónico
properties.email.description = Tu correo no será compartido con nadie, se mantendrá privado incluso para administradores y moderadores
properties.email.error.TOO_LARGE = el correo electrónico es demasiado largo
properties.email.error.INVALID_SUBTYPE_VALUE = el correo electrónico es inválido

properties.e_validated.label = el email ha sido confirmado
properties.e_validated.description = indica si el correo electrónico ha sido confirmado por el usuario

properties.password.label = contraseña
properties.password.placeholder = contraseña
properties.password.error.NOT_NULLABLE = falta la contraseña
properties.password.error.TOO_LARGE = la contraseña es demasiado larga

properties.role.label = rol
properties.role.placeholder = seleccione el rol del usuario
properties.role.search.label = buscar rol
properties.role.search.placeholder = especifíque un rol para la búsqueda
properties.role.values.USER = usuario
properties.role.values.MODERATOR = moderador
properties.role.values.ADMIN = administrador
$EXTRAROLES
properties.role.null_value = sin especificar
properties.role.error.NOT_NULLABLE = falta el Rol

properties.profile_picture.label = foto de Perfil
properties.profile_picture.placeholder = subir Imagen
properties.profile_picture.error.TOO_LARGE = sólo se permite un archivo

properties.address.label = dirección (opcional)
properties.address.placeholder = escriba su Dirección
properties.address.description = La Dirección no será compartida con nadie, ni siquiera admins o moderadores. Sólo existe como utilidad para auto-completar la información de transacciones.

policies.edit.REQUIRES_PASSWORD_CONFIRMATION.title = confirme su contraseña
policies.edit.REQUIRES_PASSWORD_CONFIRMATION.fail = falló el chequeo de la contraseña
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.title = confirme su contraseña
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.fail = falló el chequeo de la contraseña`

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
}).map((l) => {
  const extraRoles = config.roles.filter((r) => r !== "ADMIN" && r !== "MODERATOR" && r !== "USER").map((r) => {
    return "properties.role.values." + r + " = " + r.toLowerCase();
  }).join("\n");
  if (extraRoles === "") {
    return l.replace("$EXTRAROLES\n", extraRoles);
  } else {
    return l.replace("$EXTRAROLES", extraRoles);
  }
}).join("\n\n");