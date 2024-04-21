import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
  selector: "[appSwipe]",
  standalone: true,
})
export class SwipeDirective {
  @Output() public readonly swipeLeft = new EventEmitter<void>();
  @Output() public readonly swipeRight = new EventEmitter<void>();

  private _swipeCoord = [0, 0];
  private _swipeTime = new Date().getTime();

  constructor() {}

  @HostListener("touchstart", ["$event"])
  public _onSwipeStart(event: TouchEvent): void {
    this._onSwipe(event, "start");
  }

  @HostListener("touchend", ["$event"])
  public _onSwipeEnd(event: TouchEvent): void {
    this._onSwipe(event, "end");
  }

  private _onSwipe(e: TouchEvent, when: string): void {
    this._swipe(e, when);
  }

  private _swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY,
    ];
    const time = new Date().getTime();

    if (when === "start") {
      this._swipeCoord = coord;
      this._swipeTime = time;
    } else if (when === "end") {
      const direction = [
        coord[0] - this._swipeCoord[0],
        coord[1] - this._swipeCoord[1],
      ];
      const duration = time - this._swipeTime;

      if (
        duration < 1000 && //
        Math.abs(direction[0]) > 30 && // Long enough
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        // Horizontal enough
        const swipeDir = direction[0] < 0 ? "next" : "previous";
        if (swipeDir === "next") {
          this.swipeLeft.emit();
        } else {
          this.swipeRight.emit();
        }
      }
    }
  }
}
