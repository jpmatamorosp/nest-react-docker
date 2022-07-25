import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { map, Observable } from 'rxjs';
import { classToPlain } from "class-transformer";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext, 
        next: CallHandler
        ): Observable<any> {
        return next
          .handle()
          .pipe(
            map((data) => classToPlain(data))
          );
      }
}