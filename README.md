# UF OSC Website
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) ![GitHub issues](https://img.shields.io/github/issues-raw/ufosc/Club_Website_2) ![GitHub](https://img.shields.io/github/license/ufosc/Club_Website_2) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ufosc/Club_Website_2/Node.js%20CI)
<br/>
Website for the UF Open Source Club.
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
This project adheres to the Javascript Standard syntax style, running the following will show you a list of syntax errors that you'll need to correct.
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
## Contributing
All contributions are welcome and appreciated, so long as they adhere to the [license](#license). Contributors are urged to familiarize themselves with the [contribution guidelines](CONTRIBUTING.md).
## License
[GPL-3.0-or-later](LICENSE.md) <br/>
Copyright (C) 2007 Free Software Foundation, Inc.
