The standard rich text editor can use its own configuration but by default it is

# Text

If there is no text, and no other sort of visible media, nor spaces the value should be null

# Images

During edition if there is a image the image should be formed in this form

```html
<div class="image">
  <div class="image-container">
    <div class="image-pad" style="padding-bottom: 50%">
      <img data-src-id="FILE2132131231231" data-src-width="1000" data-src-height="500">
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
      <img data-src-id="FILE2132131231231" data-src-width="1000" data-src-height="500" src="blob:xxxxxx" srcset="etc..." sizes="70vw">
    </div>
  </div>
</div>
```

However once saved all src, srcset and sizes references will be removed

For viewing you should read the mediaProperty current value to find the file with the srcId and generate an appropiate
src and srcset, loading can be lazy, and no height should be specified

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
    <iframe data-video-src="ID" data-video-origin="youtube" allowfullscreen frameborder="0"></iframe>
  </div>
</div>
```

## Vimeo

```html
<div class="video">
  <div class="video-container">
    <iframe data-video-src="ID" data-video-origin="vimeo" src="https://player.vimeo.com/video/ID?title=0&byline=0&portrait=0&badge=0" frameborder="0" allowfullscreen>
  </div>
</div>
```

## Other iframes

The server will remove any other iframes that do not match this shape as they are forbidden, the client will do so as well

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
<span class="file" data-src-id="FILE2132131231231" spellcheck="false" contenteditable="false">
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
<span class="file" data-src-id="FILE2132131231231" data-src="blob:xxxxxx" spellcheck="false" contenteditable="false">
  <span class="file-container">
    <span class="file-icon">
      <span class="file-extension">txt</span>
    </span>
    <span class="file-name">myfile</span>
    <span class="file-size">10kb</span>
  </span>
</span>
```

## CSS

Files really don't need any css pattern to be properly functional as intended, just give them a nice style, the structure
given is just to ensure consistency