import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectComponent({
  defaultValue,
  items,
  name,
  onChange,
}) {
  return (
    <>
      <Label htmlFor="email">{name}</Label>
      <Select value={defaultValue} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${name}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose {name}</SelectLabel>
            {items?.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
