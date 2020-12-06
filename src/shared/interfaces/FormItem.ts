export interface FormItem {
  content: string;
  id: string;
  type: string;
  config: FormItemConfig;
  isValid: boolean;
}

export interface FormItemConfig {
  name: string;
  disabled: boolean;
  placeholder: string;
  checked: boolean;
  label: string;
  required: boolean;
}
