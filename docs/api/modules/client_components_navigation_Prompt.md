[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/navigation/Prompt

# Module: client/components/navigation/Prompt

A navigation prompt that prompts if a condition evaluates to true
as the navigation tries to change location

## Table of contents

### Classes

- [default](../classes/client_components_navigation_Prompt.default.md)

### Type Aliases

- [PromptDialogComponent](client_components_navigation_Prompt.md#promptdialogcomponent)

## Type Aliases

### PromptDialogComponent

Ƭ **PromptDialogComponent**: `React.ComponentType`\<\{ `args?`: `any` ; `confirmationCallbackError`: [`EndpointErrorType`](base_errors.md#endpointerrortype) ; `confirmationCallbackErrorClean`: () => `void` ; `confirming`: `boolean` ; `onCancel`: () => `void` ; `onConfirm`: () => `void` ; `onDiscard`: () => `void` ; `open`: `boolean`  }\>

The prompt dialog component is used when possible by
react router, and since this prompt is just logical
it needs to consume such component

#### Defined in

[client/components/navigation/Prompt.tsx:19](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/Prompt.tsx#L19)
