import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';
import DateSerializer from './serializers/DateSerializer';
import ClassSerializer from './serializers/ClassSerializer';
import PrimitiveSerializer from './serializers/PrimitiveSerializer';
import ConvertSerializers from './serializers/ConvertSerializers';
import {TypeThunk} from 'typedjson/src/type-descriptor';
import Serializer from './serializers/Serializer';

export const jsonModel = jsonObject;

export function jsonString<T, K extends keyof T>(target: [T[K]] extends [string] ? T : never, propertyKey: K): void {
  return jsonMember(String)(target, propertyKey as any);
}

export function jsonStringOptions(options: {name?: string}) {
  return jsonMember(String, options);
}

export function jsonNumberOptions(options: {name?: string}) {
  return jsonMember(Number, options);
}

export function jsonNumber<T, K extends keyof T>(target: [T[K]] extends [number] ? T : never, propertyKey: K): void {
  return jsonMember(Number)(target, propertyKey as any);
}

export function jsonInteger<T, K extends keyof T>(target: [T[K]] extends [number] ? T : never, propertyKey: K): void {
  return jsonMember(PrimitiveSerializer.integer)(target, propertyKey as any);
}

export function jsonFloat<T, K extends keyof T>(target: [T[K]] extends [number] ? T : never, propertyKey: K): void {
  return jsonMember(PrimitiveSerializer.float)(target, propertyKey as any);
}

export function jsonBoolean<T, K extends keyof T>(target: [T[K]] extends [boolean] ? T : never, propertyKey: K): void {
  return jsonMember(Boolean)(target, propertyKey as any);
}

export function jsonDate<T, K extends keyof T>(target: [T[K]] extends [Date] ? T : never, propertyKey: K): void {
  return jsonMember(DateSerializer.default)(target, propertyKey as any);
}

export function jsonDateFormat(format: string | 'date' | 'datetime') {
  switch (format) {
    case 'date':
      return jsonMember(DateSerializer.date);
    case 'datetime':
      return jsonMember(DateSerializer.datetime);
    default:
      return jsonMember(DateSerializer.format(format));
  }
}

export function jsonEnum(enumClass: any) {
  return jsonMember(ClassSerializer.enum(enumClass));
}

export function jsonIgnore<T, K extends keyof T>(target: T, propertyKey: K): void {
  return jsonMember(PrimitiveSerializer.ignore)(target, propertyKey as any);
}

export function jsonConvertJsonString<T, K extends keyof T>(target: [T[K]] extends [object] ? T : never, propertyKey: K): void {
  return jsonMember(ConvertSerializers.jsonString())(target, propertyKey as any);
}

export function jsonConvertStringToNumber<T, K extends keyof T>(target: [T[K]] extends [number] ? T : never, propertyKey: K): void {
  return jsonMember(ConvertSerializers.stringToNumber)(target, propertyKey as any);
}

export function jsonConvertStringToBoolean<T, K extends keyof T>(target: [T[K]] extends [boolean] ? T : never, propertyKey: K): void {
  return jsonMember(ConvertSerializers.stringToBoolean)(target, propertyKey as any);
}

export function jsonArray(type: TypeThunk) {
  return jsonArrayMember(type);
}

export function jsonClass(type: TypeThunk) {
  return jsonMember(type); // FIXME
}

export function jsonDeferredClass<T>(constructor: { new(): T }) {
  return jsonMember(ClassSerializer.class(constructor));
}

export function jsonClassOrInteger<T>(type: { new(): T }, primaryKey: keyof T) {
  return jsonMember(ClassSerializer.classOrInteger(type, primaryKey));
}

export function jsonCustom(serializer: Serializer) {
  return jsonMember(serializer);
}
