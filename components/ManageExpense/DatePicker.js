import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from "../UI/Button";
import { getDateFormatted } from "../../util/date";
import { GlobalStyles } from "../../constants/style";

function DatePicker({showCalendar, inputs, handleCalendar, handleDateChanged}) {
  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
          <Text style={styles.datePickerLabel}>Fecha</Text>
          <Button style={styles.datePicker} mode="picker" onPress={handleCalendar}>
            {getDateFormatted(inputs.date.value)}
          </Button>
        </View>

        {showCalendar &&
          <DateTimePicker
            testID="dateTimePicker"
            value={inputs.date.value}
            mode={'date'}
            is24Hour={true}
            onChange={handleDateChanged}
          />
        }
    </View>
  )
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  datePicker: {
    marginTop: 6
  },
  datePickerLabel: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
  }
});