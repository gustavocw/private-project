type PartialRecord<T> = T | {[P in keyof T]?: T[P] | string};

export default PartialRecord;
