[](../README.md) / [Exports](../modules.md) / client/fast-prototyping/components/avatar

# Module: client/fast-prototyping/components/avatar

The avatar allows to show an user avatar in a nice way using the mui avatar

## Table of contents

### Variables

- [Avatar](client_fast_prototyping_components_avatar.md#avatar)
- [AvatarRenderer](client_fast_prototyping_components_avatar.md#avatarrenderer)

## Variables

### Avatar

• `Const` **Avatar**: *ComponentType*<*Pick*<IAvatarProps, *id* \| *size* \| *fullWidth* \| *profileURL* \| *cacheImage* \| *linkClassName* \| *userNameValue* \| *isSpecialUser* \| *profilePictureValue* \| *countryCode* \| *warningCount*\> & *StyledComponentProps*<*flag* \| *hoverAddBackdrop* \| *avatar* \| *fullWidth* \| *avatarContainer* \| *avatarUploadError* \| *avatarContainerLarge* \| *avatarBadge* \| *avatarLarge* \| *avatarMedium* \| *randomColor0* \| *randomColor1* \| *randomColor2* \| *randomColor3* \| *randomColor4* \| *randomColor5* \| *randomColor6* \| *randomColor7* \| *randomColor8* \| *randomColor9* \| *specialUser* \| *specialUserMedium* \| *specialUserLarge*\>\>

Will display an avatar for a given user, this fast prototyping
component makes no assumptions and as such you will have to implement
your own wrapper around it to make your own avatar type

Defined in: [client/fast-prototyping/components/avatar.tsx:341](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/avatar.tsx#L341)

___

### AvatarRenderer

• `Const` **AvatarRenderer**: *ComponentType*<*Pick*<IAvatarRendererProps, *propertyId* \| *args* \| *rtl* \| *icon* \| *disabled* \| *label* \| *accept* \| *isExpectingImages* \| *genericActivePlaceholder* \| *genericDeleteLabel* \| *genericSelectLabel* \| *isSupportedImage* \| *rejected* \| *rejectedReason* \| *imageSrcSet* \| *imageSizes* \| *prettySize* \| *extension* \| *onSetFile* \| *onRemoveFile* \| *openFile* \| *placeholder* \| *description* \| *currentAppliedValue* \| *canRestore* \| *currentValue* \| *currentValid* \| *currentInvalidReason* \| *currentInternalValue* \| *autoFocus* \| *enableUserSetErrors* \| *onChange* \| *onRestore*\> & *StyledComponentProps*<*flag* \| *hoverAddBackdrop* \| *avatar* \| *fullWidth* \| *avatarContainer* \| *avatarUploadError* \| *avatarContainerLarge* \| *avatarBadge* \| *avatarLarge* \| *avatarMedium* \| *randomColor0* \| *randomColor1* \| *randomColor2* \| *randomColor3* \| *randomColor4* \| *randomColor5* \| *randomColor6* \| *randomColor7* \| *randomColor8* \| *randomColor9* \| *specialUser* \| *specialUserMedium* \| *specialUserLarge*\>\>

A fully custom renderer for the avatar component for usage with file types
so it can be passed as a custom renderer via the entry, eg...
<Entry id="profile_picture" renderer={AvatarRenderer}/> rather
than using the default

Defined in: [client/fast-prototyping/components/avatar.tsx:366](https://github.com/onzag/itemize/blob/0e9b128c/client/fast-prototyping/components/avatar.tsx#L366)
