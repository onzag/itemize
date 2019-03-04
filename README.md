# itemize

## Initial Setup

Make sure you have installed NodeJS 10 or superior, then in the same
directory run.

`npm install`

After this you should have a `dist` folder in place, you need to build
the required data files, paste the content for your data in the `data`
folder and the content for your config in the `config` folder make sure
the entry is set in the `config.json` file entry property.

This project already includes the data information in it, but does not
include the config, config contains highly sensitive data that should
not be commited to the server, JWT, user, passwords, certificates, etc.

`npm run install`

This automatically runs when you do a npm install so there's no need to
run this, however if you modify any files that affect the builder and the
server you need to re-run npm run install.

Once both the config and the data is set run:

`npm run build`

The build process runs webpack (twice), one for development and another one
for production, and processes the json data again that defines how the
items are defined, repareses the html and setups the final configuration
file.

When that is done you can serve via

`npm run start`

Now you can access the server via `http://localhost:8080` or whatever you
are using as port, by default you get the production version, to get the
development version you need to run in your javascript console

`localStorage.setItem("__dev", true)`

This will make it so that it loads the development version, the development
version is meant to be accessible even for production for those nasty bugs
that appear only in production so they can be easily debugged by just
setting the flag `__dev` to true, if you need to disable the development
version then run

`localStorage.removeItem("__dev")`

or

`localStorage.setItem("__dev", false)`

And that should do it, while some people might argue that having a development
version accessible by users is insecure, security by obscurity (minifiers) was
never the answer anyway, there's no logical difference between development and
production other than one file is minified and stripped of its developer data

## Deployment

Deployment is meant to be simple and only requires the folder `dist` and
`node_modules` into the server, running `node ./dist/core/server.js` does
the job.

Currently there's no multi threading support but it is meant to be added
later, containerization with kubernetes is on the line if the project grows
big enough.