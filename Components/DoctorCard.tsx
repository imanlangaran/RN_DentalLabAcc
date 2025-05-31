import ClinicIcon from "@/assets/icons/ClinicIcon";
import DoctorIcon from "@/assets/icons/DoctorIcon";
import ImportantIcon from "@/assets/icons/ImportantIcon";
import { DoctorValues } from "@/models/Doctor";
import { Text, View } from "react-native";

const DoctorCard = ({ doctor }: {
  doctor: DoctorValues
}) => {
  return (
    <View className='w-full bg-secondary my-2 rounded-3xl shadow-xl shadow-black'>
      <View className='relative h-16 m-1.5 '>
        <View className='absolute right-0 h-16 w-16 bg-primary rounded-full z-10 flex justify-center items-center'>
          {doctor.type === 'clinic' ? <ClinicIcon width={34} height={34} color="#fff" />
            : doctor.type === 'doctor' ? <DoctorIcon width={34} height={34} color="#fff" />
              : <ImportantIcon width={34} height={34} color="#fff" />
          }
        </View>
        <View className='absolute right-8 w-3/5 h-3/5 bg-white rounded-l-full'>
          <Text className='self-center my-auto text-primary text-xl font-bold'>
            {doctor.name}
          </Text>
        </View>
        <View className='absolute right-8 bottom-0.5 w-3/5 h-3/5 rounded-l-full'>
          <Text className='self-center mt-auto text-black text-sm font-normal'>
            {doctor.type}
          </Text>
        </View>
      </View>

    </View>
  )
}

export default DoctorCard;