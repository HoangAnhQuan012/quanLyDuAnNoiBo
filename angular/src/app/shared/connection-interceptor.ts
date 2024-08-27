import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppComponentBase } from './app.component-base';
@Injectable()
export class ConnectionInterceptor extends AppComponentBase implements HttpInterceptor {

    constructor(injector: Injector) {
        super(injector);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    window.document.location.reload();
                } else if (error.status === 500) {
                    this.showErrorMessage(this.L('Lỗi server. Vui lòng thử lại sau'));
                } else if (!navigator.onLine || error.status === 0) {
                    // Xử lý lỗi khi mất kết nối tới server
                    console.log('Mất kết nối tới server');
                    // Có thể hiển thị thông báo lỗi cho người dùng
                    alert('Mất kết nối tới server');
                }
                return throwError(error);
            })
        );
    }
}
