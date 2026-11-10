import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  imports: [RouterLink],
  selector: 'app-post-elenco',
  styleUrl: './post-elenco.css',
  templateUrl: './post-elenco.html',
})
export class PostElenco implements OnInit {
  readonly postService = inject(PostService);

  // Signal per il testo di ricerca
  readonly filtro = signal<string>('');

  // Computed per il filtro dei post basato sul titolo
  readonly postsFiltrati = computed(() => {
    const f = this.filtro().toLowerCase().trim();
    return this.postService.posts().filter((p) => p.title.toLowerCase().includes(f));
  });

  // Computed per il conteggio dei post filtrati
  readonly totaleFiltrati = computed(() => this.postsFiltrati().length);

  ngOnInit(): void {
    if (this.postService.posts().length === 0) {
      this.postService.caricaPosts();
    }
  }

  aggiornaFiltro(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.filtro.set(val);
  }

  crea(titoloInput: HTMLInputElement, testoInput: HTMLTextAreaElement): void {
    const title = titoloInput.value.trim();
    const body = testoInput.value.trim();
    if (!title || !body) return;

    this.postService.creaPost({ userId: 1, title, body });
    titoloInput.value = '';
    testoInput.value = '';
  }
}