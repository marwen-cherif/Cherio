export class Forbidden extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, Forbidden.prototype);
  }
}
