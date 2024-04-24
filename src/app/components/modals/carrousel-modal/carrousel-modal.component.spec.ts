import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselModalComponent } from './carrousel-modal.component';

describe('CarrouselModalComponent', () => {
  let component: CarrouselModalComponent;
  let fixture: ComponentFixture<CarrouselModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrouselModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrouselModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
