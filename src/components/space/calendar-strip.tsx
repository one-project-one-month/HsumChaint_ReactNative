import icons from "@assets/icons";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { cn } from "@/lib/utils";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

const CalendarStrip = () => {
  const params = useGlobalSearchParams<{ date?: string }>();

  const selectedDate = params.date ? parseISO(params.date) : new Date();
  const [viewedMonth, setViewedMonth] = useState(startOfMonth(selectedDate));
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(viewedMonth),
    end: endOfMonth(viewedMonth),
  });

  const handleMonthChange = (offset: number) => {
    setViewedMonth((prev) => (offset > 0 ? addMonths(prev, 1) : subMonths(prev, 1)));
  };

  const handleDateSelect = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    router.setParams({ date: dateStr });
  };

  return (
    <View className="gap-2 px-5 pt-4">
      {/* Month Selector */}
      <View className="flex-row items-center justify-between bg-grey-100 p-2 rounded-lg">
        <TouchableOpacity
          onPress={() => handleMonthChange(-1)}
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          className="bg-natural-white p-0.5 rounded-sm shadow-drop"
        >
          <Image className="w-6 h-6" source={icons.arrowLeft} />
        </TouchableOpacity>

        <Text variant={"label1"} weight={"semibold"} title={format(viewedMonth, "MMMM, yyyy")} />

        <TouchableOpacity
          onPress={() => handleMonthChange(1)}
          accessibilityRole="button"
          accessibilityLabel="Next month"
          className="bg-natural-white p-0.5 rounded-sm shadow-drop"
        >
          <Image className="w-6 h-6" source={icons.arrowRight} />
        </TouchableOpacity>
      </View>

      {/* Days Strip */}
      {/* Horizontal Scrollable Days */}
      <FlatList
        data={daysInMonth}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toISOString()}
        contentContainerStyle={{ gap: 8 }}
        initialNumToRender={daysInMonth.length}
        maxToRenderPerBatch={daysInMonth.length}
        renderItem={({ item }) => {
          const isSelected = isSameDay(item, selectedDate);
          return (
            <TouchableOpacity
              onPress={() => handleDateSelect(item)}
              className={cn(
                "items-center gap-1 rounded-xl py-2 px-3 min-w-12.5",
                isSelected ? "bg-orange-500" : "bg-grey-100",
              )}
            >
              <Text
                className={cn(isSelected ? "text-natural-white" : "text-grey-500")}
                variant={"label2"}
                weight={"medium"}
                title={format(item, "EEE")}
              />
              <Text
                className={cn(isSelected && "text-natural-white")}
                variant={"label1"}
                weight={"semibold"}
                title={format(item, "d")}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CalendarStrip;
