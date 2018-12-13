import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements'
import MLBGamedayApi from './../api/MLBGamedayApi'
import { DateBar } from './../components/app'

export default class GameScreen extends React.Component {
  static navigationOptions = {
    title: 'Games',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      date: new Date(2018, 4, 24),
      games: [],
    };    
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

  renderItem = ({item}) => {
  const title = item.awayTeamName 
    return (       
        <ListItem
          key={item.key}
          title={item.awayTeamName}          
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
