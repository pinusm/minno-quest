---
title: Messages
description: A simple task that displays plain messages to the user.
---

The message tasks are built to be as simple as possible, all they do is present simple html templates. In order to load a template simply set it into the `template` property as a string, or set the appropriate URL into `templateUrl`. Thats it. (This is not relevant for most users, but the templates are rendered using angularjs $compile and therefore all the relevant directives are available).

The context for the template has the following variables available: {global, current, task}.

```js
var task = {
    template: '<div>Hello World. I am a template.</div>',
    keys: ' '
}
```

property        | description
--------------- | ---------------------
template        | (text) A string of html to display (The template uses [lodash templates](https://lodash.com/docs#template)).
templateUrl     | (text) A url to a html template (The template uses [lodash templates](https://lodash.com/docs#template)).
keys            | Sets a key (or keys) that allow users to proceed. The keys property takes either a key (i.e. `'a'`) a keyCode (i.e. `65`) or an array of such (i.e. `['a','b']`).


#### Proceeding

There are two types of controls that allow users to proceed to the next task.

First, you can use any element in your template as a proceed button, all you have to do is add the `pi-message-done` attribute to the appropriate element.

```html
<button type="button" pi-message-done>Click here to proceed</button>
```

Alternatively you may use the `keys` property in order to set a key (or keys) that proceed. The keys property takes either a key (i.e. `'a'`) a keyCode (i.e. `65`) or an array of such (i.e. `['a','b']`).

This table shows several useful keyCodes for your convinience (there are more [here](http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)):

Code    | Function
------- | -----------
13      | Enter
27      | Escape
32      | Space
37      | Left arrow
38      | Up arrow
39      | Right arrow
40      | Down arrow

### Project Implicit build

The project implicit build has an optional "meta template" that you may use by setting the `piTemplate` property to true. When using it, you have several additional options.

property        | description
--------------- | ---------------------
piTemplate      | Activate the PI template.
header          | Header text.
footer          | Footer text.
buttonText      | Text for the proceed button (Defaults to: Click Here or press the space button to Proceed).