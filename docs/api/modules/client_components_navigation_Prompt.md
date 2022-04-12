[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/navigation/Prompt

# Module: client/components/navigation/Prompt

A navigation prompt that prompts if a condition evaluates to true

## Table of contents

### Classes

- [default](../classes/client_components_navigation_Prompt.default.md)

### Type aliases

- [PromptDialogComponent](client_components_navigation_Prompt.md#promptdialogcomponent)

## Type aliases

### PromptDialogComponent

Ƭ **PromptDialogComponent**: `React.ComponentType`<{ `args?`: `any` ; `confirmationCallbackError`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `confirming`: `boolean` ; `open`: `boolean` ; `confirmationCallbackErrorClean`: () => `void` ; `onCancel`: () => `void` ; `onConfirm`: () => `void` ; `onDiscard`: () => `void`  }\>

The prompt dialog component is used when possible by
react router, and since this prompt is just logical
it needs to consume such component

#### Defined in

[client/components/navigation/Prompt.tsx:18](https://github.com/onzag/itemize/blob/5c2808d3/client/components/navigation/Prompt.tsx#L18)