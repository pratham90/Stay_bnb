
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';

type CalendarProps = {
        onDayPress?: (day: DateObject) => void;
        markedDates?: { [date: string]: any };
        style?: object;
};

export function AppCalendar({ onDayPress, markedDates, style }: CalendarProps) {
        return (
                <View style={[styles.container, style]}>
                        <Calendar
                                onDayPress={onDayPress}
                                markedDates={markedDates}
                                theme={{
                                        selectedDayBackgroundColor: '#2dd4bf',
                                        todayTextColor: '#2dd4bf',
                                        arrowColor: '#2dd4bf',
                                }}
                        />
                </View>
        );
}

const styles = StyleSheet.create({
        container: {
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: '#fff',
                elevation: 2,
        },
});

