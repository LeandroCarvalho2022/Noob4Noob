import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTempComponent } from './user-temp.component';

describe('UserTempComponent', () => {
  let component: UserTempComponent;
  let fixture: ComponentFixture<UserTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
