import { images } from "@/constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query || "");

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search For your Favorite Food"
        onChangeText={handleSearch}
        placeholderTextColor={"#A0A0A0"}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => {
          router.setParams({ query });
        }}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor={"#5D5F6D"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
