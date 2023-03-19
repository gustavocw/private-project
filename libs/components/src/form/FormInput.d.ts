export default interface FormInput<T> {
  value?: T;
  onChange?: (value: T) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}
