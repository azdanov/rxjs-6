# RxJS v6 - example

Trying out rxjs v6 with typescript.

There are three function [loadWithXhr](https://github.com/azdanov/rxjs-6/blob/a849870b532f34dca016c80277b706de05749eb3/src/ajax.ts#L5), [loadWithFetch](https://github.com/azdanov/rxjs-6/blob/a849870b532f34dca016c80277b706de05749eb3/src/ajax.ts#L31) and [loadWithNative](https://github.com/azdanov/rxjs-6/blob/a849870b532f34dca016c80277b706de05749eb3/src/ajax.ts#L44) which implement ajax by using different rxjs capabilities.

[Live](https://azdanov.js.org/rxjs-6/)

This is a good reference point to start out experimenting with RxJS on your own.

## Setup

[Parcel bundler](https://parceljs.org/) was used for development and production. [RxJS](https://github.com/ReactiveX/RxJS) __v6__ is used as main the driver.

Implemented in [TypeScript](https://github.com/Microsoft/TypeScript), with help of [TSLint](https://github.com/palantir/tslint).

## Usage

I've used [yarn](https://github.com/yarnpkg/yarn) as a package manager, [npm](https://github.com/npm/npm/) can be used as well.

`yarn` - install dependencies.

`yarn run develop` - start a local server on `http://localhost:1234/` by using [parcel](https://github.com/parcel-bundler/parcel).

`yarn run build` - build for production with a minified output.

## License

[MIT](https://github.com/azdanov/rxjs-6/blob/master/LICENSE)
