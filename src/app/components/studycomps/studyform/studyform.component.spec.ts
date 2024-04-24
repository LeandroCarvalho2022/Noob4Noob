import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyformComponent } from './studyform.component';

describe('StudyformComponent', () => {
  let component: StudyformComponent;
  let fixture: ComponentFixture<StudyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
