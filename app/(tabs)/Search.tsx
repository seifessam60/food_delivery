import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category, MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const { data, loading, refetch } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View
              className={`flex-1 max-w-[48%] ${!isFirstRightColItem ? "mt-10" : "mt-0"}`}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find Your Favorite Food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />

            <Filter categories={categories as unknown as Category[]} />
          </View>
        )}
        ListEmptyComponent={() =>
          !loading && (
            <View className="flex items-center gap-20 my-5">
              <Image
                source={images.emptyState}
                className="w-full h-full max-w-[172px] max-h-[128px]"
                resizeMode="contain"
              />
              <View className="gap-4">
                <Text className="text-center h3-bold text-dark-100">
                  Nothing matched your search
                </Text>
                <Text className="text-center text-[#878787] paragraph-medium">
                  Try a different search term or check for typos.
                </Text>
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
