[](../README.md) / [Exports](../modules.md) / client/internal/text/serializer/template-args

# Module: client/internal/text/serializer/template-args

## Table of contents

### Classes

- [MutatingFunctionArg](../classes/client_internal_text_serializer_template_args.mutatingfunctionarg.md)
- [MutatingTemplateArgs](../classes/client_internal_text_serializer_template_args.mutatingtemplateargs.md)
- [TemplateArgs](../classes/client_internal_text_serializer_template_args.templateargs.md)

### Interfaces

- [ITemplateArgsProperties](../interfaces/client_internal_text_serializer_template_args.itemplateargsproperties.md)

### Type aliases

- [TemplateArgFunctionalWrapperFn](client_internal_text_serializer_template_args.md#templateargfunctionalwrapperfn)
- [TemplateArgMutatingWrapperFn](client_internal_text_serializer_template_args.md#templateargmutatingwrapperfn)
- [TemplateArgStandardWrapperFn](client_internal_text_serializer_template_args.md#templateargstandardwrapperfn)

## Type aliases

### TemplateArgFunctionalWrapperFn

Ƭ **TemplateArgFunctionalWrapperFn**: (`children`: (`fn`: Function) => React.ReactNode, `fnKey`: *string*) => React.ReactNode

#### Type declaration:

▸ (`children`: (`fn`: Function) => React.ReactNode, `fnKey`: *string*): React.ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`children` | (`fn`: Function) => React.ReactNode |
`fnKey` | *string* |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/template-args.ts:117](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L117)

___

### TemplateArgMutatingWrapperFn

Ƭ **TemplateArgMutatingWrapperFn**: (`children`: (`newContext`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md), `key?`: *string* \| *number*) => React.ReactNode) => React.ReactNode

Provides a function that returns the node that should be children of it
in the case of setting mutating context it should be used as eg.

new TemplateArgs({
  myMutatingContext: new DynamicTemplateArgs(
    (children) => {
      return (
        <ContextRetrieverWhatnot>
          {(contextData) => (
             children(new TemplateArgs(contextData))
          )}
        </ContextRetrieverWhatnot>
      );
    }
  );
});

and for iterable

new TemplateArgs({
  myMutatingContext: new DynamicTemplateArgs(
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
});

it's possible to double wrap on iterables

new TemplateArgs({
  myMutatingContext: new DynamicTemplateArgs(
    (children) => {
      return (
        <ContextRetrieverWhatnot>
          {(contextData) => (
             contextData.map((data, index) => <OtherContextProvider key={index}>children(new TemplateArgs(data))</OtherContextProvider>)
          )}
        </ContextRetrieverWhatnot>
      );
    }
  );
});

#### Type declaration:

▸ (`children`: (`newContext`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md), `key?`: *string* \| *number*) => React.ReactNode): React.ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`children` | (`newContext`: [*TemplateArgs*](../classes/client_internal_text_serializer_template_args.templateargs.md), `key?`: *string* \| *number*) => React.ReactNode |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/template-args.ts:86](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L86)

___

### TemplateArgStandardWrapperFn

Ƭ **TemplateArgStandardWrapperFn**: (`n`: React.ReactNode) => React.ReactNode

Just takes a node and should return a node, allows everything within that context
to be wrapped within this

#### Type declaration:

▸ (`n`: React.ReactNode): React.ReactNode

#### Parameters:

Name | Type |
:------ | :------ |
`n` | React.ReactNode |

**Returns:** React.ReactNode

Defined in: [client/internal/text/serializer/template-args.ts:34](https://github.com/onzag/itemize/blob/28218320/client/internal/text/serializer/template-args.ts#L34)
