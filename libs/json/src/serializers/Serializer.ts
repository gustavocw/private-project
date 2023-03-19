export default interface Serializer {
  preserveNull?: boolean;
  serializer?: (value: any) => any;
  deserializer?: (json: any) => any;
}
