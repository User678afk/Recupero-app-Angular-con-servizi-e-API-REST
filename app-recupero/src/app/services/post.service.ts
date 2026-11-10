import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../modelli/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Signal privati per lo stato interno
  private readonly _posts = signal<Post[]>([]);
  private readonly _postCorrente = signal<Post | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _errore = signal<string | null>(null);

  // Signal pubblici in sola lettura esposti con asReadonly()
  readonly posts = this._posts.asReadonly();
  readonly postCorrente = this._postCorrente.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly errore = this._errore.asReadonly();

  // GET elenco post
  caricaPosts(): void {
    this._loading.set(true);
    this._errore.set(null);
    this.http.get<Post[]>(this.baseUrl).subscribe({
      next: (dati) => {
        this._posts.set(dati);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // GET singolo post per ID
  caricaPostSingolo(id: number): void {
    this._loading.set(true);
    this._errore.set(null);
    this._postCorrente.set(null);
    this.http.get<Post>(`${this.baseUrl}/${id}`).subscribe({
      next: (dati) => {
        this._postCorrente.set(dati);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // POST crea nuovo post
  creaPost(nuovoPost: Omit<Post, 'id'>): void {
    this._loading.set(true);
    this._errore.set(null);
    this.http.post<Post>(this.baseUrl, nuovoPost).subscribe({
      next: (postCreato) => {
        this._posts.update((elenco) => [postCreato, ...elenco]);
        this._loading.set(false);
      },
      error: (err: HttpErrorResponse) => this.gestisciErrore(err),
    });
  }

  // Gestione messaggi d'errore (404 e stato 0 per rete assente)
  private gestisciErrore(err: HttpErrorResponse): void {
    this._loading.set(false);
    if (err.status === 0) {
      this._errore.set('Rete assente: impossibile contattare il server.');
    } else if (err.status === 404) {
      this._errore.set('Elemento non trovato (Errore 404).');
    } else {
      this._errore.set(`Errore ${err.status}: ${err.message}`);
    }
  }
}