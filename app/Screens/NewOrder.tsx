import { View, Text, Modal, TouchableOpacity, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker, { CalendarComponents, CalendarDay, DateType, useDefaultClassNames, useDefaultStyles } from 'react-native-ui-datepicker';
import Feather from '@expo/vector-icons/Feather';
import { cssInterop } from 'nativewind';

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});

const NewOrder = () => {
  const [showDatePicker, setShowDatePicker] = useState(true);


  const defaultStyles = useDefaultStyles();
  const defaultClassNames = useDefaultClassNames();
  const [selected, setSelected] = useState<DateType>();

  const components: CalendarComponents = {
    IconPrev: (
      // <Feather name="chevron-right" size={22} color="#2260FF" />
      <Feather name="chevron-right" size={22} className='text-primary' />
    ),
    IconNext: (
      // <Feather name="chevron-left" size={22} color="#2260FF" />
      <Feather name="chevron-left" size={22} className='text-primary' />
    ),
    Day: (day: CalendarDay) => <Day day={day} />,
  };

  return (
    <View>

      <Text
        className='p-10 rounded-full bg-slate-300'
        onPress={() => setShowDatePicker(true)}
      >show modal</Text>


      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
      >
        <TouchableOpacity className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => { setShowDatePicker(false) }}>
          <View className="bg-white rounded-3xl p-2 w-11/12 flex items-center justify-center">
            <DateTimePicker
              // className='bg-red-200 '
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              // styles={defaultStyles}
              classNames={{
                ...defaultClassNames,
                // header: 'border-b border-blue-300 mb-3',

                // day_cell: 'p-1',
                day: 'rounded-full aspect',
                day_label: 'text-lg',

                outside_label: 'text-gray-400',

                today: 'border border-primary',

                // weekdays: 'pb-3',
                weekdays: 'pt-2 pb-3 my-2 mx-1 bg-primary/20 rounded-3xl',
                weekday_label: 'text-xl ',
                // weekday:'bg-blue-200',


                selected: 'bg-primary',
                selected_label: 'text-white text-xl',

                year_selector_label: 'text-xl font-semibold px-5 py-1',

                month_selector_label: 'text-xl font-semibold px-5 py-1',
                // year_label: 'text-xl',
              }}


              locale='fa'
              numerals='arabext'
              calendar='jalali'
              showOutsideDays
              firstDayOfWeek={6}
              // weekdaysHeight={36}
              weekdaysHeight={44}
              components={components}
            />
          </View>

        </TouchableOpacity>

      </Modal>
    </View>
  )
}

const Day = ({ day }: { day: CalendarDay }) => {
  const { isSelected, isToday, isCurrentMonth } = day;


  return (
    <View
      className={`flex w-full h-full flex-1 items-center justify-center rounded-full aspect-square p-1 `}
    >
      <View className={`flex w-full h-full items-center justify-center rounded-full 
        ${isSelected && ' bg-primary rounded-full '} 
        ${isToday && ' border border-primary rounded-full '}`}>

        <Text
          className={`
          ${!isCurrentMonth && 'opacity-30'} 
          ${isSelected && 'text-slate-950 dark:text-slate-100'}`
          }
        >
          {day.text}
        </Text>
      </View>
    </View>
  );
};

// has a bug 
// when changing the date more than two times rounded shape goes away and it becomes square shape

export default NewOrder