"use strict";

export function initialize(): void {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady(): void {
    console.log('onDeviceReady');

    document.addEventListener('pause', onPause, false);
    document.addEventListener('resume', onResume, false);
}

function onPause(): void {
    console.log('onPause');
    // TODO: This application has been suspended. Save application state here.
}

function onResume(): void {
    console.log('onResume');

    // TODO: This application has been reactivated. Restore application state here.
}