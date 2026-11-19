import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function HouseDropdown({
  value,
  setValue,
  placeholder = "Select House Number",
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}) {
  const houseNumbers = Array.from({ length: 64 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  return (
    <View style={{ padding: 16 }}>
      <Dropdown
        data={houseNumbers}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => setValue(item.value)}
      />
    </View>
  );
}
