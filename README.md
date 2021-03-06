# assemble-plugin-index [![NPM version](https://badge.fury.io/js/assemble-plugin-index.svg)](http://badge.fury.io/js/assemble-plugin-index)

> Template indexing plugin for Assemble.io.

## Getting Started
In the command line, run:

```bash
npm install --save-dev assemble-plugin-index
```

Next, in your `assemblefile.js`, insert the following line immediately after you have `require()`d `assemble`:

```js
var index = require('assemble-plugin-index')(assemble);
```

Upon initialization, the module creates a new renderable `index` collection within `assemble`. Before using the plugin, you have to specify a location where `index` collections can be found:

```js
assemble.indices('templates/indices/*.hbs');
```

You can now use the plugin within a task like so:

```js
assemble.task('posts', function() {
  assemble.src('templates/posts/*.hbs')
    .pipe(index('posts', {itemsPerPage: 10}))
    .pipe(assemble.dest('dist/'));
});
```

Visit the [plugin docs](http://assemble.io/plugins/) for more info or for help getting started.


## Options
### itemsPerPage
Type: `Number`
Default: `10`

Maximum collection items per index page.


## Examples
When used with the configuration shown above, an index template might look as follows:

```html
<h1>Index</h1>
{{#if index.pageIsEmpty}}
  <p>Oops, nothing there yet!</p>
{{else}}
  <ul>
    {{#each items}}
        <li><a href="{{relative ../../page.dest this.dest}}">
          {{ data.title }}
        </a></li>
    {{/each}}
  </ul>
  <ul>
    {{#if index.pageIsFirst}}
      <li><a href="#">Prev</a></li>
    {{else}}
      <li><a href="{{relative ../page.dest index.pagePrev.page.dest}}">Prev</a></li>
    {{/if}}
    {{#each index.pages}}
      <li><a href="{{relative ../page.dest this.page.dest}}">{{indexPage}}</a></li>
    {{/each}}
    {{#if index.pageIsLast}}
      <li><a href="#">Next</a></li>
    {{else}}
      <li><a href="{{relative ../page.dest index.pageNext.page.dest}}">Next</a></li>
    {{/if}}
  </ul>
{{/if}}
```


## Context
The templating context contains the following variables which can be used for the generation of the index page.

### items
Type: `Array`

An array containing all items available for this particular index page. The contents of each element are extracted from the page's `data` object.

### index
Type: `Object`

An object describing the state of the index page as the following code excerpt shows:

```js
{
  pageIsEmpty: false,
  pageIsFirst: true,
  pageIsLast: false,
  pageFirst: { /*...*/ },
  pagePrev: { /*...*/ },
  pageNext: { /*...*/ },
  pageLast: { /*...*/ },
  pages: { /*...*/ }
}
```

#### pageIsEmpty
Type: `Boolean`

Whether the current index page has no items.

#### pageIsFirst
Type: `Boolean`

Whether the current index page is the first index page of a collection of index pages.

#### pageIsLast
Type: `Boolean`

Whether the current index page is the last index page of a collection of index pages.

#### pageFirst
Type: `Object`

Object of the first index page in a collection of index pages.

#### pagePrev
Type: `Object`

Object of the previous index page in a collection of index pages.

#### pageNext
Type: `Object`

Object of the next index page in a collection of index pages.

#### pageLast
Type: `Object`

Object of the last index page in a collection of index pages.

#### pages
Type: `Array`

An array of objects of all index pages.


## Authors
* Vincent Wochnik ([GitHub](https://github.com/vwochnik))


## License
Copyright (c) 2015 Vincent Wochnik, contributors.  
Released under the MIT license

***

_This file was generated by [grunt-verb](https://github.com/assemble/grunt-verb) on March 31, 2015._