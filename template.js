/*
 * grunt-init-gruntplugin
 * https://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Grunt plugin, including Nodeunit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about Grunt plugin best practices, ' +
  'please see the docs at http://gruntjs.com/creating-plugins';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'grunt'}, [
    // Prompt for these values.
    init.prompt('name', function(value, props, done) {
      // Prepend grunt- to default name.
      var name = 'grunt-' + value;
      // Replace 'grunt-contrib' with 'grunt' and give a warning
      var contribRe = /^grunt-contrib/;
      if (contribRe.test(name)) {
        grunt.log.writelns((
          'Removing "contrib" from your project\'s name. The grunt-contrib ' +
          'namespace is reserved for tasks maintained by the grunt team.'
        ).red);
        name = name.replace(contribRe, 'grunt');
      }
      done(null, name);
    }),
    init.prompt('description', 'The best Grunt plugin ever.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('grunt_version'),
    init.prompt('node_version', grunt.package.engines.node)
  ], function(err, props) {
    // Set a few grunt-plugin-specific properties.
    props.short_name = props.name.replace(/^grunt[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
    props.npm_test = 'grunt test';
    props.keywords = ['gruntplugin'];
    props.devDependencies = {
      'grunt-contrib-jshint': '^0.9.2',
      'grunt-contrib-clean': '^0.5.0',
      'grunt-contrib-nodeunit': '^0.3.3',
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
