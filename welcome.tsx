import {Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import Swiper from "react-native-swiper"

const Onboarding = () => {
    return (
        <SafeAreaView className="flex h-full item-center justify-between bg-white">
            <TouchableOpacity
            onPress={() => {
                ReadableStreamDefaultController.replace("/(auth)/sign-up");
            }}
            className = "w-full flex justify-end items-end p-5 "
            >
                <Text className="text-black text-md font-JakartaBold">Skip</Text>
            </TouchableOpacity>
            <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]">
                activeDot={View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0]"}


            </View>}
            ></Swiper>
        </SafeAreaView>
    );
};

export default Onboarding;

