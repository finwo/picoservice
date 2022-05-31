export abstract class AbstractModel<T> {

  constructor(data: Partial<T> | undefined = undefined) {
    if (data) {
      Object.assign(this, data);
    }
  }

}
