[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/text/serializer/template-args

# Module: client/internal/text/serializer/template-args

## Table of contents

### Classes

- [MutatingFunctionArg](../classes/client_internal_text_serializer_template_args.MutatingFunctionArg.md)
- [MutatingTemplateArgs](../classes/client_internal_text_serializer_template_args.MutatingTemplateArgs.md)
- [NonRootInheritable](../classes/client_internal_text_serializer_template_args.NonRootInheritable.md)
- [TemplateArgs](../classes/client_internal_text_serializer_template_args.TemplateArgs.md)

### Interfaces

- [ITemplateArgBooleanDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgBooleanDefinition.md)
- [ITemplateArgContextDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgContextDefinition.md)
- [ITemplateArgFunctionDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgFunctionDefinition.md)
- [ITemplateArgHTMLDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgHTMLDefinition.md)
- [ITemplateArgLinkDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgLinkDefinition.md)
- [ITemplateArgTextDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgTextDefinition.md)
- [ITemplateArgUIHandlerDefinition](../interfaces/client_internal_text_serializer_template_args.ITemplateArgUIHandlerDefinition.md)
- [ITemplateArgsProperties](../interfaces/client_internal_text_serializer_template_args.ITemplateArgsProperties.md)

### Type aliases

- [TemplateArgFunctionalWrapperFn](client_internal_text_serializer_template_args.md#templateargfunctionalwrapperfn)
- [TemplateArgMutatingWrapperFn](client_internal_text_serializer_template_args.md#templateargmutatingwrapperfn)

## Type aliases

### TemplateArgFunctionalWrapperFn

Ƭ **TemplateArgFunctionalWrapperFn**: (`children`: (`fn`: `Function`) => `React.ReactNode`, `fnKey`: `string`) => `React.ReactNode`

#### Type declaration

▸ (`children`, `fnKey`): `React.ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `children` | (`fn`: `Function`) => `React.ReactNode` |
| `fnKey` | `string` |

##### Returns

`React.ReactNode`

#### Defined in

[client/internal/text/serializer/template-args.ts:170](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L170)

___

### TemplateArgMutatingWrapperFn

Ƭ **TemplateArgMutatingWrapperFn**: (`children`: (`newContext`: [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md), `key?`: `string` \| `number`) => `React.ReactNode`) => `React.ReactNode`

#### Type declaration

▸ (`children`): `React.ReactNode`

Provides a function that returns the node that should be children of it
in the case of setting mutating context it should be used as eg.

new TemplateArgs({
  name: new NonRootInheritable("jonh"),
  person: true,
  myMutatingContext: new MutatingTemplateArgs(
    (children) => {
      return (
        <ContextRetrieverWhatnot>
          {(contextData) => (
             children(new TemplateArgs(contextData))
          )}
        </ContextRetrieverWhatnot>
      );
    }
  ),
  open: () => goTo("/cart"),
  openMutating: new MutatingFunctionArg(
    (children, fnKey) => {
       return (
          <ContextRetrieverWhatnot>
            {(contextData) => (
               // pass the function from a context
               children(contextData[fnKey])
            )}
          </ContextRetrieverWhatnot>
       )
    }
  );
});

and for iterable

new TemplateArgs({
  name: new NonRootInheritable("jonh"),
  person: true,
  myMutatingContext: new MutatingTemplateArgs(
    (children) => {
      return (
        <ContextRetrieverWhatnot>
          {(contextData) => (
             contextData.map((data, index) => children(new TemplateArgs(data), index))
          )}
        </ContextRetrieverWhatnot>
      );
    }
  );
  open: () => goTo("/cart"),
  openMutating: new MutatingFunctionArg(
    (children, fnKey) => {
       return (
          <ContextRetrieverWhatnot>
            {(contextData) => (
               // pass the function from a context
               children(contextData[fnKey])
            )}
          </ContextRetrieverWhatnot>
       )
    }
  );
});

it's possible to double wrap on iterables

new TemplateArgs({
  name: new NonRootInheritable("jonh"),
  person: true,
  myMutatingContext: new MutatingTemplateArgs(
    (children) => {
      return (
        <ContextRetrieverWhatnot>
          {(contextData) => (
             contextData.map((data, index) => <OtherContextProvider key={index}>children(new TemplateArgs(data))</OtherContextProvider>)
          )}
        </ContextRetrieverWhatnot>
      );
    }
  ),
  open: () => goTo("/cart"),
  openMutating: new MutatingFunctionArg(
    (children, fnKey) => {
       return (
          <ContextRetrieverWhatnot>
            {(contextData) => (
               // pass the function from a context
               children(contextData[fnKey])
            )}
          </ContextRetrieverWhatnot>
       )
    }
  );
});

##### Parameters

| Name | Type |
| :------ | :------ |
| `children` | (`newContext`: [`TemplateArgs`](../classes/client_internal_text_serializer_template_args.TemplateArgs.md), `key?`: `string` \| `number`) => `React.ReactNode` |

##### Returns

`React.ReactNode`

#### Defined in

[client/internal/text/serializer/template-args.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/client/internal/text/serializer/template-args.ts#L129)
