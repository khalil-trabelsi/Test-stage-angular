import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeleteButtonRendererComponent } from './custom-actions-button-renderer.component';

describe('CustomDeleteButtonRendererComponent', () => {
  let component: CustomDeleteButtonRendererComponent;
  let fixture: ComponentFixture<CustomDeleteButtonRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDeleteButtonRendererComponent]
    });
    fixture = TestBed.createComponent(CustomDeleteButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
