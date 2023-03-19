import moment from 'moment';
import Serializer from './Serializer';

export default class DateSerializer {
  private static readonly dateFormat = 'YYYY-MM-DD';
  private static readonly datetimeFormat = 'YYYY-MM-DD HH:mm:ss';

  static get default() {
    return DateSerializer.format();
  }

  static get date() {
    return DateSerializer.format(DateSerializer.dateFormat);
  }

  static get datetime() {
    return DateSerializer.format(DateSerializer.datetimeFormat);
  }

  static format(format?: string): Serializer {
    return {
      serializer: (value) => {
        if (value == null) return value;

        if (format) {
          return moment(value).format(format);
        }
        else {
          if (moment(value).startOf('day').valueOf() === moment(value).valueOf()) {
            return moment(value).format(DateSerializer.dateFormat);
          }

          return moment(value).format(DateSerializer.datetimeFormat);
        }
      },
      deserializer: (json) => {
        if (json == null) return json;
        else return moment(json, format ?? DateSerializer.datetimeFormat).toDate();
      },
    };
  }
}
