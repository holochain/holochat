# holochat

[![Build Status](https://travis-ci.org/Holochain/holochat.svg?branch=develop-react)](https://travis-ci.org/Holochain/holochat)
[![Code Status](https://img.shields.io/badge/Code-Pre--Alpha-orange.svg)](https://github.com/Holochain/holochat#feature-roadmap-and-current-progress)
[![In Progress](https://img.shields.io/waffle/label/Holochain/holochat/in%20progress.svg)](http://waffle.io/Holochain/holochat)
[![Gitter](https://badges.gitter.im/metacurrency/holochain.svg)](https://gitter.im/metacurrency/holochain?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

***Multi-room P2P chat on holochain**

**[Code Status:](https://github.com/metacurrency/holochain/milestones?direction=asc&sort=completeness&state=all)** Pre-alpha. Not for production use. This application has not been audited for any security validation.

## Docker - easiest way to have a look at HoloChat

```
  TARGETDIR=$(pwd) docker-compose up

```
Now you can open browsers to
```
  http://localhost:3142 - Bootstrap
  http://localhost:3141 - Holochat
  http://localhost:4141 - Holochat
  http://localhost:5141 - Holochat
```

## Installation & Usage Native

Prerequiste: [Install holochain](https://github.com/metacurrency/holochain/#installation) on your machine.
You can install holochat very simply with this:

``` shell
  cd ui-src
  yarn build
  cd ..
  hcdev web

```
you will see:

``` shell
  Copying chain to: /home/bootstrap/.holochaindev ...
  Serving holochain with DNA hash:QmdFv5XcG6YZgMYQ9hPJfn6xkhMhDK99rjiHJHH9zorUad on port:4141
```
Then point your browser to http://localhost:4141 access the holochat UI.

### Tests
To run all the stand alone tests:

``` shell
  hcdev test
```

### Run e2e tests
Make sure you are running Holochat either in Docker, as above, or 3 instances locally on ports 3141, 4141 & 5141.
```
  cd ui-automation
  yarn test
```

### Set Up for Developing
Run the DNA from the root folder of HoloChat
```
  hcdev web
```
Switch into the ui-src folder then run the UI which will proxy requests to port 4141 so you can update the UI without always restarting hcdev.  When you change the DNA you will need to restart hcdev web
```
  yarn start
```
This will run the UI on http://localhost:3000

When developing view the components use storybook to see what the UI component looks like and behaves.
```
  yarn run storybook
```
You will then be able to see the UI pieces on http://localhost:9009

Keep the integration tests running as well by switching into the ui-automation folder and running
```
  yarn run cypress:open
```

Now you have a first class TDD setup ready to develop HoloChat :)

## View Chain & DHT Data
You can view the data in your local chain and DHT by executing the following.  Make sure you have jq installed to get the pretty colours.  If not just remove the | jq . part.

```
  HOLOPATH=/Users/philipbeadle/.holochaindev hcadmin dump holochat --chain --json | jq .
  HOLOPATH=/Users/philipbeadle/.holochaindev hcadmin dump holochat --dht --json | jq .
```

## Automated Build https://travis-ci.org/Holochain/holochat

## Sequence Diagram for Identifying HoloChat with DPKI

<img src="IdentitySequence.svg" width="80%" />

## Feature Roadmap and Current Progress


## Contribute
We welcome pull requests and issue tickets.  Find us on [Holochain](https://chat.holochain.net/) to chat.

Contributors to this project are expected to follow our [development protocols & practices](https://github.com/metacurrency/holochain/wiki/Development-Protocols).

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (C) 2018, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, Philip Beadle, et. al.)

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
