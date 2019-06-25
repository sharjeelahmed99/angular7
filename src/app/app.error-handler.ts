import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

export class AppErrorHandler implements ErrorHandler {
  constructor(private ngZone: NgZone, @Inject(ToastyService) private toastyService: ToastyService) {}
  handleError(error: any): void {
    if (isDevMode()) {
      // specific to only dev env
    }
    // this.ngZone.run(() => {
    //   this.toastyService.error({
    //     title: 'Error',
    //     msg: 'Oops, Something went wrong',
    //     showClose: true,
    //     timeout: 5000
    //   });
    // });
  }
}
