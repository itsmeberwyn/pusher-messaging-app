import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../interfaces/message.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  submitMessage(
    from: any,
    to: any,
    message: any,
    channel: any
  ): Observable<any> {
    return this.http.post('http://localhost/push-phpapi/api/message', {
      from: from,
      to: parseInt(to),
      message: message,
      channel: channel,
    });
  }
}
