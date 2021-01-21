[Prev](./08-fragments.md)

# Redesign

So far our application works, but the UI/UX is absolutely awful; like have you seen what we have done so far? while it is probably good enough for a demonstration and in a prototyping standpoint, it's not good enough regarding the UI structure.

In itemize the UI is attempted to be as separate as possible to the application logic itself by the means of fragments, however not all can be resolved with fragments; primarily our entry renderers that are way too dynamic to be expressed by the means of a fragment template. Even when you could totally write a renderer that uses fragments.

In this section we will write our own custom renderers for several problematic sections; note that you should be able to write a custom renderer in any format you wish, but we will stick to material ui and fast prototyping methods, after all this is a tutorial.

## Story Time

