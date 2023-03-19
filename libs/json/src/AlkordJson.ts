import {TypedJSON} from 'typedjson';
import {Serializable} from 'typedjson/src/types';
import {ITypedJSONSettings} from 'typedjson/src/parser';

export type JsonSettings = ITypedJSONSettings;

export default class AlkordJson {
  public static parse<T>(object: any, rootType: Serializable<T>, settings?: ITypedJSONSettings): T {
    return TypedJSON.parse(object, rootType, settings);
  }

  public static parseAsArray<T>(object: any, elementType: Serializable<T>, settings?: ITypedJSONSettings): T[] {
    return TypedJSON.parseAsArray(object, elementType, settings);
  }

  public static stringify<T>(object: T, rootType: Serializable<T>, settings?: ITypedJSONSettings): string {
    return TypedJSON.stringify(object, rootType, settings);
  }

  public static stringifyAsArray<T>(
      object: Array<T>, elementType: Serializable<T>, settings?: ITypedJSONSettings,
  ): string {
    return TypedJSON.stringifyAsArray(object, elementType, null, settings);
  }
}
