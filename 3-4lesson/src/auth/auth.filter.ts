import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    if (status === HttpStatus.FORBIDDEN) {
      response.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
        message: 'Access denied.',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        error: exception.message,
      });
    }
  }
}