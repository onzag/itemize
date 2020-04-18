const en = `[en]
name = user
fts_search_field_label = user search
fts_search_field_placeholder = insert relevant user data
custom.login = login
custom.login_alt_field_label = username or email
custom.login_alt_field_placeholder = username or email
custom.login_welcome = welcome
custom.logout = logout
custom.logout_all = logout from all devices
custom.logout_all_description = Invalidates all currently active sessions, and logs you out from all active devices, use this option if you think your account has been compromised
custom.signup = signup
custom.signup_welcome = join the family
custom.signup_accept_terms = by signing up I accept the {0} and {1}
custom.signup_instead = do not have an account? sign up
custom.login_instead = already have an account? log in
custom.profile = profile
custom.my_profile = my profile
custom.update_profile = update profile
custom.profile_updated_successfully = profile updated!
custom.missing_email_warning = Warning! Your email is missing, you won't be able to recover this account you happen to forget your password nor login by email
custom.missing_email_validation_warning = Warning! Your email has not been verified, you won't be able to recover this account you happen to forget your password nor login by email
custom.missing_email_warning_title = missing email
custom.missing_email_validation_warning_title = email needs verification
custom.missing_email_validation_warning_action = verify email
custom.missing_email_validation_warning_action_success = verification email sent successfully
custom.email_is_verified = email is verified
custom.forgot_password_question = forgot password?

custom.preferences = user preferences
custom.update_your_preferences = update your preferences
custom.missing_address = home address not specified
custom.missing_address_warning = Specifying an address will allow you to find and fill information quicker
custom.preferences_updated_successfully = preferences updated successfully

custom.change_password = update password
custom.change_password_current_alt_label = current password
custom.change_password_current_alt_placeholder = current password
custom.change_password_new_alt_label = current password
custom.change_password_new_alt_placeholder = current password

custom.delete_account = delete account
custom.delete_account_warning = Warning! this will delete your account and all associated data, this action cannot be reversed, do you wish to proceed?

custom.recover_account = account recovery
custom.recover_account_message = Note that your email needs to be set and validated in order for the recover account to function
custom.recover_account_action = send email with instructions
custom.recover_account_action_success = sucessfully sent email

custom.reset_password = reset password
custom.reset_password_message = Use a strong password with alphanumeric characters and symbols
custom.reset_password_success = password changed successfully!
custom.reset_password_field_alt_label = new password
custom.reset_password_field_alt_placeholder = new password
custom.reset_password_action = update password

custom.validate_account = activate your account
custom.validate_account_template_name =
custom.validate_account_email_user = validate
custom.validate_account_user = $APPNAME
custom.validate_account_title = validate your $APPNAME account
custom.validate_account_description = In order to validate your account so as to be able to receive notifications and recover it you need to click on this button
custom.validate_account_activate_button = activate
custom.validate_account_alt_link = alternatively you can click on this link
custom.validate_account_success = your account has been successfully activated
custom.validate_account_success_title = success!

custom.forgot_password = forgot password
custom.forgot_password_template_name =
custom.forgot_password_email_user = recovery
custom.forgot_password_user = $APPNAME
custom.forgot_password_title = recover your $APPNAME account
custom.forgot_password_description = In order to reset your account you need to click on this link which will log you in, temporarily into your profile, this will allow to change your password
custom.forgot_password_recover_button = recover account
custom.forgot_password_link_target = /en/reset-password
custom.forgot_password_alt_link = alternatively you can click on this link

properties.username.label = username
properties.username.placeholder = type an username
properties.username.search.label = username
properties.username.search.placeholder = type the username
properties.username.error.NOT_NULLABLE = missing username
properties.username.error.TOO_LARGE = username is too long
properties.username.error.NOT_UNIQUE = username is taken
properties.username.error.INVALID_SUBTYPE_VALUE = special characters and spaces are not allowed

properties.email.label = email
properties.email.placeholder = your email address
properties.email.description = Your email will not be shared with anyone, it is kept private to all other users
properties.email.error.TOO_LARGE = email is too long
properties.email.error.INVALID_SUBTYPE_VALUE = email is invalid

properties.e_validated.label = email is validated
properties.e_validated.description = Refers to whether the email is validated or not

properties.e_notifications.label = send email notifications
properties.e_notifications.description = Do not miss content by recieving email notifications

properties.e_newsletter.label = subscribe to newsletter
properties.e_newsletter.description = Keep yourself updated with our amazing newsletter

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

properties.address.label = address
properties.address.placeholder = type your address
properties.address.description = This address is used only for ease of use and it is not shared with anyone. It is used to prefill information for transactions.

policies.edit.REQUIRES_PASSWORD_CONFIRMATION.title = password confirmation
policies.edit.REQUIRES_PASSWORD_CONFIRMATION.fail = invalid password provided
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.title = password confirmation
policies.delete.REQUIRES_PASSWORD_CONFIRMATION.fail = invalid password provided`

const es = `[es]
name = usuario
fts_search_field_label = buscar usuario
fts_search_field_placeholder = inserte información relevante sobre el usuario
custom.login = iniciar sesión
custom.login_alt_field_label = nombre de usuario o email
custom.login_alt_field_placeholder = nombre de usuario o email
custom.login_welcome = bienvenido
custom.logout = cerrar sesión
custom.logout_all = cerrar todas las sesiones activas
custom.logout_all_description = Invalida todas las sesiones activas relacionadas con este usuario, y cierra todas las sesiones activas, use este proceso si piensa que su cuenta ha sido robada
custom.signup = registrarse
custom.signup_welcome = únase a la familia
custom.signup_accept_terms = al crear una cuenta acepto los {0} y la {1}
custom.profile = perfil de usuario
custom.my_profile = mi Cuenta
custom.signup_instead = ¿no tiene cuenta? regístrese
custom.login_instead = ¿ya tiene cuenta? inicie sesión
custom.update_profile = actualizar información
custom.profile_updated_successfully = ¡actualización exitosa!
custom.missing_email_warning = ¡Atención! Su cuenta no tiene un email asociado a ésta, no será capaz de recuperar su cuenta si se ha olvidado de la contraseña ni iniciar sesión por email
custom.missing_email_validation_warning = ¡Atención! Su correo electrónico no ha sido verificado, no será capaz de recuperar su cuenta si se ha olvidado de la contraseña ni iniciar sesión por email
custom.missing_email_warning_title = falta el correo electrónico
custom.missing_email_validation_warning_title = el correo electrónico necesita ser verificado
custom.missing_email_validation_warning_action = verificar email
custom.missing_email_validation_warning_action_success = email de verficación ha sido enviado
custom.email_is_verified = el correo ha sido verificado
custom.forgot_password_question = ¿Ha olvidado su contraseña?

custom.preferences = preferencias
custom.update_your_preferences = actualize sus preferencias
custom.missing_address = falta la dirección
custom.missing_address_warning = Al añadir una dirección se hace más sencillo buscar y poner información
custom.preferences_updated_successfully = preferencias actualizadas exitosamente

custom.change_password = cambiar la contraseña
custom.change_password_current_alt_label = contraseña actual
custom.change_password_current_alt_placeholder = contraseña actual
custom.change_password_new_alt_label = contraseña nueva
custom.change_password_new_alt_placeholder = contraseña nueva

custom.delete_account = eliminar la cuenta
custom.delete_account_warning = ¡Atención! esto eliminará su cuenta y todos los datos asociados, la acción no se puede revertir ¿Seguro desea continuar?

custom.recover_account = recuperar acceso
custom.recover_account_message = ¡Atención! su email debe estar validado para poder ser capáz de recuperar su cuenta
custom.recover_account_action = enviar email con instrucciones
custom.recover_account_action_success = ¡Correo enviado exitosamente!

custom.reset_password = recuperar contraseña
custom.reset_password_message = Use una contraseña con caracteres alfanuméricos y símbolos
custom.reset_password_success = ¡cambio exitoso!
custom.reset_password_field_alt_label = nueva contraseña
custom.reset_password_field_alt_placeholder = nueva contraseña
custom.reset_password_action = actualize la contraseña

custom.validate_account = active su cuenta
custom.validate_account_template_name =
custom.validate_account_email_user = activar
custom.validate_account_user = $APPNAME
custom.validate_account_title = valide su cuenta de $APPNAME
custom.validate_account_description = Para poder recuperar su cuenta y poder recibir notificationes debe activar su correo electrónico
custom.validate_account_activate_button = activar
custom.validate_account_alt_link = de forma alternativa puede hacer click en éste link
custom.validate_account_success = su cuenta ha sido activada satisfactoriamente
custom.validate_account_success_title = ¡validación exitosa!

custom.forgot_password = He olvidado mi contraseña
custom.forgot_password_template_name =
custom.forgot_password_email_user = recuperar
custom.forgot_password_user = $APPNAME
custom.forgot_password_title = recupere su cuenta de $APPNAME
custom.forgot_password_description = Para recuperar su cuenta haga click en éste link, le permitirá iniciar sesión y podrá cambiar su contraseña
custom.forgot_password_recover_button = recupere su cuenta
custom.forgot_password_link_target = /es/reset-password
custom.forgot_password_alt_link = de forma alternativa puede hacer click en éste link

properties.username.label = nombre de usuario
properties.username.placeholder = escriba un nombre de usuario
properties.username.search.label = nombre de usuario
properties.username.search.placeholder = escriba el nombre del usuario
properties.username.error.NOT_NULLABLE = falta el nombre del usuario
properties.username.error.TOO_LARGE = el nombre de usuario es demasiado largo
properties.username.error.NOT_UNIQUE = el nombre de usuario ya ha sido tomado
properties.username.error.INVALID_SUBTYPE_VALUE = los caractéres especiales y espacios no se permiten

properties.email.label = email
properties.email.placeholder = dirección de correo electrónico
properties.email.description = Tu correo no será compartido con nadie, se mantendrá privado para otros usuarios
properties.email.error.TOO_LARGE = el correo electrónico es demasiado largo
properties.email.error.INVALID_SUBTYPE_VALUE = el correo electrónico es inválido

properties.e_validated.label = el email ha sido confirmado
properties.e_validated.description = indica si el correo electrónico ha sido confirmado por el usuario

properties.e_notifications.label = notificaciones por correo electrónico
properties.e_notifications.description = No se pierda de ningún contenido reciviendo notificaciones por correo

properties.e_newsletter.label = recivir noticias
properties.e_newsletter.description = Manténgase actualizado con nuestro boletín informativo

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

properties.address.label = dirección
properties.address.placeholder = escriba su Dirección
properties.address.description = La dirección no será compartida con nadie. Sólo existe como utilidad para auto-completar la información de transacciones.

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
}).map((l) => {
  return l.replace(/\$APPNAME/g, config.appName.replace(/\s/g, "_"));
}).join("\n\n");