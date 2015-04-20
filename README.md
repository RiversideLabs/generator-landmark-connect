# Landmark Generator

A [Yeoman](http://yeoman.io) generator for [Landmark Connect](http://getlandmarkproject.com), the open source app for use with LandmarkJS.

`yo landmark-connect` will scaffold a new Landmark Connect App project for you for building for iOS or Android.

## Getting Started

First up, you'll need Node.js >= 0.10.xinstalled. If you don't have them, follow the **Dependencies** instructions below.

Then, install the Landmark Connect generator:

````
$ npm install -g generator-landmark-connect
````

If you see errors, check the [problems](#err-please-try-running-this-command-again-as-rootadministrator) section below.

With the generator installed, create an empty directory for your new LandmarkJS Project, and run `yo landmark-connect` in it:

````
$ mkdir myproject
$ cd myproject
$ yo landmark-connect
````

The generator will ask you a few questions about where your LandmarkJS installation is, and some basic information about your organization.

### What next?

When you've got your new project, check out the [Landmark Connect Documentation](http://getlandmarkproject.com/docs/app) to learn more about how to get started with Landmark Connect.

## Problems?

### ERR! Please try running this command again as root/Administrator.

When running `npm install -g generator-landmark-connect`, you may get an **EACCES** error asking you to run the command again as root/Administrator. This indicates that there is a permissions issue.

On your development system you can change directory ownership to the current $USER so you do not have to run `sudo` while installing untrusted code:

````
sudo chown -R $USER /usr/local

# Other directories may be required depending on your O/S
sudo chown -R $USER /usr/lib/node_modules/
````

For a production/shared environment you may wish to re-run the `npm` command with the `sudo` prefix:

````
sudo npm install -g generator-landmark-connect
````

For more information, see the ["What, no sudo?"](http://foohack.com/2010/08/intro-to-npm/#what_no_sudo) of the Intro to npm by Isaac Schulueter.



## Dependencies

### Install Node.js

Download and install the node.js binaries for your platform from the [Node.js download page](http://nodejs.org/download/).

### Install Ionic and Cordova

Run this in your terminal to install the Ionic and Cordova binaries. These will be used to build the app.

````
npm install -g cordova ionic
````


## Notice

The activity which is the subject of this mobile device application
and shareware has been financed in part with Federal funds from the
National Park Service, Department of the Interior, through the
California Office of Historic Preservation. However, the contents
and opinions do not necessarily reflect the views or policies of the
Department of the Interior or the California Office of Historic
Preservation, nor does mention of trade names or commercial products
constitute endorsement or recommendation by the Department of the
Interior or the California Office of Historic Preservation.
 
This program receives Federal financial assistance for identification
and protection of historic properties. Under Title VI of the Civil
Rights Act of 1964, Section 504 of the Rehabilitation Act of 1973,
and the Age Discrimination Act of 1975, as amended, the U.S.
Department of the Interior prohibits discrimination on the basis of
race, color, national origin, disability, or age in its federally
assisted programs. If you believe you have been discriminated against
in any program, activity, or facility as described above, or if you
desire further information, please write to:

Office of Equal Opportunity
National Park Service
1849 C Street, N.W.
Washington, D.C. 20240


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
