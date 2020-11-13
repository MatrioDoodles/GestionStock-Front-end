import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuotationsByClientComponent } from './list-quotations-by-client.component';

describe('ListQuotationsByClientComponent', () => {
  let component: ListQuotationsByClientComponent;
  let fixture: ComponentFixture<ListQuotationsByClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListQuotationsByClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQuotationsByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
