import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/lib/store/auth.store";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row my-5 w-full">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Egypt</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => (
          <View>
            <Pressable
              className={cn(
                "offer-card",
                index % 2 === 0 ? "flex-row-reverse" : "flex-row"
              )}
              style={{ backgroundColor: item.color }}
              android_ripple={{ color: "#fffff22" }}
            >
              {({ pressed }) => (
                <Fragment>
                  <View className="h-full w-1/2 ">
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      className="size-full"
                    />
                  </View>
                  <View
                    className={cn(
                      "offer-card__info",
                      index % 2 === 0 ? "pl-10" : "pr-10"
                    )}
                  >
                    <Text className="h1-bold text-white leading-tight">
                      {item.title}
                    </Text>
                    <Image
                      source={images.arrowRight}
                      className="size-10"
                      resizeMode="contain"
                      tintColor={"#FFFFFF"}
                    />
                  </View>
                </Fragment>
              )}
            </Pressable>
          </View>
        )}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
