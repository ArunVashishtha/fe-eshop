import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class RestService<RES, REQ = any> {

  constructor(protected http: HttpClient, protected actionUrl: string) { }

  get(options = {}, routeUrlObject?: {[key: string]: string}): Observable<RES> {
    const newActionUrl = this._addRouteParam(this.actionUrl, routeUrlObject);
    return this.http.get<RES>(newActionUrl, options);
  }

  post(payload: REQ): Observable<RES> {
    return this.http.post<RES>(this.actionUrl, payload);
  }

  put(routeUrlObject: {[key: string]: string}, payload: REQ): Observable<RES> {
    const newActionUrl = this._addRouteParam(this.actionUrl, routeUrlObject);
    return this.http.put<RES>(newActionUrl, payload);
  }

  delete(routeUrlObject: {[key: string]: string}): Observable<RES> {
    const newActionUrl = this._addRouteParam(this.actionUrl, routeUrlObject);
    return this.http.delete<RES>(newActionUrl);
  }

  private _addRouteParam(url: string, obj: {[key: string]: string} = {}): string {
    Object.entries(obj).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
    return url;
  }
}
