import { Directive, EventEmitter, Output, signal } from "@angular/core";

@Directive()
export abstract class EventComponent {
  protected showDelete = signal<boolean>(false);

  @Output()
  public deleteActivity = new EventEmitter<void>();

  @Output()
  public updateActivity = new EventEmitter<void>();

  protected delete(): void {
    this.deleteActivity.emit();
    this.hideDeleteBtn();
  }

  protected update(): void {
    this.updateActivity.emit();
    this.hideDeleteBtn();
  }

  protected showDeleteBtn(): void {
    this.showDelete.set(true);
  }

  protected hideDeleteBtn(): void {
    this.showDelete.set(false);
  }
}
