gulp-octo
===
> A Grunt wrapper for [octopack](https://github.com/OctopusDeploy/octojs) library to push projects to Octopus Deploy

## Install
This plugin requires [Grunt](http://gruntjs.com/) `~0.4.5`

Install with [npm](https://npmjs.org/package/@octopusdeploy/grunt-octo)
```shell
npm install  --save-dev @octopusdeploy/grunt-octo
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('@octopusdeploy/grunt-octo');
```

In your project's Gruntfile, add a section named `octo-pack` and `octo-pack` to the data object passed into `grunt.initConfig()`.

## Options
### octo-pack
#### type (optional)
Optional parameter to define the package type. Valid values are `targz`, `tar`, `zip` or `nupkg`. If not provided this defaults to `targz`.

#### id (optional)
Defines the `Id` component of the created package. By default it will extract the name out of `package.json` if present.

#### version (optional)
Defines the `version` component of the created package. By default it will extract the version out of `package.json` if present.

#### dst
The output location for the generated package file.

### octo-push
#### host
Required property that points to the Octopus Server instance the package should be pushed to.

#### apiKey
Key linked to account with `BuiltInFeedPush` permissions. 
If `options.replace` is set to true and a package with the same ID and version already exists then the `BuiltInFeedAdminister` permission is required.

#### replace (optional)
Flag to force overwrite of existing package if one already exists with the same ID and version.

## Usage Examples

#### Combined Pack & Push
Using both `octo-pack` and `octo-push` the project will first be packaged then then uploaded to the server. 
Note that the `gulp-contrib-clean` task is run first to ensure no previous packages are still present in the output directory.

```js
grunt.initConfig({
    clean: {
      build: ['./bin/**/*']
    }
    "octo-pack": {
      prod: {
        options: {
          dst: './bin'
        },
        src: ['**/*', '!src/**/*', '!./gulpfile.js']
      }
    },    
    "octo-push": {
        options: {
          host: 'http://localhost',
          apiKey: 'API-XXXXXXXXX',
          replace: true
        },
      src: ['./bin/**/*']
    }
    });
  grunt.registerTask('publish',  ['clean', 'octo-pack:prod', 'octo-push']);
```

## License

(MIT License)

Copyright (c) 2016 Octopus Deploy support@octopus.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
