import ClinicIcon from "@/assets/icons/ClinicIcon";
import DoctorIcon from "@/assets/icons/DoctorIcon";
import ImportantIcon from "@/assets/icons/ImportantIcon";
import i18n from "@/lang/i18n";
import { Doctor, DoctorValues } from "@/models/Doctor";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DoctorCard = ({
  doctor,
  onDelete,
}: {
  doctor: DoctorValues;
  onDelete?: () => void;
}) => {
  const router = useRouter();

  const handleEdit = (id: number | undefined) => {
    if (id) {
      router.push({
        pathname: "/Screens/NewDoctor",
        params: { id },
      });
    }
  };

  const handleDelete = (doctor: DoctorValues) => {
    Alert.alert(
      "Deleting",
      "Are you sure you want to delete " + doctor.name + "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const doctorInstance = new Doctor(doctor);
              const result = await doctorInstance.delete();

              if (result) {
                Alert.alert(i18n.t("Success"), i18n.t("Successfully Deleted"));

                if (onDelete) {
                  onDelete();
                }
              } else {
                Alert.alert(i18n.t("Error"), i18n.t("Error deleting doctor"));
              }
            } catch (error) {
              console.error("Error deleting doctor:", error);
              Alert.alert(i18n.t("Error"), i18n.t("Error deleting doctor"));
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      className="w-full bg-secondary my-2 rounded-3xl shadow-xl shadow-black"
      onPress={(e) => handleEdit(doctor.id)}
      onLongPress={(e) => handleDelete(doctor)}
    >
      <View className="relative h-16 m-1.5 ">
        <View className="absolute right-0 h-16 w-16 bg-primary rounded-full z-10 flex justify-center items-center">
          {doctor.type === "clinic" ? (
            <ClinicIcon width={34} height={34} color="#fff" />
          ) : doctor.type === "doctor" ? (
            <DoctorIcon width={34} height={34} color="#fff" />
          ) : (
            <ImportantIcon width={34} height={34} color="#fff" />
          )}
        </View>
        <View className="absolute right-8 w-3/5 h-3/5 bg-white rounded-l-full">
          <Text className="self-center my-auto text-primary text-xl font-bold">
            {doctor.name}
          </Text>
        </View>
        <View className="absolute right-8 bottom-0.5 w-3/5 h-3/5 rounded-l-full">
          <Text className="self-center mt-auto text-black text-sm font-normal">
            {doctor.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;
