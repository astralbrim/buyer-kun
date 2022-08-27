import {ArgumentsHost, Catch, ExceptionFilter, NotFoundException} from "@nestjs/common";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    res.send("404 Not Found");
  }
}