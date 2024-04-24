import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrevComponent } from './card-prev.component';

describe('CardPrevComponent', () => {
  let component: CardPrevComponent;
  let fixture: ComponentFixture<CardPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPrevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
