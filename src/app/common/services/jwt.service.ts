// -----------------------------------------------------------------------------------------------------
// @ AUTH UTILITIES
//
// Methods are derivations of the Auth0 Angular-JWT helper service methods
// https://github.com/auth0/angular2-jwt
// -----------------------------------------------------------------------------------------------------

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtUtilsService {
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  public setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  public get accessToken(): string | null {
    return localStorage.getItem('accessToken') ?? null;
  }

  public setProfileInfo(data: any) {
    localStorage.setItem('profile', JSON.stringify(data));
  }

  public get profileInfo(): any {
    const data: any = localStorage.getItem('profile') ?? null;
    return JSON.parse(data);
  }

  public get companyId(): string | null {
    return localStorage.getItem('company');
  }

  /**
   * Is token expired?
   *
   * @param token
   * @param offsetSeconds
   */
  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    // Return if there is no token
    if (!token || token === '') {
      return true;
    }

    // Get the expiration date
    const date = this._getTokenExpirationDate(token);

    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return true;
    }

    // Check if the token is expired
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

  /**
   * Decode token
   *
   * @param token
   * @private
   */
  public decodeToken(token: string | any): any {
    // Return if there is no token
    if (!token) {
      return null;
    }

    // Split the token
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error(
        "The inspected token doesn't appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more."
      );
    }

    // Decode the token using the Base64 decoder
    const decoded = this._urlBase64Decode(parts[1]);

    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    return JSON.parse(decoded);
  }

  public getCompanyInfo() {
    console.log(this.decodeToken(this.accessToken));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Base64 decoder
   * Credits: https://github.com/atk
   *
   * @param str
   * @private
   */
  private _b64decode(str: string): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }

    /* eslint-disable */
    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    /* eslint-enable */

    return output;
  }

  /**
   * Base64 unicode decoder
   *
   * @param str
   * @private
   */
  private _b64DecodeUnicode(str: any): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          this._b64decode(str),
          (c: any) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join('')
    );
  }

  /**
   * URL Base 64 decoder
   *
   * @param str
   * @private
   */
  private _urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw Error('Illegal base64url string!');
      }
    }
    return this._b64DecodeUnicode(output);
  }

  /**
   * Get token expiration date
   *
   * @param token
   * @private
   */
  private _getTokenExpirationDate(token: string): Date | null {
    // Get the decoded token
    const decodedToken = this.decodeToken(token);

    // Return if the decodedToken doesn't have an 'exp' field
    if (!decodedToken.hasOwnProperty('exp')) {
      return null;
    }

    // Convert the expiration date
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  }
}
