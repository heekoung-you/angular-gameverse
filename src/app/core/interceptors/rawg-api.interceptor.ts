import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const rawgApiInterceptor: HttpInterceptorFn = (req, next) => {
  // If request is to RAWG API, add the API key as a query parameter
  if (req.url.startsWith(environment.rawgApiUrl!)) {
    const clone = req.clone({
      params: req.params.set('key', environment.rawgApiKey!),
    });
    return next(clone);
  }

  return next(req);
};
