import { defer, from, Observable, Observer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay, map, retryWhen, scan } from 'rxjs/operators';

export function loadWithXhr(url: string): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    const xhr = new XMLHttpRequest();

    const onLoad = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    };

    xhr.addEventListener('load', onLoad);

    xhr.open('GET', url);
    xhr.send();

    return () => {
      xhr.removeEventListener('load', onLoad);
      xhr.abort();
    };
  }).pipe(retryWhen(retryStrategy({ times: 3, wait: 1300 })));
}

export function loadWithFetch(url: string): Observable<any> {
  return defer(() => {
    return from(
      fetch(url).then(r => {
        if (r.status >= 200 && r.status < 300) {
          return r.json();
        }
        return Promise.reject(r);
      }),
    );
  }).pipe(retryWhen(retryStrategy({ times: 5, wait: 500 })));
}

export function loadWithNative(url: string): Observable<any> {
  return ajax(url).pipe(
    retryWhen(retryStrategy({ times: 2, wait: 2500 })),
    map(r => r.response),
  );
}

const retryStrategy = ({ times = 4, wait = 1000 }: { times: number; wait: number }) => (
  errors: Observable<any>,
) =>
  errors.pipe(
    scan((previous, value) => {
      const current = previous + 1;

      if (current >= times) {
        throw new Error(String(value));
      }
      return current;
    }, 0),
    delay(wait),
  );
