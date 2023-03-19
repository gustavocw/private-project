import {isObservable, isObservableMap, isObservableObject, toJS} from 'mobx';
import {ITypedJSONSettings, JsonObjectMetadata, TypedJSON} from 'typedjson';
import {v4 as uuid} from 'uuid';
import moment from 'moment';

export default class Utils {
  static deepClone<T>(target: T): T {
    if (target == null) return target;

    if (target instanceof Date) {
      return new Date(target.getTime()) as any;
    }

    if (target instanceof Set) {
      return new Set(Array.from(target as Set<any>)) as any;
    }

    if (target instanceof Array) {
      return [...(target as any)].map((item) => this.deepClone(item)) as any;
    }

    // @ts-ignore
    if (typeof target === 'object' && target !== {}) {
      const object = new (Utils.getConstructor(target as any))();

      Object.keys(target).forEach((key) => {
        object[key] = this.deepClone((target as any)[key]);
      });

      return object;
    }

    return isObservable(target) ? toJS(target) : target;
  }

  static getConstructor<T>(instance: T): {new(): T} {
    if (instance == null) {
      return null;
    }

    return (((instance as any).__proto__?.constructor ?? instance.constructor) as any);
  }

  static clone<T>(instance: T, type?: { new(): T }): T {
    if (instance == null) return null;

    if (isObservableObject(instance) || isObservableMap(instance)) {
      instance = toJS(instance);
    }

    const Constructor: { new(): T } = (type ?? instance.constructor as { new(): T });

    return TypedJSON.parse(instance, Constructor);
  }

  static toObject<T>(obj: T, type: { new(): T }) {
    return JSON.parse(TypedJSON.stringify(obj, type));
  }

  static setLoading(status: boolean) {
    window.dispatchEvent(new CustomEvent('__react_setLoading', {detail: status}));
  }

  static startLoading() {
    window.dispatchEvent(new CustomEvent('__react_startLoading'));
  }

  static finishLoading() {
    window.dispatchEvent(new CustomEvent('__react_finishLoading'));
  }

  static dateToRest(date: Date) {
    return date ? moment(date).format('YYYY-MM-DD') : null;
  }

  static datetimeToRest(date: Date) {
    return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;
  }

  static toCamelCase(text: string) {
    if (text == null || text.length <= 1) {
      return text?.toUpperCase();
    }

    return text.substr(0, 1).toUpperCase() + text.substr(1).toLowerCase();
  }

  static gerarIdUnico(): string {
    return uuid();
  }

  static isLocalhost() {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
      !(new URLSearchParams(location.search).has('env'));
  }

  static isNullOrUndefined(object): boolean {
    return object === null || object === undefined;
  }

  static clamp(numero: number, min: number, max: number) {
    return Math.max(min, Math.min(numero, max));
  }

  static arquivoParaString(arquivo: File, encoding?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = (error) => reject(error);


      if (encoding) {
        reader.readAsText(arquivo, encoding);
      }
      else {
        reader.readAsBinaryString(arquivo);
      }
    });
  }

  static normalizeText(text: string) {
    return text?.toLowerCase().normalize('NFD');
  }

  static hashCode(str: string): number {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }

  static getCookie(name : string) : string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    return (match) ? match[2] : null;
  }

  static setCookie(name: string, value: boolean) {
    document.cookie = name + '=' + value + ';expires=Tue, 19 Jan 2038 03:14:07 UTC';
  }

  static jsonFormat(object: any, serializationConfig?: ITypedJSONSettings): string {
    const constructor = Utils.getConstructor(Array.isArray(object) ? object[0] : object);
    const metadata = constructor ? JsonObjectMetadata.getFromConstructor(constructor) : null;

    if (metadata) {
      return Array.isArray(object) ?
        TypedJSON.stringifyAsArray(object, metadata.classType, null, serializationConfig) :
        TypedJSON.stringify(object, metadata.classType, serializationConfig);
    }

    return JSON.stringify(object);
  }

  static jsonParse<T>(json: string, tipo: { new(): T} | null, deserializationConfig?: ITypedJSONSettings): T {
    if ((json == null) || (json === '')) {
      return null;
    }

    if (tipo) {
      return TypedJSON.parse(json, tipo, deserializationConfig);
    }

    return JSON.parse(json);
  }

  static jsonParseArray<T>(json: string, tipo: { new(): T} | null, deserializationConfig?: ITypedJSONSettings): T[] {
    if ((json == null) || (json === '')) {
      return null;
    }

    if (tipo) {
      return TypedJSON.parseAsArray(json, tipo, deserializationConfig);
    }

    return JSON.parse(json);
  }

  static lazySingleton<T>(constructor: {new(): T}): () => T {
    const holder = {instance: null};

    return () => {
      if (holder.instance == null) {
        holder.instance = new constructor();
      }

      return holder.instance;
    };
  }
}

export function encodeParametros(strings: TemplateStringsArray, ...values: (string|number)[]): string {
  return strings.reduce((soma, valor, indice) => {
    return soma +
      (valor?.replace(/\s/g, '') ?? '') +
      (values[indice] ? encodeURIComponent(values[indice]) : '');
  }, '');
}
