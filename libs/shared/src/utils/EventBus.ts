import Utils from './Utils';

export default class EventBus {
  private static instance: EventBus;
  private events: { [key: string]: any } = {};

  postSticky(key: string, data: any) {
    this.events[key] = Utils.deepClone(data);
  }

  postStickyJson(key: string, data: string) {
    this.postSticky(key, JSON.parse(data));
  }

  removeSticky<T>(key: string) {
    const value = (typeof this.events[key] !== 'undefined') ? this.events[key] : null;
    delete this.events[key];
    return value as T;
  }

  removeStickyJson<T>(key: string) {
    const value = this.removeSticky<T>(key);

    return value ? JSON.stringify(value) : null;
  }

  static get(): EventBus {
    if (this.instance == null) {
      this.instance = new EventBus();
    }

    return this.instance;
  }
}
