import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class DateBar extends React.Component {

  static defaultProps = {
    date: new Date(),
    onDateChange: function(date) { },
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      date: nextProps.date
    };
  }

  constructor(props) {
    super(props);
    this.state = { date: this.props.date };
  }

  // Occurs when the left arrow is pressed...
  onLeftArrowPress = () => {
    var newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() - 1);
    this.setState({ date: newDate });

    this.props.onDateChange(newDate);
  }

  // Occurs when the right arrow is pressed...
  onRightArrowPress = () => {
    var newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState({ date: newDate });

    this.props.onDateChange(newDate);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLeftArrowPress}>
          <Icon name="chevron-left" style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.date}>{this.state.date.toDateString()}</Text>

        <TouchableOpacity onPress={this.onRightArrowPress}>
          <Icon name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, },
  date: { paddingTop: 8, fontWeight: "bold", },
  icon: { fontSize: 30, color: "gray" },
});