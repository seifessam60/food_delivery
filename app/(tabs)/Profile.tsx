import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import InfoField from "@/components/InfoField";
import { images } from "@/constants";
import { logOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header */}
      <CustomHeader title="Profile" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6"
      >
        {/* Avatar + Edit */}
        <View className="items-center mt-6">
          <View className="profile-avatar">
            <Image
              source={{ uri: user?.avatar }}
              className="w-full h-full rounded-full"
            />
            <TouchableOpacity className="profile-edit">
              <Image
                source={images.pencil}
                className="size-5 color-white"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <Text className="h3-bold mt-4">{user!.name}</Text>
          <Text className="paragraph-medium text-gray-500">
            Mobile & Full Stack Developer
          </Text>
        </View>

        {/* Profile Fields */}
        <View className="my-10 space-y-4">
          <InfoField
            icon={images.user}
            label={"Full Name"}
            value={user!.name}
          />
          <InfoField
            icon={images.envelope}
            label={"Email"}
            value={user!.email}
          />
          <InfoField
            icon={images.phone}
            label={"Phone Number"}
            value={"+201144654953"}
          />
          <InfoField
            icon={images.location}
            label={"Address 1 - (Home)"}
            value={"123 Main Street, Springfield, IL 62704"}
          />
          <InfoField
            icon={images.location}
            label={"Address 2 - (Work)"}
            value={"123 Main Street, Springfield, IL 62704"}
          />
        </View>

        {/* Logout Button */}
        <View className="flex gap-5">
          <CustomButton
            title="Edit Profile"
            style="bg-[#FE8C000D] border border-[#FE8C00]"
            textStyle="!text-[#FE8C00] paragraph-bold"
          />
          <CustomButton
            onPress={() => {
              logOut();
            }}
            leftIcon={
              <Image
                source={images.logout}
                className="size-5 mr-2"
                resizeMode="contain"
              />
            }
            title="Logout"
            style="bg-[#F141410D] border border-[#F14141] flex-center"
            textStyle="!text-[#F14141] paragraph-bold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
