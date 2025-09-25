import { CreateUserParams, SignInParams } from "@/type";
import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  TablesDB,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.example.food",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: "68d472150036e7f91ca8",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const tablesDB = new TablesDB(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

export async function createUser({ name, email, password }: CreateUserParams) {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (!newAccount) return Alert.alert("Error", "Failed to create user");
    await signIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);
    return await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: "user",
      rowId: ID.unique(),
      data: { accountId: newAccount.$id, name, email, avatar: avatarUrl },
    });
  } catch (error) {
    console.log(error);

    throw new Error(error as string);
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    Alert.alert("Error", "Failed to login");
    throw new Error(error as string);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current user");
    const currentUser = await tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: "user",
      queries: [Query.equal("accountId", [currentAccount.$id])],
    });
    if (!currentUser) throw new Error("No user data found");
    return currentUser.rows[0];
  } catch (error) {
    console.log(error);

    Alert.alert("Error", "Failed to fetch user");
    throw new Error(error as string);
  }
}
