import React from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';

import MLBGamedayApi from './../api/MLBGamedayApi';

export default class VideosScreen extends React.Component {

  constructor(props) {
    super(props);

    this.item = this.props.navigation.getParam("item", { });
    this.state = {
      isLoading: false,
      videoData: [],
    }
  }

  componentDidMount() {
    this.getVideoData();
  }

  getVideoData = () => {
    this.setState({isLoading: true});
    MLBGamedayApi.getVideoData(this.item.url).then(function(data) {
      this.setState({videoData: data});
      this.setState({isLoading: false});
    }.bind(this));
  }

  renderVideoData() {
    return this.state.videoData.map(function(video) {
      return (
        <View key={video.id}>
          <VideoPlayer
            videoProps={{
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: { uri: video.videoURL},
            }}
            isPortrait={true}
            playFromPositionMillis={0}
          />
          <Text style={styles.bigblurb}>{video.bigblurb}</Text>
        </View>
      );
    });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator animating={true} size="large" style={{paddingTop:20}} />
    }

    return (
      <ScrollView style={styles.container}>
        {this.renderVideoData()}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: { },
  bigblurb: { paddingHorizontal: 10, paddingVertical: 10 },
})