import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface ClinicFormData {
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  startDate: string;
}

const ClinicForm: React.FC = () => {
  const [form, setForm] = useState<ClinicFormData>({
    name: '',
    address: '',
    phone1: '',
    phone2: '',
    startDate: '',
  });

  const [errors, setErrors] = useState<Partial<ClinicFormData>>({});

  const handleChange = (field: keyof ClinicFormData, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  const validate = (): boolean => {
    const newErrors: Partial<ClinicFormData> = {};

    if (!form.name.trim()) newErrors.name = 'نام الزامی است.';
    if (!form.address.trim()) newErrors.address = 'آدرس الزامی است.';
    if (!form.phone1.trim()) newErrors.phone1 = 'شماره تماس الزامی است.';
    if (!form.startDate.trim()) newErrors.startDate = 'تاریخ شروع الزامی است.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert('موفقیت', 'اطلاعات با موفقیت ذخیره شد.');
      // Proceed with form submission logic
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} className="bg-white">
      <Text className="text-2xl font-bold mb-5 text-center">افزودن کلینیک جدید</Text>

      {/* Name Field */}
      <View className="mb-4">
        <Text className="text-base mb-1 text-gray-700">نام</Text>
        <TextInput
          className={`w-full px-4 py-3 text-base text-gray-900 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="مثلاً کلینیک مهر"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {errors.name && <Text className="text-red-500 mt-1 text-sm">{errors.name}</Text>}
      </View>

      {/* Address Field */}
      <View className="mb-4">
        <Text className="text-base mb-1 text-gray-700">آدرس</Text>
        <TextInput
          className={`w-full px-4 py-3 text-base text-gray-900 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="مثلاً تهران، خیابان ولیعصر"
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
        />
        {errors.address && <Text className="text-red-500 mt-1 text-sm">{errors.address}</Text>}
      </View>

      {/* Phone 1 Field */}
      <View className="mb-4">
        <Text className="text-base mb-1 text-gray-700">شماره تماس اول</Text>
        <TextInput
          className={`w-full px-4 py-3 text-base text-gray-900 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.phone1 ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="مثلاً 02112345678"
          keyboardType="phone-pad"
          value={form.phone1}
          onChangeText={(text) => handleChange('phone1', text)}
        />
        {errors.phone1 && <Text className="text-red-500 mt-1 text-sm">{errors.phone1}</Text>}
      </View>

      {/* Phone 2 Field */}
      <View className="mb-4">
        <Text className="text-base mb-1 text-gray-700">شماره تماس دوم (اختیاری)</Text>
        <TextInput
          className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="مثلاً 02187654321"
          keyboardType="phone-pad"
          value={form.phone2}
          onChangeText={(text) => handleChange('phone2', text)}
        />
      </View>

      {/* Start Date Field */}
      <View className="mb-4">
        <Text className="text-base mb-1 text-gray-700">تاریخ شروع همکاری</Text>
        <TextInput
          className={`w-full px-4 py-3 text-base text-gray-900 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="مثلاً 1404/02/28"
          value={form.startDate}
          onChangeText={(text) => handleChange('startDate', text)}
        />
        {errors.startDate && <Text className="text-red-500 mt-1 text-sm">{errors.startDate}</Text>}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onPress={handleSubmit}
      >
        <Text className="text-center text-base text-white">ذخیره اطلاعات</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ClinicForm;
