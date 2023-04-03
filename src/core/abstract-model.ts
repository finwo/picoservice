export abstract class AbstractModel {
  static fromData(data: Record<string | symbol, any>) {
    return Object.create(
      this.prototype,
      Object.entries(data)
        .reduce((r, [k,value]) => ({
          ...r,
          [k]: {
            value,
            enumerable: true,
            writable  : true, // TODO: detect based on metadata
          },
        }), {}),
    );
  }
}
