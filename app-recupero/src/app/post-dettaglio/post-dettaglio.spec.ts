import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDettaglio } from './post-dettaglio';

describe('PostDettaglio', () => {
  let component: PostDettaglio;
  let fixture: ComponentFixture<PostDettaglio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDettaglio],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDettaglio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
