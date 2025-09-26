import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

const InfoField = ({
  icon,
  label,
  value,
}: {
  icon: ImageSourcePropType;
  label: string;
  value: string;
}) => {
  return (
    <View className="profile-field gap-3">
      <View className="profile-field__icon">
        <Image source={icon} className="size-5" />
      </View>
      <View className="flex items-start">
        <Text className="text-sm text-[#6A6A6A] font-medium leading-6">
          {label}
        </Text>
        <Text className="paragraph-semibold text-[#181C2E]">{value}</Text>
      </View>
    </View>
  );
};

export default InfoField;
