import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeAdminComponent } from './product-type-admin.component';

describe('ProductTypeAdminComponent', () => {
  let component: ProductTypeAdminComponent;
  let fixture: ComponentFixture<ProductTypeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTypeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
