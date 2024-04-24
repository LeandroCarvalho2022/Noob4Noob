import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcompComponent } from './postcomp.component';

describe('PostcompComponent', () => {
  let component: PostcompComponent;
  let fixture: ComponentFixture<PostcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostcompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
