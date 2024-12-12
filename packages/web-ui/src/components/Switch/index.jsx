import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchComponent({
  label,
  defaultValue,
  onChange,
  disabled,
}) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={label}
        onCheckedChange={onChange}
        defaultChecked={defaultValue}
        disabled={disabled}
      />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
}
