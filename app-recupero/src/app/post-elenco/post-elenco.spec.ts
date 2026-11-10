import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostElenco } from './post-elenco';

describe('PostElenco', () => {
  let component: PostElenco;
  let fixture: ComponentFixture<PostElenco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostElenco],
    }).compileComponents();

    fixture = TestBed.createComponent(PostElenco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
