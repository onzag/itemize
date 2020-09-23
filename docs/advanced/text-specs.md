# Text Specs

The standard rich text editor can use its own configuration but by default it is

## Text

If there is no text, and no other sort of visible media, nor spaces the value should be null

## Images

During edition if there is a image the image should be formed in this form

```html
<div class="image">
  <div class="image-container">
    <div class="image-pad" style="padding-bottom: 50%">
      <img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000">
    </div>
  </div>
</div>
```

The attributes src, srcset and sizes might be added but they will be removed by the server side this means this
is still valid and appropiate.

```html
<div class="image">
  <div class="image-container">
    <div class="image-pad" style="padding-bottom: 50%">
      <img alt="" data-src-height="500" data-src-id="FILE2132131231231" data-src-width="1000" sizes="70vw" src="blob:xxxxxx" srcset="etc...">
    </div>
  </div>
</div>
```

However once saved all src, srcset and sizes references will be removed

### Standalone images

While images are mainly meant to be setup as specified, images are also allowed to be standalone, as such this is valid as well.

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

### Forbidden attributes

These attributes can be used but they are removed by the server side for security reasons

 - src
 - srcset
 - sizes
 - data-src
 - loading

Feel free to use them they won't pollute the environment; in fact src, srcset, and sizes should be added by the handler

### Handling

For handling you should read the mediaProperty current value to find the file with the data-src-id and generate an appropiate src, sizes and srcset

### Custom Renderers

When creating your own renderer view or entry, you should already have the src, srcset and sizes available in the HTML for any
files that already existed even if they are stripped in the actually saved HTML as the handler will actually regenerate them; however
for any new created content you must manually create the image structure; the server will recognize these.

Do not bother removing the src, srcset nor sizes for sending; this will be done automatically by the server side itself, it won't serve them.

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

Videos are loaded via iframes, either from youtube or vimeo

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

This prevents iframes linking from any strange source that is not allowed

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

Files can be inserted into the document and work similarly to images

```html
<span class="file" contenteditable="false" data-src-id="FILE2132131231231" spellcheck="false">
  <span class="file-container">
    <span class="file-icon">
      <span class="file-extension">txt</span>
    </span>
    <span class="file-name">myfile</span>
    <span class="file-size">10kb</span>
  </span>
</span>
```

As these are meant to be synced to the file data itself, open the file by using event listeners, a data-src property is also allowed and will be cleared

```html
<span class="file" contenteditable="false" data-src="blob:xxxxxx" data-src-id="FILE2132131231231" spellcheck="false">
  <span class="file-container">
    <span class="file-icon">
      <span class="file-extension">txt</span>
    </span>
    <span class="file-name">myfile</span>
    <span class="file-size">10kb</span>
  </span>
</span>
```

### Forbidden Attributes

There are not really any forbidden attributes for the file

### CSS

Files really don't need any css pattern to be properly functional as intended, just give them a nice style, the structure given is just to ensure consistency

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

And this is how you might create custom styles

## Templating

Templating should be supported in your view and should follow a spec, this is the recommended spec to follow and the one that itemize viewer supports by default, templating might be modified via its args

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

### Style templating

Two types of style templating are supported, and only available for templates "data-hover-style" and "data-active-style" both will replace the style attribute value when the actions are given

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

### Totally custom UI handlers

A custom UI Handler can be defined via

```html
<div class="">
```

## Containers

Containers are simply components with the class `container` to it and might have anything under them, this might allow for custom styles

```html
<div class="container" style="background-color: red;">
  <p>hello</p>
</div>
```

## Custom Components

Feel free to implement your own custom components but be wary of the sanitizer, it will remove any

 - src
 - srcset
 - sizes
 - data-src
 - loading

It will also remove classes that it doesn't consider valid, as such you should prefix any class with the following prefixes

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