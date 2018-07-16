import {environment} from './environments/environment';

export class apiUrls {
  /**
   * URLs for HTTP request
   */
  static playlist = `${environment.apiBase}/playlist/`;
  static search = `${environment.apiBase}/search/track?q=`;
  static login = `${environment.apiAuth}/oauth/auth.php?app_id=${environment.app_id}&redirect_uri=${environment.redirect_uri}&perms=${environment.perms}`;
  static token = `${environment.apiAuth}/oauth/access_token.php?app_id=${environment.app_id}&secret=${environment.secret}&code=`;
}
