import { Feather } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import React from 'react'
import { Text, View } from 'react-native';
import DateTimePicker, { CalendarComponents, CalendarDay, DateType, useDefaultClassNames } from 'react-native-ui-datepicker'

cssInterop(Feather, {
  className: {
    target: 'style',
  },
});


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

const Calendar = ({
  selectedDate,
  setSelectedDate,
}:{
  selectedDate: DateType;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>
}) => {


  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      // className='bg-red-200 '
      mode="single"
      date={selectedDate}
      onChange={({ date }) => setSelectedDate(date)}
      // styles={defaultStyles}
      classNames={{
        ...defaultClassNames,
        // header: 'border-b border-blue-300 mb-3',

        // day_cell: 'p-1',
        day: 'rounded-full aspect-square',
        day_label: 'text-lg',

        outside_label: 'text-gray-400',

        today: 'border border-primary',

        // weekdays: 'pb-3',
        weekdays: 'pt-2 pb-3 my-2 mx-1 bg-primary/20 rounded-3xl',
        weekday_label: 'text-xl ',
        // weekday:'bg-blue-200',


        selected: 'bg-primary',
        selected_label: 'text-white text-xl',

        year: 'rounded-full',
        year_label: 'text-lg',

        selected_year_label: 'text-white',
        // selected_year: 'bg-red-300',
        // years: 'text-xl', ?

        year_selector_label: 'text-xl font-semibold px-5 py-1',

        month: 'rounded-full',
        month_label: 'text-xl',

        selected_month_label: 'text-white',

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
    // initialView='month'
    // disabledDates={(date) => [0, 6].includes(dayjs(date).day())} // Disable weekends

    />
  )
}


const Day = ({ day }: { day: CalendarDay }) => {
  const { isSelected, isToday, isCurrentMonth } = day;

  // let isHoliday = isHoliday(day);

  return (
    <View
      className='items-center justify-center w-full h-full aspect-square p-1'
    >
      {/* <View 
      className={cn('flex w-full h-full items-center justify-center rounded-full ',
        isSelected && ' bg-primary rounded-full ',
        isToday && ' border border-primary rounded-full ')}
        > */}
      <View
        className={`flex w-full h-full items-center justify-center border rounded-full ${isSelected ? ' bg-primary' : 'bg-transparent'} ${isToday ? 'border-primary ' : 'border-transparent'} `}
      >

        <Text
          className={` text-xl 
          ${isHoliday(day) && ' text-red-600 '}
          ${!isCurrentMonth && 'opacity-30'} 
          ${isSelected ? ' text-white ' : ' text-black '}`
          }
        >
          {day.text}
          {/* {isHoliday(day) && '-'} */}
        </Text>
      </View>
    </View >
  );
};

function isHoliday(day: CalendarDay) {
  if (day.dayOfMonth! % 7 === 0) {
    return true;
  }
  return false;
}

export default Calendar