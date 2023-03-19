export default class AsyncUtils {
  public static waitFor(condition: () => boolean, interval: number = 5): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data = {};

      data['timer'] = setInterval(() => {
        try {
          if (condition()) {
            clearInterval(data['timer']);
            resolve(null);
          }
        }
        catch (e) {
          clearInterval(data['timer']);
          reject(e);
        }
      }, interval);
    });
  }

  public static sleep(millis: number): Promise<void> {
    return new Promise((res) => setTimeout(res, millis));
  }

  public static async executeQueued(items: (() => PromiseLike<any>)[], interval: number = 0): Promise<void> {
    for (let i = 0; i < items.length; i++) {
      await items[i]();

      if (interval > 0) {
        await AsyncUtils.sleep(interval);
      }
    }
  }
}
