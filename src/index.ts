import { fromEvent } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { loadXhr, loadWithFetch } from './ajax';

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

const xhrSubscription = loadXhr('movies.json').subscribe(
  renderMovies,
  e => console.error(`Error: ${e}`),
  () => console.info('loadXhr(): done'),
);

xhrSubscription.unsubscribe();

loadWithFetch('movies.json').subscribe(
  renderMovies,
  e => console.error(`Error: ${e}`),
  () => console.info('loadWithFetch(): done'),
);

const click = fromEvent(button, 'click')
  .pipe(flatMap(e => loadWithFetch('movies.json')))
  .subscribe(
    renderMovies,
    e => console.error(`Error: ${e}`),
    () => console.info('fromEvent(): done'),
  );
