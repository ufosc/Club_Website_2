# UF OSC Website
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) ![GitHub issues](https://img.shields.io/github/issues-raw/ufosc/Club_Website_2) ![GitHub](https://img.shields.io/github/license/ufosc/Club_Website_2) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/ufosc/Club_Website_2/node.js.yml) ![GitHub package.json version](https://img.shields.io/github/package-json/v/ufosc/Club_Website_2)
<br/>
Website for the UF Open Source Club. Started in the Fall semester 2022, this website is built and maintained by club members to serve as a hub of information for the club.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Configuring](#configuring)
- [Contributing](#contributing)
- [License](#license)

## Install
This project requires [NodeJS](https://nodejs.org/en/) and [Git](https://git-scm.com). Also, make sure you have `build-essential` (Linux) or `xcode-select` (MacOS).
```
sudo apt install build-essential
// or...
xcode-select --install
```

Next, begin by cloning the repository:
```
git clone https://github.com/ufosc/Club_Website_2.git
```

Navigate to the project directory and install the project dependencies:
```
cd Club_Website_2
npm install
```
## Usage
<b>Starting the webserver:</b>
```
npm start
```
You can access the website by visiting http://localhost:3000 on your browser.

<b>Linting & fixing:</b>
<br/>
This project adheres to the Javascript Standard syntax style, use linting to show you a list of syntax errors that you'll need to correct.
```
npm run lint
```
To automatically fix these, you can run:
```
npm run fix
```
Keep in mind that some syntax issues cannot be automatically resolved, in which case you'll need to run `npm run lint` again and resolve them manually.


<b>Running tests:</b>
```
npm run test
```
## Configuring
All configurations are available in [config.js](config.js) and can be modified by creating a `.env` file in the root directory.

<b> NODE_ENV: </b><br>
Sets the working environment. Three options are available:
1. Development - for writing & testing new features.
2. Staging - for testing features before deployment.
3. Production - for finished features available to the public.

The working environment is set to 'development' by default. It can be changed by adding the following line to the `.env`:
```
NODE_ENV = "development"
```

<b> MONGO_URI: </b><br>
Sets the connection URI for the MongoDB database. It can be changed by adding the following line to the `.env`:
```
MONGO_URI = "..."
```

<b>PORT:</b><br>
The port to run the server on. Set to 3000 by default. It can be changed by adding the following line to the `.env`:
```
SERVER_PORT = 3000
```

<b>ADMIN_ROUTE:</b><br>
Because generic admin routes are subject to directory scans by vulnerability analyzers, we've added the option to configure it manually. It is set to 'admin' by default, but can be changed via the following option:
```
ADMIN_ROUTE = "admin"
```

<b>LIMITER:</b><br>
The limiter sets up a rate limiter that controls how many requests can be made by a user before they are timed-out. There are two available options:
1. RATE_LIMIT_TIMEOUT - the time interval (in minutes) where the user will be locked out of the site if they violate the rate limit.
2. RATE_LIMIT_MAX - the maximum number of requests in one RATE_LIMIT_TIMEOUT interval.

They can be modified as follows:
```
RATE_LIMIT_TIMEOUT = 5
RATE_LIMIT_MAX = 1500
```

<b>CACHE_INTERVAL</b><br>
How long to cache static pages (blog, index, etc.) for. Instead of repeatedly querying the database for data, non-priority pages are cached. The cache interval (in minutes) can be modified like so:
```
CACHE_INTERVAL = 30
```

<b>SECRET:</b><br>
The secret is a key for encrypting JWTs. It can be modified like so:
'''
SECRET = "any string"
'''

<b>SMTP:</b><br>
Configurations for the SMTP mailer. This is disabled in development environments, but can be modified with the following options:
1. `SMTP_HOST`: host address for the SMTP server.
2. `SMTP_PORT`: port for the host (see above).
3. `SMTP_USER`: the server username.
4. `SMTP_PASS`: the server password.

<b>ADMIN_EMAIL</b><br>
The email address to send contact form confirmation emails from. Can be set to anything so long as its a valid email address. Modified as follows:
```
ADMIN_EMAIL = "no-reply@ufosc.com"
```
## Maintainers
Maintained by the UF Open Source Club, can be contacted via [Discord](https://discord.gg/j9g5dqSVD8)

Current Maintainers: Michail Zeipekki, Daniel Wildsmith
## Contributing
All contributions are welcome and appreciated, so long as they adhere to the [license](#license). Contributors are urged to familiarize themselves with the [contribution guidelines](CONTRIBUTING.md).
## License
[AGPL-3.0-or-later](LICENSE.md) <br/>
Copyright (C) 2007 Free Software Foundation, Inc.
