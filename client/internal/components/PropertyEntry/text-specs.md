The standard rich text editor can use its own configuration but by default it is

# Text

If there is no text, and no other sort of visible media, nor spaces the value should be null

# Images

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

## Forbidden attributes

These attributes can be used but they are removed by the server side for security reasons

 - src
 - srcset
 - sizes
 - data-src
 - loading

Feel free to use them they won't pollute the environment; in fact src, srcset, and sizes should be added by the handler

## Handling

For handling you should read the mediaProperty current value to find the file with the data-src-id and generate an appropiate
src, sizes and srcset

## Custom Renderers

When creating your own renderer view or entry, you should already have the src, srcset and sizes available in the HTML for any
files that already existed even if they are stripped in the actually saved HTML as the handler will actually regenerate them; however
for any new created content you must manually create the image structure; the server will recognize these.

Do not bother removing the src, srcset nor sizes for sending; this will be done automatically by the server side itself, it won't serve
them.

Other properties will also be removed, such as loading; so feel free to implement them in the renderer, it won't affect other clients
only the spec here is allowed.

## CSS

In order to keep images property with a proper placeholder that takes the same exact size, this css is what is recommended
into your rich text form, this will ensure that there's a div that takes as much space as your image, so not to have bad
experience scrolling

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

# Videos

Videos are loaded via iframes, either from youtube or vimeo

## Youtube

```html
<div class="video">
  <div class="video-container">
    <iframe allowfullscreen data-video-origin="youtube" data-video-src="ID" frameborder="0"></iframe>
  </div>
</div>
```

## Vimeo

```html
<div class="video">
  <div class="video-container">
    <iframe allowfullscreen data-video-origin="vimeo" data-video-src="ID" frameborder="0">
  </div>
</div>
```

## Forbidden Attributes

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

## Handling

Property src is removed by the server side so when handling this property should be readded before being passed to the renderer, calculating the source is rather a straightforward process as it comes from the ID itself, both youtube and vimeo videos have an unique string identifier

## Custom Renderers

The custom renderer will receive a video with its src as it should be calculated by the handler itself, the renderer is free to create other properties as well, such as loading.

## CSS

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

# Files

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

As these are meant to be synced to the file data itself, open the file by using event listeners, a data-src property is also
allowed and will be cleared

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

## Forbidden Attributes

There are not really any forbidden attributes for the file

## CSS

Files really don't need any css pattern to be properly functional as intended, just give them a nice style, the structure
given is just to ensure consistency

# Custom Components

Feel free to implement your own custom components but be wary of the sanitizer, it will remove any

 - src
 - srcset
 - sizes
 - data-src
 - loading

Attributes as well as anything that it considers harmful; this should be done in the renderer, a good approach to creating
feature rich components could be to use something such as `<div class="mycustomcomponent" data-info="SOME_JSON"></div>"` and
you might implement it differently in the view renderer vs the entry renderer, eg. the entry renderer just display a black box
whereas the view renderer displays a rich component.