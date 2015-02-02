# Brobotics

MEAN is a boilerplate that provides a nice starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. It is designed to give you a quick and organized way to start developing MEAN based web apps with useful modules like Mongoose and Passport pre-bundled and configured. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.

## Prerequisites
* Node.js - Ubuntu
   * NodeJS has teamed up with Chris Lea, so you will need to set up the PPA.
   * Run this script from [this website](https://nodesource.com/blog/chris-lea-joins-forces-with-nodesource)
```
$ curl -sL https://deb.nodesource.com/setup | sudo bash -
$ sudo apt-get install nodejs
```
If anything goes wrong, check here: [Install Latest NodeJS](http://www.ubuntuupdates.org/ppa/chris_lea_nodejs)
   
* MongoDB - Ubuntu:
```
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
$ echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | sudo tee -a /etc/apt/sources.list.d/10gen.list
$ sudo apt-get update
$ sudo apt-get -y install mongodb-10gen
```
If anything goes wrong, check here: [Install Latest MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04)

### Tools Prerequisites
* NPM - Node.js package manager; should be installed when you `sudo apt-get install nodejs`.    
    * If not: ``` $ sudo apt-get install npm ```
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:
```
$ sudo npm install -g bower
```
* MEAN.io - The MEAN stack boilerplate [MEAN.io](http://mean.io/):
```
$ sudo npm install -g meanio
```

### Optional [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```
$ sudo npm install -g grunt-cli
```

## Additional Packages (Included)
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.

## Quick Install
  Setup Brobotics Repo for Development (Ubuntu):

    $ sudo apt-get install git
    $ mkdir ~/broboticsforever
    $ cd ~/broboticsforever
    $ git clone https://github.com/broboticsforever/website.git
    $ cd website/website
    $ bower install
    $ sudo npm install
    $ cd packages/contrib/socket && npm install

  We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

    $ cd ~/broboticsforever/website/website && grunt

  If grunt aborts because of JSHINT errors, these can be overridden with the `force` flag:

    $ grunt -f

  Alternatively, when not using `grunt` you can run this from the main directory:

    $ node server

  Then, open a browser and go to:

    http://localhost:3000
    
## Troubleshooting
During install some of you may encounter some issues.

Most issues can be solved by one of the following tips, but if are unable to find a solution feel free to contact us via the repository issue tracker or the links provided below.

#### Update NPM, Bower or Grunt
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*. Usually updating those tools to the latest version solves the issue.

* Updating NPM:
```
$ npm update -g npm
```

* Updating Grunt:
```
$ npm update -g grunt-cli
```

* Updating Bower:
```
$ npm update -g bower
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

* NPM Clean Cache:
```
$ npm cache clean
```

* Bower Clean Cache:
```
$ bower cache clean
```

## Configuration
All configuration is specified in the [config](/config/) folder, through the [env](config/env/) files, and is orchestrated through the [meanio](https://github.com/linnovate/mean-cli) NPM module. Here you will need to specify your application name, database name, and hook up any social app keys if you want integration with Twitter, Facebook, GitHub, or Google.

### Environmental Settings

There are three environments provided by default: __development__, __test__, and __production__.

Each of these environments has the following configuration options:

 * __db__ - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
  * __clientID__
  * __clientSecret__
  * __callbackURL__
* __mailer__ - This is where you enter your email service provider, username and password

To run with a different environment, just specify NODE_ENV as you call grunt:

    $ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

    $ NODE_ENV=test node server

To simply run tests

    $ npm test

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## Maintaining your own git repository
First, you will need to set up git if you haven't already:

    $ git config --global user.name "Your Name"
    $ git config --global user.email "your@email.com"
    $ git config --global push.default simple         // THIS ONE IS IMPORTANT SO YOU DO NOT DESTROY THINGS

Then, add this snippet of code to your `~/.bashrc` file (`~/.profile` for MAC OS X):

    parse_git_branch() {
        git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
    }
    
    export PS1="\u@\h \[\033[32m\]\w -\$(parse_git_branch)\[\033[00m\] $ "
    
This will change the look of your console so that you can always see which git branch you are on without having to run `git branch` all the time. Once you save the file, load the settings with this command: `source ~/.bashrc`.

!ATTENTION! DO NOT EVER MAKE CHANGES WHILE ON THE 'master' BRANCH
All of the commands below must be run from the root directory of this repository (website).

To check all of the branches you have locally:

    $ git branch

The branch with a * next to it is your current branch. The first thing you should do is make sure you have the 'master' branch. Then make sure it is up to date:

    $ git pull
    
Once you have the latest version, you can make the changes you need to, but do them on a separate branch off of 'master':

    $ git branch <newBranchName>    // Creates a new branch
    $ git checkout <newBranchName>  // Switches you to your new branch. Before this, you are still on 'master'

Alternatively, a single command equivalent of the above is:

    $ git checkout -b <newBranchName> // Creates a new branch and switches you to it
    
If you are making many changes that are unrelated, please make each change on a separate branch and issue them as separate Pull Requests on [GitHub](https://github.com/broboticsforever/website) (This will be explained further if you read on).

Once your changes are finished and you have tested them extensively, you will need to check that you haven't made any changes you do not wish to commit.

    $ git status
    
This command will show you all of the files that you have made changes to that are not staged for commit yet, and also all the files that are currently staged for commit. If you wish to see the specific changes within the files, use the following command:

    $ git diff
    
This command will show you all the changes you have made since your last `git add`. Use the up and down arrow keys and check everything to make sure you haven't changed anything you didn't want to by accident. If you wish to see the changes only to a specific file, use the following command:

    $ git diff /path/to/file

If all looks good, stage your changes:

    $ git add .                 // This adds all changes to all files to the git staging area.
    $ git add /path/to/file    // This adds all the changes to a specific file to the staging area

After adding files to the staging area, if you would like to push them up to the remote branch, you must commit the changes first. In order to commit the changes, use the following command:

```
$ git commit -m "Meaningful message about this commit"
```
   
You can now push your branch to [GitHub](https://github.com/broboticsforever/website) with the following command:

    $ git push
    
NEVER do this on the 'master' branch. It will probably complain that there is not a remote branch to push to, but git should spit out the command you should execute to fix the problem. If not this is the command:

    $ git push --set-upstream origin <yourBranchName>

NEVER Type 'master' for `<yourBranchName>`! Also, never type this command at all from 'master' branch, this could do very bad things.

Once you have made all of your changes and wish to push your changes to the 'master' branch, you will need to issue a Pull Request. Click [here](https://github.com/broboticsforever/website) to go to GitHub and then click on the little green button on the left side next to the branch name (should be 'master'). You will then have to make sure 'master' is selected as the base (left) and your branch as the compare (right) branch. You should then be able to see all of the changes that are within your branch and how they will change the 'master' branch. If all looks good, click the green 'Create pull request' button. Give the pull request a meaningful title that is short but descriptive of the changes you made.  If you need to give further detail, explain in the comment box what you did and how to test that it works. Also, so that others on your team can check off your pull request, place the following at the end your comment box:

    - [ ] @<username>
    
Do this for each team member you wish to review your code. When you are finished, click 'Create pull request' and then you are done until someone merges your branch into release!

## Getting Started
We pre-included an article package example. Check out:

  * [The Model](packages/articles/server/models/article.js) - Where we define our object schema.
  * [The Controller](packages/articles/server/controllers/articles.js) - Where we take care of our backend logic.
  * [NodeJS Routes](packages/articles/server/routes/articles.js) - Where we define our REST service routes.
  * [AngularJs Routes](packages/articles/public/routes/articles.js) - Where we define our CRUD routes.
  * [The AngularJs Service](packages/articles/public/services/articles.js) - Where we connect to our REST service.
  * [The AngularJs Controller](packages/articles/public/controllers/articles.js) - Where we take care of  our frontend logic.
  * [The AngularJs Views Folder](packages/articles/public/views) - Where we keep our CRUD views.

## More Information
  * Visit us at [Linnovate.net](http://www.linnovate.net/).
  * Visit our [Ninja's Zone](http://www.meanleanstartupmachine.com/) for extended support.

## License
[The MIT License](http://opensource.org/licenses/MIT)
