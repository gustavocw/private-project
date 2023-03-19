import Serializer from './Serializer';

export default class ConvertSerializers {
  static get stringToNumber(): Serializer {
    return {
      serializer: (value) => (value != null) ? parseFloat(value) : value,
      deserializer: (json) => (json?.toString().length > 0) ? parseFloat(json.toString()) : null,
    };
  }

  static get stringToBoolean(): Serializer {
    return {
      serializer: (value) => (value != null) ? (value ? 'S' : 'N') : value,
      deserializer: (json) => (json != null) ? (json.toString() === 'S') : json,
    };
  }

  static jsonString<T>(): Serializer {
    return {
      serializer: (value) => {
        return (value != null) ? JSON.stringify(value) : value;
      },
      deserializer: (json: string) => {
        if (json == null) return json;

        if (json.trim().length === 0) return null;

        return JSON.parse(json) as T;
      },
    };
  }
}
