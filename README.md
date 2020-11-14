# extralife-tracker

A set of widgets for Stream Elements to track Extra Life progress

## Widgets

### Goal Progress Bar

![goal progress bar example](/goal-progress/example.png)

## Installation

Follow the steps of the [blog post](https://blog.streamelements.com/how-can-you-become-a-code-guru-87071f223e1b) or [GitHub page](https://github.com/StreamElements/widgets) to install it.

## Testing

There's a quick script `generate-example.py` that will flatten the files HTML you can test in your browser without having to use StreamElements UI.

```bash
$ ./generate-example.py goal-progress > example.html
$ open example.html
```