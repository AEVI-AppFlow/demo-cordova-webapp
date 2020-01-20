# AppFlow WebApp Demonstrator

This application shows how to use the Typescript version of the AppFlow API to build a web app that can initiate payments and other types of flow.

The application is intended to show developers how to use all the functionality of the API. It has the same functionality as the PaymentInitiationSample application that can be found in the [pos-android-sdk repo](https://github.com/AEVI-AppFlow/pos-android-sdk)

The application is built using Cordova and makes use of the AppFlow Cordova Plugin to provide the implementation of the API.

## Pre-requistes

In order to test and/or integrate the application you will need to at a minimum install the two AEVI provided application

* AEVI Flow Processing Service (FPS), which implements the APIs and executes the flows
* AEVI AppFlow Configuration App, which provides the flows and other settings for AppFlow tailored for developers

Please [download the latest developer bundle](https://aevi-appflow.github.io/pos-android-sdk/downloads/), which contains these applications as well as the latest samples.

## Building

The application can be built using the standard cordova CLI e.g. 

```
cordova build android --release
```

The above will build a release version of the APK you can then install onto your Android device and use. You can then manually sign the APK with your chosen cert/key or alternatively use 

```
cordova run android --release -- --keystore=../my-release-key.keystore --storePassword=password --alias=alias_name --password=password
```

To pass in your keystore and password to sign the app during the build.

OR

```
cordova run android
```

Will use ADB to install and run the application on your device assuming it is connected.

## Application architecture

The (web) application itself is built using Angular 8 and Typescript. The code for the application can be found in the `application` folder.

To build the code itself you can use the standard Angular CLI tools. e.g.

```
cd application
ng build
```

This will compile and build the typescript sources into the `www` folder that is then later assembled and deployed by cordova when ran as above.

For simplicity various build scripts have been added to the npm package.json.

```
npm run build
```

Will run both the angular build and cordova android build. See the package.json for other scripts.

## Browser based simulation

This application can be run the in the browser for testing and development purposes. The appflow-cordova-pluin must first be installed for the `browser` plaform.

Once the correct platform plugin is installed the application can be run using:

```
npm run serve
```

This will compile and serve an instance of the application for running in a browser. The instance will be served on `http://localhost:3000`. Your browser should be automatically started and changes to the source code will be automatically watched for. After a change the code will be recompiled and the browser version should automatically refresh via browser-sync

## Bugs and Feedback
For bugs, feature requests and questions please use GitHub Issues.

## Contributions
Contributions to any of our repos via pull requests are welcome. We follow the git flow branching model.

## LICENSE
Copyright 2020 AEVI International GmbH

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.