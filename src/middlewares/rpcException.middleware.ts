import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { ServiceRpcException } from 'src/exceptions/service.exception';

@Catch(RpcException)
export class ExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log(exception.getError());
    return throwError(() => exception.getError());
  }
}
