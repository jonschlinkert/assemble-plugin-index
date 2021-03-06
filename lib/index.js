'use strict';

var through2 = require('through2');
var File = require('vinyl');
var _ = require('lodash');

module.exports = function(assemble) {
  // introduce renderable `index` template collection
  assemble.create('index', 'indices', {isRenderable: true});

  return function(glob, options) {
    var defaults = {template: 'collection-index.hbs', dest: 'posts.html', itemsPerPage: 10};
    // actually load the template(s) defined by the user. this can be
    // a file path, or a glob pattern. the `indices()` method was created
    // above for this purpose.
    assemble.indices(glob);

    // get assemble options
    var opts = assemble.option('index');
    var files = [];

    // allow plugin defaults to be overridden with:
    //  - assemble opts (defined using `assemble.option('index', {foo: 'bar'})`)
    //  - plugin opts (in the task, `index({foo: 'bar'})`)
    options = _.extend(defaults, opts, options);

    // `index()` pipe passthrough
    return through2.obj(function(file, enc, cb) {
      // push the whole file through, so we can use any of its properties
      files.push(file);
      // through2 convention is to `push` the file (above), instead of passing
      // it to the callback
      cb();
    }, function(cb) {
      var arr = [];

      // Get the template that was defined by the user in the options
      var tmpl = assemble.views.indices[opts.template];

      /**
       * Here, we can now work with the `files` array, which is the
       * entire list of files that were pushed through. Using tags as the example
       * We need to:
       *
       *   - loop over the files
       *   - get the tags from `file.data` of each file to build up an array of all tags
       *   - loop back over the tags to build the index.
       *
       * we might be able to optimize by doing some of this work in the main
       * function before files are pushed through. But for relative links, etc.
       * we need the entire list anyway.
       */

       // this is the array we need to build from `file.data.tags`
       var tags = [];
       tags.forEach(function (tag) {
          // here we need to build up an object that will be passed to the `index`
          // template as context.
          //
          // If `file.data.tags` has `tag`, get path information so we can generate
          // a relative path from the tag's index (dest) page to the file (dest)
       });

       /**
        * Now, we will take the context object that we just created in the `tags` loop
        * and add it to the `file.data` object of the template. We _could_ instead pass
        * the object to the render method, but passing it on `file.data` ensures that it
        * will be used as context on this template only.
        */

      // var that = this;
      // assemble.render(tmpl, function(err, content) {
      //   if (err) {
      //     console.log(err);
      //     return cb(err);
      //   }


      //   var file = new File({path: opts.dest});
      //   file.data = {};
      //   file.contents = new Buffer(content);
      //   that.push(file);
      //   cb();
      // });
    });
  };
};
