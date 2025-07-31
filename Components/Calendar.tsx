import { Colors } from '@/styles';
import { Feather } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import React from 'react'
import { Text, View } from 'react-native';
import DateTimePicker, { CalendarComponents, CalendarDay, DateType, useDefaultClassNames, useDefaultStyles } from 'react-native-ui-datepicker'

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
}: {
  selectedDate: DateType;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateType>>
}) => {


  // const defaultClassNames = useDefaultClassNames();
  const defaultStyles = useDefaultStyles();
  const className = 'text-white text-xl';
  return (
    <DateTimePicker
      // className='bg-red-200 '
      mode="single"
      date={selectedDate}
      onChange={({ date }) => setSelectedDate(date)}
      styles={{
        ...defaultStyles,

        day: {
          borderRadius: 999,
          aspectRatio: 1 / 1,
        },
        day_label: {
          fontSize: 18,
          lineHeight: 28,
        },

        outside_label: {
          color: Colors.gray[500]
        },

        today: {
          borderWidth: 1,
          borderColor: Colors.primary,
        },

        weekdays: {
          paddingTop: 2,
          paddingBottom: 6,

          marginHorizontal: 8,
          marginVertical: 4,

          backgroundColor: Colors.primary + "14",

          borderRadius: 24,

          fontSize: 18,
          lineHeight: 28,
        },

        weekday_label: {
          fontSize: 20,
          lineHeight: 28,
        },

        selected: {
          color: Colors.primary,
        },
        selected_label: {
          fontSize: 20,
          lineHeight: 28,
          color: Colors.white,
        }
      }}
      /*
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
      */

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
        // className={`flex w-full h-full items-center justify-center border rounded-full ${isSelected ? ' bg-primary' : 'bg-transparent'} ${isToday ? 'border-primary ' : 'border-transparent'} `}
        className={`flex w-full h-full items-center justify-center border rounded-full ${isSelected ? ' bg-primary' : 'bg-transparent'} border-transparent `}
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