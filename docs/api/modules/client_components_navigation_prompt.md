[](../README.md) / [Exports](../modules.md) / client/components/navigation/Prompt

# Module: client/components/navigation/Prompt

A navigation prompt that prompts if a condition evaluates to true

## Table of contents

### Classes

- [default](../classes/client_components_navigation_prompt.default.md)

### Type aliases

- [PromptDialogComponent](client_components_navigation_prompt.md#promptdialogcomponent)

## Type aliases

### PromptDialogComponent

Ƭ **PromptDialogComponent**: *React.ComponentType*<{ `args?`: *any* ; `confirmationCallbackError`: [*EndpointErrorType*](base_errors.md#endpointerrortype) ; `confirmationCallbackErrorClean`: () => *void* ; `confirming`: *boolean* ; `onCancel`: () => *void* ; `onConfirm`: () => *void* ; `onDiscard`: () => *void* ; `open`: *boolean*  }\>

The prompt dialog component is used when possible by
react router, and since this prompt is just logical
it needs to consume such component

Defined in: [client/components/navigation/Prompt.tsx:18](https://github.com/onzag/itemize/blob/11a98dec/client/components/navigation/Prompt.tsx#L18)
