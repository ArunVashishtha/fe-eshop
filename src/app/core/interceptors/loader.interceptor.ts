import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requestCount: number;
  private byPassRequests: string[] = [];

  constructor(private loaderService: LoaderService) {
    this.requestCount = 0;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.byPassRequests.some(reqUrl => request.url.includes(reqUrl))) {
        return next.handle(request);
    }
    this.requestCount++;
    this.loaderService.setLoader(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.requestCount--;
        if (!this.requestCount) {
            this.loaderService.setLoader(false);
        }
      })
    );
  }
}
