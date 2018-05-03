import { fromEvent } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { loadWithFetch, loadWithNative, loadWithXhr } from './ajax';

interface Movie {
  title: string;
}

const output = document.getElementById('output');
const button = document.getElementById('button');

function renderMovies(movies: Movie[]) {
  movies.forEach(m => {
    const div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

const fileLocation = window.location.href + 'movies.json';

const xhrSubscription = loadWithXhr(fileLocation).subscribe(
  renderMovies,
  e => console.error(`Error: ${e}`),
  () => console.info('loadXhr(): done'),
);

xhrSubscription.unsubscribe();

loadWithFetch(fileLocation).subscribe(
  renderMovies,
  e => console.error(`Error: ${e}`),
  () => console.info('loadWithFetch(): done'),
);

const click = fromEvent(button, 'click')
  .pipe(flatMap(e => loadWithNative(fileLocation)))
  .subscribe(
    renderMovies,
    e => console.error(`Error: ${e}`),
    () => console.info('fromEvent(): done'),
  );
