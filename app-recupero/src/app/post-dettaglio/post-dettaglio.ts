import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  imports: [RouterLink],
  selector: 'app-post-dettaglio',
  styleUrl: './post-dettaglio.css',
  templateUrl: './post-dettaglio.html',
})
export class PostDettaglio implements OnChanges {
  @Input() id?: string;
  readonly postService = inject(PostService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.postService.caricaPostSingolo(Number(this.id));
    }
  }

  get numericId(): number {
    return Number(this.id) || 1;
  }
}