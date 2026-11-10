import { Routes } from '@angular/router';
import { PostElenco } from './post-elenco/post-elenco';
import { PostDettaglio } from './post-dettaglio/post-dettaglio';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostElenco },
  { path: 'posts/:id', component: PostDettaglio },
  { path: '**', redirectTo: 'posts' },
];