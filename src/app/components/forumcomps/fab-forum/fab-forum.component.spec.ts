import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabForumComponent } from './fab-forum.component';

describe('FabForumComponent', () => {
  let component: FabForumComponent;
  let fixture: ComponentFixture<FabForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabForumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FabForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
