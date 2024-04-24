import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyhomepageComponent } from './studyhomepage.component';

describe('StudyhomepageComponent', () => {
  let component: StudyhomepageComponent;
  let fixture: ComponentFixture<StudyhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyhomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
