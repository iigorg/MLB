import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Animated } from 'react-native';
import { ListItem } from 'react-native-elements'
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'

import MLBGamedayApi from './../api/MLBGamedayApi'
import { DateBar } from './../components/app'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)
export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Games',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isExpanded: false,
      date: new Date(2018, 4, 24),
      games: [],
    }; 

    // Setup animation values...
    this.chevronRotation = new Animated.Value(0);
    this.listItemHeight = new Animated.Value(0);
  }

  componentDidMount(){
    this.getGamesForDay();
  }

  getGamesForDay = () => {
    this.setState({isLoading: true});

    const year = this.state.date.getFullYear();
    const month = this.state.date.getMonth();
    const day = this.state.date.getDay();

    // Call API to get the list of games...
    MLBGamedayApi.getListOfGamesForDay(year, month, day).then(function(urls) {
    this.setState({games: urls});
    this.setState({isLoading: false});
    }.bind(this));    
  } 

  onDateChange  =(date) => {
    console.log(date)
    this.setState({date});
    this.getGamesForDay();
  } 

  onListItemPress = () => {
    // Rotate the chevron...
    let chevronToValue = (this.state.isExpanded) ? 0 : 1;   
    Animated.timing(this.chevronRotation, {
      toValue: chevronToValue, duration: 200
    }).start();

     // Expend/Collapse the list item...
     let heightToValue = (this.state.isExpanded) ? 0 : 100;
      Animated.timing(this.listItemHeight, {
            toValue: heightToValue, duration: 200
    }).start();

     // Toggle the isExpended state...
    this.setState({isExpanded: !this.state.isExpanded}); 
  }

  getChevronRotateStyle = () => {
    // Setup the animated...
    const rotate = this.chevronRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });

    //Return the style...
    return {transform: [{ rotate: rotate}] };
  }

  renderSubtitle = () => {
    return (
      <Animated.View style={{height: this.listItemHeight}}>
        <Text>Subtitle</Text>
      </Animated.View>
    )
  }

  renderItem = ({item}) => {
  const title = item.awayTeamName 

  const chevronStyle = this.getChevronRotateStyle()
  const subtitle = this.renderSubtitle()
    return (       
        <ListItem
          key={item.key}
          title={item.awayTeamName}     
          onPress={this.onListItemPress}  
          subtitle={subtitle}

          rightIcon={
            <AnimatedIcon 
              name="chevron-right" 
              size={30} 
              color="gray"
              style={[ chevronStyle, { alignSelf: "flex-start" }]}
            />
          }   
        />
    )
  }  
 
  render() {
    // If loading, display activiti indicator...
    if(this.state.isLoading){
      return <ActivityIndicator animating={true} size="large" style={{paddingTop:40}} />
    } 

    return (
      <View style={styles.container}>
         <DateBar style={{paddingTop: 10}} onDateChange={this.onDateChange} date={this.state.date} />
          <FlatList 
          data={this.state.games}
          renderItem={this.renderItem}
         />
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
