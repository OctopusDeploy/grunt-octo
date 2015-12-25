# grunt-octo

> A Grunt wrapper for [octopack](https://github.com/OctopusDeploy/octojs) library to push projects to Octopus Deploy

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-octo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-octo');
```

## The "octo" task

### Overview
In your project's Gruntfile, add a section named `octo` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  octo: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

## API

### src
The package file that is to be pushed up to the server.

### Options

#### options.host
Required property that points to the Octopus Server instance the package should be pushed to.

### options.replace
Flag to force overwrite of existing packge if one already exists with the same ID and version.

#### options.apiKey
Key linked to account with `BuiltInFeedPush` permissions. 
If `options.replace` is set to true and a package with the same ID and version already exists then the `BuiltInFeedAdminister` permission is required.

## Usage Examples

#### Default Options
In this example, the default options are used to push a package that is generated from some other process. This example provide the minimum configuration options required to perform the push. 

```js
grunt.initConfig({
  octo: {
    options: {
        host: 'http://octopus-server/',
        apiKey: 'API-XXXXXXXXX'
    },
    src: './bin/myproject.1.1.0.tar'
  },
});
```

#### Pre Packaging
In this example, the project files are first packaged up using a seperate library, `grunt-contrib-compress` using project details extracted directly from the `project.json` file. Once the package has been pushed the version number is then incremented. 

```js
grunt.initConfig({
  octo: {
    push: {
      options: {
        host: 'http://octopus-server/',
        apiKey: 'API-XXXXXXXXX',
      },
      src: '<%= compress.main.options.archive %>'
    }
  },
    compress: {
      main: {
        options: {
          archive: './bin/<%= pkg.name %>.<%= pkg.version %>.tar.gz',
          mode: 'tgz'
        },
        files: [
          { src: ['dist/**'] }
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false
      }
    }
});

 grunt.loadNpmTasks('grunt-contrib-compress');
 grunt.loadNpmTasks('grunt-bump');
 grunt.loadNpmTasks('grunt-octo');
 
 grunt.registerTask('publish', ['compress:main', 'octo:push', 'bump']);
```

## License

(MIT License)

Copyright (c) 2015 Octopus Deploy support@octopus.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
