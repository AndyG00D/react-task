import {environment} from './environments/environment';

export class apiUrls {
  /**
   * URLs for HTTP request
   */
  static playlist = `${environment.apiBase}/playlist/`;
  static search = `${environment.apiBase}/search/track?q=`;
  static login = `${environment.apiAuth}/oauth/auth.php?app_id=${environment.app_id}&redirect_uri=${environment.redirect_uri}&perms=${environment.perms}`;
  static token = `${environment.apiAuth}/oauth/access_token.php?app_id=${environment.app_id}&secret=${environment.secret}&code=`;

  static logout = `${environment.apiBase}/logout/`;
  static verify = `${environment.apiBase}/verify-email/`;

  static google = `${environment.apiBase}/rest-auth/google/`;
  static changePassword = `${environment.apiBase}/password/change/`;
  static resetPassword = `${environment.apiBase}/password/reset/`;
  static resetConfirm = `${environment.apiBase}/password/reset/confirm/`;
  static locations = `${environment.apiBase}/locations/`;
  static profileProducts = `${environment.apiBase}/profile/adverts/`;

  /**
   * Path to no Image and Avatar
   */
  static noImage = `/assets/img/No_image.png`;
  static noAvatar = `/assets/img/noavatar.png`;
}
