const en = `[en]
name = messages
search_field_label = search mail
search_field_placeholder = search mail
search_value_too_large = your search is too long, please narrow it down
search_keywords = mail

custom.unread = unread
custom.inbox = inbox
custom.outbox = sent
custom.spam = spam

custom.title_unread = unread messages
custom.title_inbox = inbox
custom.title_outbox = sent messages
custom.title_spam = spam

custom.mark_as_spam = mark as spam
custom.mark_as_safe = mark as safe
custom.reply = reply
custom.reply_all = reply all
custom.forward = forward
custom.wrote_to = to {0}
custom.re = Re: {0}
custom.re_f = Forward: {0}
custom.spam_warning = Warning! this message has been marked as spam
custom.new = new email
custom.send = send email
custom.no_subject = (no subject)
custom.invalid_user = missing account
custom.me = me
custom.you = you
custom.and_two = {0} and {1}
custom.and_three = {0}, {1} and {2}
custom.and_more = {0}, {1}, {2} and {3} more

properties.target.label = recepients
properties.target.placeholder = to whom this email will be sent
properties.target.search.label = search by recepients
properties.target.search.placeholder = search by recepients
properties.target.error.NOT_NULLABLE = recepients must be specified
properties.target.error.TOO_LARGE = too many recepients at once

properties.content.label = content
properties.content.placeholder = write your email here...
properties.content.error.TOO_LARGE = you have written too much
properties.content.search.label = search
properties.content.search.placeholder = search in content
properties.content.error.TOO_LARGE = content is too long
properties.content.error.MEDIA_PROPERTY_TOO_LARGE = you have added too much media content

properties.subject.label = subject
properties.subject.placeholder = subject
properties.subject.error.TOO_LARGE = subject is too long
properties.subject.search.label = search
properties.subject.search.placeholder = search in subject

properties.attachments.label = attachments
properties.attachments.placeholder = add attachments
properties.attachments.error.TOO_LARGE = too many attachments added
`

const ALL = {en};

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