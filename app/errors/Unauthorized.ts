export class Unauthorized extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}
