[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/accessibility/util

# Module: client/components/accessibility/util

## Table of contents

### Interfaces

- [IAltReactionerComponentProps](../interfaces/client_components_accessibility_util.IAltReactionerComponentProps.md)

### Type Aliases

- [AltReactionerComponentType](client_components_accessibility_util.md#altreactionercomponenttype)

### Functions

- [getAccessibilityEnabledCustomTextProcesser](client_components_accessibility_util.md#getaccessibilityenabledcustomtextprocesser)
- [onKeyDown](client_components_accessibility_util.md#onkeydown)

## Type Aliases

### AltReactionerComponentType

Ƭ **AltReactionerComponentType**: `React.ComponentType`\<[`IAltReactionerComponentProps`](../interfaces/client_components_accessibility_util.IAltReactionerComponentProps.md)\>

#### Defined in

[client/components/accessibility/util.tsx:30](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/util.tsx#L30)

## Functions

### getAccessibilityEnabledCustomTextProcesser

▸ **getAccessibilityEnabledCustomTextProcesser**(`fns`): `any`

This function is used to enable accessibility in general text values created
by the document, in the case of the fast prototyping mechanism it shall be passed to
onCustom function and makeTemplate should be set to true

The output of this function is passed as an argument to the onCustom function
during the reactification of text

1. Raw Text is sanitized by the sanitize function (raw HTML)
2. Raw text is deserialized (and maybe normalized)
3. Processed text tree is then reactified - and this is where the onCustom function should be used
4. Resulting react tree is displayed

This adds the following sugar to the reactification
- All paragraphs are alt text
- All containers are setup as a group so the text follows, this includes, container, custom, and tables
- All images are set as alt text (if they are alt text) or as an alt reactioner element
- All links are set as alt reactioner
- All files are set as alt reactioner

Please pass your own alt reactioner element, the fast prototyping AltBadgeReactioner can be used here
but you can also make your own, it must be compatible with the AltReactioner as that's what it expects

This does not affect UI Handled elements as the customization is powerless to touch such ui
handled elements, it also will not affect templated html content

example usage with fast prototyping badge reactioner

const textProcesser = getAccessibilityEnabledCustomTextProcesser({
  AltReactionerComponent: AltBadgeReactioner,
  altReactionerCustomProps: (element) => {
    if (element.type === "link") {
      return {
        sx: {verticalAlign: "baseline"}
      }
    }
    return null;
  }
});

which then it can be used in a text view node, this is only true for fast prototyping
text renderer

<View id="content" rendererArgs={{makeTemplate: true, onCustom: textProcesser}}/>

It's possible to manually raw text, but it's difficult.

If you write your own view renderer you will likely get it straight away sanitized and you
won't have to worry about sanitizing the content and processing the urls, etc... just grab
the current value

Then use the deserialize function to get a tree, and feed that output to reactifiy.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | `IAccessibleFns` |

#### Returns

`any`

#### Defined in

[client/components/accessibility/util.tsx:607](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/util.tsx#L607)

___

### onKeyDown

▸ **onKeyDown**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `KeyboardEvent`\<`Element`\> |

#### Returns

`void`

#### Defined in

[client/components/accessibility/util.tsx:13](https://github.com/onzag/itemize/blob/59702dd5/client/components/accessibility/util.tsx#L13)
