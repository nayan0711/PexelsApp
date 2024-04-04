import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImagePath } from '../utils/ImagePath';

const VideoItem = ({ item }) => {
  console.log(item);
  const navigation = useNavigation();

  const navigateToViewVideo = () => {
    navigation.navigate("Video", { data: item });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={{ width: 300, height: 200, borderRadius: 10, marginLeft: 20 }}
      onPress={()=>{navigateToViewVideo()}}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          backgroundColor: 'rgba(0,0,0,.5)',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={ImagePath.videoIcon}
          style={{ width: 30, height: 30, tintColor: 'white' }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoItem;
