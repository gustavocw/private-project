import Serializer from './Serializer';

export default class PrimitiveSerializer {
  static get ignore(): Serializer {
    return {
      preserveNull: false,
      serializer: () => undefined,
      deserializer: () => undefined,
    };
  }

  static get integer(): Serializer {
    return {
      serializer: (value) => value,
      deserializer: (json) => (json != null) ? parseInt(json) : json,
    };
  }

  static get float(): Serializer {
    return {
      serializer: (value) => value,
      deserializer: (json) => (json != null) ? parseFloat(json) : json,
    };
  }
}
