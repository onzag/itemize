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

Once both the config and the data is set run:

`npm run build`

When that is done you can serve via

`npm run start`

Now you can access the server via `http://localhost:8080` or whatever you
are using as port, by default you get the development version.