import Serializer from './Serializer';
import {TypedJSON} from 'typedjson';

export default class ClassSerializer {
  static classOrInteger<T>(type: { new(): T }, primaryKey: keyof T): Serializer {
    return {
      serializer: (value) => {
        return (value != null) ? JSON.parse(TypedJSON.stringify<T>(value, type)) : value;
      },
      deserializer: (json) => {
        if (json == null) return json;

        if (/^[0-9]+$/.exec(json.toString())) {
          const value = parseInt(json.toString());

          if (value === 0) return null;

          // eslint-disable-next-line new-cap
          const object: T = new type();
          object[primaryKey] = value as any;

          return object;
        }

        return TypedJSON.parse<T>(json, type);
      },
    };
  }

  static class<T>(type: { new(): T }): Serializer {
    return {
      serializer: (value) => {
        return (value != null) ? TypedJSON.stringify<T>(value, type) : value;
      },
      deserializer: (json) => {
        if (json == null) return json;

        return ((typeof json === 'object') && (Object.keys(json).length > 0)) ?
          TypedJSON.parse<T>(json, type) : null;
      },
    };
  }

  static enum(enumClass: any): Serializer {
    const getUsandoCodigo = enumClass.getUsandoCodigo ?? ((value: string) => {
      for (const item in enumClass) {
        // eslint-disable-next-line eqeqeq
        if (enumClass.hasOwnProperty(item) && enumClass[item] == value) {
          return enumClass[item];
        }
      }

      return null;
    });

    return {
      serializer: (value) => value,
      deserializer: (json) => getUsandoCodigo(json),
    };
  }
}
