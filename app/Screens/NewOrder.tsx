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
    // Day: (day: CalendarDay) => <Day day={day} />,
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
          <View className="bg-white rounded-3xl p-2 w-11/12 ">
            <DateTimePicker
              // className='bg-red-200 '
              mode="single"
              date={selected}
              onChange={({ date }) => setSelected(date)}
              // styles={defaultStyles}
              classNames={{
                ...defaultClassNames,
                // header: 'border-b border-blue-300 mb-3',

                day_cell: 'p-1',
                day: 'rounded-full',
                day_label: 'text-lg',

                outside_label: 'text-gray-400',

                today: 'border border-primary',

                // weekdays: 'pb-3',
                weekdays: 'pt-2 pb-3 my-2 mx-1 bg-blue-500/10 rounded-xl',
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

// const Day = ({ day }: {day:CalendarDay}) => {
//   const { isSelected, isToday, isCurrentMonth } = day;
//   const length =
//     day.number % 3 === 0
//       ? 1
//       : day.number % 4 === 2
//         ? 2
//         : day.number % 5 === 0
//           ? 3
//           : 0;


//   return (
//     <View
//       className={cn(
//         'relative w-full flex-1 items-center justify-center rounded border border-transparent pb-2',
//         isSelected &&
//           'border-dashed border-pink-200 bg-pink-50 dark:border-solid dark:border-slate-800 dark:bg-slate-800'
//       )}
//     >
//       <Text
//         className={cn(
//           'font-archivo text-foreground',
//           !isCurrentMonth && 'opacity-30',
//           isSelected && 'text-slate-950 dark:text-slate-100'
//         )}
//       >
//         {day.text}
//       </Text>
//     </View>
//   );
// };

export default NewOrder