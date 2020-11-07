# Text Specs

This file represents the text specification for itemize that should allow to create feature rich applicaitons as well as templates using its own form, the text specs represent fully valid HTML.

The purpose of the text specs being this meaningful is to provide a design platform in order to separate programming work from design work

## Text

The text is represented as a string, however null is also a valid value, this is for when there's no text (as in an empty string); for such the value should be null and is considered equivalent to null

## Links

Links should use the href property because the href property is a forbidden attribute

These links are validated and can be relative

```html
<a href="some/url">my link</a>
```

## Images

Any images that are added to the text should be compounded like this

```html
<a class="image">
  <div class="image-container">
    <div class="image-pad" style="padding-bottom: 50%">
      <img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000">
    </div>
  </div>
</a>
```

However the attributes `src`, `srcset` and `sizes` might be added as well and it's considered valid and it can be submitted to the server side with these attributes in place, but they will be removed by such server side

```html
<a class="image">
  <div class="image-container">
    <div class="image-pad" style="padding-bottom: 50%">
      <img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000" sizes="70vw" src="blob:xxxxxx" srcset="etc...">
    </div>
  </div>
</a>
```

The breakdown can be given like this the `div.image` represents the begining of an image, and the `a.image-container` is next as it's what actually contains the image, it is an a type because it is able to hold a href when wished to do so, the `div.image-pad` class contains the valid style with a given padding this padding represents the relative height to ratio for the given image, 

This is the "standard" form itemize recommends to format images as the rich text editor will be able to handle these, and it will able to load them lazily without affecting the layout, as the fast prototyping viewer does, however the viewer also supports standalone images.

### Standalone images

While images are by default meant to be setup as specified, images are also allowed to be standalone, as such this is valid as well.

```html
<img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000">
```

You might wrap them up inside a custom container, a standard container or anything as your hearts content remember to keep the names valid

```html
<div class="rich-text--header">
  <img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000">
  <p>This is my header</p>
</div>
```

### Attributes

 - `alt` represents the alt text
 - `data-src-height` represents the height of the image in pixels
 - `data-src-width` represents the width of the image in pixels
 - `data-src-id` represents the given id of the file in its media property, text can be correlated to a media property and this is where it extracts its file content from, since images can have many sizes and represent many types of file; specifying a source directly via the text specification is not truly allowed

### Forbidden Attributes

These attributes can be used but they are removed by the server side for security reasons

 - src
 - srcset
 - sizes
 - data-src
 - loading
 - id

Feel free to use them they won't pollute the environment; in fact src, srcset, and sizes should be added by the handler

### Handling

For handling you should read the mediaProperty current value to find the file with the data-src-id and generate an appropiate src, sizes and srcset the handler of itemize does this by default and provides the html with these values populated already

### Custom Renderers

When creating your own renderer view or entry, you should already have the src, srcset and sizes available in the HTML for any
files that already existed even if they are stripped in the actually saved HTML as the handler will actually regenerate them; however
for any new created content you must manually create the image structure; the server will recognize these.

It is recommended to copy the fast prototyping renderer in the itemize source at `client/fast-prototyping/renderers` and find the respective renderer to replicate since these renderers can be complex, but wanting to add custom behaviour in the renderer itself might prove to require this, since the handlers don't do much to the text data.

Do not bother removing the src, srcset nor sizes for sending or any of the forbidden attributes; this will be done automatically by the server side itself, it won't serve them; the parameters of the sanitazation of the client and the server differ a little bit, the client is more strict, and the handler takes care of this, however it's good to understand what is going on.

Other properties will also be removed, such as loading; so feel free to implement them in the renderer, it won't affect other clients only the spec here is allowed.

### CSS

In order to keep images property with a proper placeholder that takes the same exact size, this css is what is recommended into your rich text form, this will ensure that there's a div that takes as much space as your image, so not to have bad experience scrolling

```scss
.image {
  .image-container {
    position: relative;
    width: 100%;

    .image-pad {
      position: relative;
      width: 100%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  }
}
```

## Videos

Videos are loaded via iframes, either from youtube or vimeo; by the text specs right now only those two clients are currently allowed, for security reasons, since `src` is a forbidden attribute.

### Youtube

```html
<div class="video">
  <div class="video-container">
    <iframe allowfullscreen data-video-origin="youtube" data-video-src="ID" frameborder="0"></iframe>
  </div>
</div>
```

### Vimeo

```html
<div class="video">
  <div class="video-container">
    <iframe allowfullscreen data-video-origin="vimeo" data-video-src="ID" frameborder="0">
  </div>
</div>
```

### Forbidden Attributes

Similarly to image the src attribute is forbidden and as such is removed from the value itself the attribute must be calculated in the
client side, as such.

```html
<div class="video">
  <div class="video-container">
    <iframe allowfullscreen data-video-origin="vimeo" data-video-src="ID" frameborder="0" src="https://player.vimeo.com/video/ID?title=0&byline=0&portrait=0&badge=0">
  </div>
</div>
```

This prevents iframes linking from any strange source that is not allowed, the list of forbidden attributes that affect iframes is

 - src
 - loading
 - data-src

These are the forbidden attribute list, while src should be added by the handler

### Handling

Property src is removed by the server side so when handling this property should be readded before being passed to the renderer, calculating the source is rather a straightforward process as it comes from the ID itself, both youtube and vimeo videos have an unique string identifier

### Custom Renderers

The custom renderer will receive a video with its src as it should be calculated by the handler itself, the renderer is free to create other properties as well, such as loading.

### CSS

A recommended css is, in order to have a good aspect ratio

```scss
.video-container {
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  position: relative;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

## Files

Files can be inserted into the document and work similarly to images, however containing more information, this is the default form a file takes according to the text specification

```html
<a class="file" data-src-id="FILE2132131231231" spellcheck="false">
  <span class="file-container">
    <span class="file-icon">
      <span class="file-extension">txt</span>
    </span>
    <span class="file-name">myfile</span>
    <span class="file-size">10kb</span>
  </span>
</a>
```

As these are meant to be synced to the file data itself, open the file by using event listeners, a href property is also allowed and will be cleared

```html
<a class="file" href="blob:xxxxxx" data-src-id="FILE2132131231231" spellcheck="false">
  <span class="file-container">
    <span class="file-icon">
      <span class="file-extension">txt</span>
    </span>
    <span class="file-name">myfile</span>
    <span class="file-size">10kb</span>
  </span>
</a>
```

### Forbidden Attributes

There are not really any forbidden attributes for the file that affect them directly out of the forbidden list

### CSS

Files really don't need any css pattern to be properly functional as intended, just give them a nice style, the structure given is just to ensure consistency

## Containers

Containers are simply components with the class `container` to it and might have anything under them, this might allow for custom styles

```html
<div class="container" style="background-color: red;">
  <p>hello</p>
</div>
```

## Custom Styles

All the tags are able to hold a style attributes, and they will be saved as such, however note that due to security reasons the style tag will be removed in the client side if it's considered harmful, these include.

 - javascript found within the style tag.
 - external urls found within the style tag.
 - position is fixed (might cover the entire screen)

If you really need to use styles that are considered non-secure you need to make them into a trusted environment via the `rich-extensions.scss` file, the standard name of the environment is a top level parent called "trusted", and class names with such are written as `rich-text--` for instance let's say we are building a custom dialog that has custom rules (aka it loads a resource via a url).

`rich-extension.scss` file would look like

```scss
.trusted {
  .rich-text--background-url {
    background-image: url(https://othersite.com/myresource.png);
  }
}
```

then the content of the field might look like:

```html
<div class="rich-text--background-url">
  <p style="font-size: 9rem">hello world</p>
</div>
```

however since any user could be allowed to use this you can only have this work properly in a trusted environment, basically your react client code should look something like.

```tsx
<div className="trusted">
  <View id="content">
</div>
```

In this example `content` represents the name of the property where the html is hold, and its parent contains the class trusted, as such the classes under this style are allowed to execute.

Note that the sanitizer will remove any class that doesn't start with `rich-text--` but even insecure users can write these `rich-text--` classes which is why you should have a `trusted` environment which is important for the proper display.

## Templating

Templating should be supported in your view and should follow a spec, this is the recommended spec to follow and the one that itemize viewer supports by default, templating might be modified via its args

Templating is not meant to be something used for entries, it is mainly for views, the editor can support templating by allowing it to write templates, but it's not supposed to render them, as they are templates, however the viewer might take template attributes and convert them in what they are supposed to be seen as, do not modify or change the value of a text with the output of a template as this will cause corruption.

Templating is simple and it's not meant to be a full solution to everything, templates should be used sparsely, they are simple and not optimized and rather limited

### Text and HTML templating

In order to setup a html template with a name do it this way

```html
<span data-text="userName">NAME OF THE USER HERE</span>
```

This means that the content of the span should be replaced, via textContent method using the variable for userName that is given via the arguments, html templating is also supported, but it's dangerous, the standard itemize viewer supports disabling of the HTML setting if not necessary even if templating is enabled

```html
<span data-html="userDescription">DESCRIPTION OF THE USER HERE</span>
```

### Href templating

This allows to dinamically set the href property

```html
<a data-thref="userLink">click here</a>
```

### Style templating

Two types of style templating are supported, and only available for templates "data-style-hover" and "data-style-active" both will replace the style attribute value when the actions are given

Similar security policies apply from the style tag.

```html
<span data-style-hover="background-color: red">Hover me for red</span>
```

If style templating isn't enough as it's honestly very limiting you should definetely use a rich extension via the class attribute

### Event handling

It's totally possible to pass events to these templates to functions can be called externally, the supported events are:

 - click
 - blur
 - focus
 - input
 - keydown
 - keypress
 - keyup
 - mousedown
 - mouseenter
 - mouseleave
 - mousemove
 - mouseover
 - mouseout
 - mouseup
 - mousewheel
 - touchstart
 - touchmove
 - touchend
 - touchcancel
 - wheel

These events are added like this

```html
<div class="rich-text--button" data-on-click="handler">click me</div>
```

Where handler should be defined in the arguments for it to call

### Update context

The template gets a context that it is working with to gets its values, by default it is the template args that are given to the renderer, however it should be possible to dive deep into the object itself by using `data-context` in order to update the context that we are working with eg. suppose the template args are

```json
{
  "name": "kitten",
  "fullName": {
    "first": "kitty",
    "last": "cat",
  },
}
```

We can update the context in order to access the full name properties

```html
<div data-context="fullName" data-text="first">first name</div>
```

The data context affects the children

```html
<div data-context="fullName">
  <span data-text="first">fist name</span>
  <span data-text="last">last name</span>
</div>
```

Note how contexts are not very flexible as a way to access variables, this is because itemize templating and text specs are supposed to be simple and not very powerful as it is not supposed to be a full fledged templating solution, rather as a tool for the designer to build the site, the developer should make the template args as simple as possible for the designer to use.

Contexts can indeed stack.

### For loops

It is possible to make for loops within the templating engine by using `data-for-each` this will cause a context update for example suppose the following data

```json
{
  "animals": [
    {
      "name": "kitten",
    },
    {
      "name": "doggy",
    },
    {
      "name": "sheep",
    },
    {
      "name": "horse",
    }
  ]
}
```

In order to make a for loop for the given template you would have to do the following

```html
<ul>
  <li data-for-each="animals" data-text="name">NAME OF THE ANIMAL</li>
</ul>
```

Because this also represents a context update of the template, the children of this for loop now have the new context and have no access to the animals variable anymore, but rather conform a new context.

### Complete UI Handler

Text in templating mode can provide a whole custom ui handler for the given component, a whole complete UI handler allows for full modification and control over a given node and it's given by `data-ui-handler` where the value is one of the values given by the templating object

```html
<div data-ui-handler="myRepeatHandler" data-amount="10"><span>repeat</span></div>
```

UI handlers are complex and in the template object are expected to take the form of an UI handler such as

```typescript
// we are defining a handler called my repeat handler
// which will repeat its children a given amount of times
const myRepeatHandler: ICustomUITemplateHandler = {
  /**
   * The initialization function gets called at the start
   * of the ui handler taking place
   * 
   * Yes UI handlers can have access to the rootArgs, where
   * templateArgs are the current context args
   */
  initialize(bareNode, DOMWindow, templateArgs, rootArgs) {
    // the bare node is the node before anything has happened to it
    // so we fetch the data from it and do the repeat
    const amountToRepeat = parseInt(bareNode.dataset.amount) || 2;
    const childrenToRepeat = bareNode.childNodes[0];
    bareNode.removeChild(childrenToRepeat);
    for (let i = 0; i < amountToRepeat; i++) {
      bareNode.appendChild(childrenToRepeat.cloneNode(true));
    }

    // now we return our new custom node, in this case it is the
    // same bare node, but with our children repeated
    return bareNode;
  },
  load(customNode, DOMWindow, templateArgs, rootArgs) {
    // when we load
    customNode.addEventListener("click", () => {
      alert(localeReplacer(rootArgs["i18nItWasRepeated"], parseInt(bareNode.dataset.amount) || 2));
    });
  },
  unload(customNode, DOMWindow, templateArgs, rootArgs) {
    alert(rootArgs["i18nUnloading"])
  }
}
```

Note that UI handlers are handled by the renderer, so if you are writting your own custom renderer you will have to support this functionality if you want to fully support itemize text specifications, the fast prototying view renderer supports templating already

## Custom Components

Feel free to implement your own custom components but be wary of the sanitizer, it will remove any

 - src
 - srcset
 - sizes
 - data-src
 - loading

It will also remove classes that it doesn't consider valid, as such you should prefix any class with the following prefixes

 - `rich-text--` these are used for rich text styling, so it's better for them not to be used for other reasons.
 - `container-` (eg. container-background, container-special, container-text); not to be confused with the standard container, these are custom made whereas the standard container has nothing in it.
 - `custom-` (eg. custom-math, custom-whatever)

These will not be stripped from the sanitizer.

The sanitizer will strip anything that it considers harmful; this should be done in the renderer, a good approach to creating feature rich components could be to use something such as `<div class="custom-mycustomcomponent" data-info="SOME_JSON"></div>"` and you might implement it differently in the view renderer vs the entry renderer, eg. the entry renderer just display a black box whereas the view renderer displays a rich component.

Most of the times you might think of a custom component to create custom logic functionality (eg. you have your own custom dynamic interactive objects) you might be better off using a custom UI handler or templating, these are natively supported by the itemize fast prototyping renderer as they are in the spec for example, let's say you want to make a button that pops up something and has custom text in it

```html
<div class="rich-text--button" data-on-click="openPopUp" data-text="openPopUpText">click me</div>
```

This is a better solution than

```html
<div class="custom-button"></div>
```

And then having to use a whole custom view renderer to handle this custom type, even if you need complex functionality the handlers should have your back on it via

```html
<div class="rich-text--very-complex-form" data-ui-handler="customHandler"></div>
```

And then passing the handler to the arg, check out [Templating](./templating.md) for information of how to fully implement templates or [Custom Text Components](./custom-text-components.md) for explanation on how to create custom rich text components that deviate from the spec defined here.