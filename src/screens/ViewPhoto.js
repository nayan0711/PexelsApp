import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemeProvider, useNavigation, useRoute } from '@react-navigation/native'
import { BLACK, THEME_COLOR, WHITE } from '../utils/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Share from 'react-native-share';
import RNFS from 'react-native-fs'
import { request, PERMISSIONS } from 'react-native-permissions';
export default function ViewPhoto() {
  const route=useRoute()
  const navigation=useNavigation()
  
  const downloadImage = async () => {
    try {
      const permissionGranted = await askForPermissions(
        Platform.select({
          android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        })
      );

      if (permissionGranted === 'granted') {
        const date = new Date().getTime();
        const path = RNFS.DownloadDirectoryPath + '/image_' + date + '.jpg';

        const downloadResult = await RNFS.downloadFile({
          fromUrl: route.params.data.src.original,
          toFile: path,
        }).promise;

        if (downloadResult.statusCode === 200) {
          console.log('Image downloaded successfully');
        } else {
          console.log('Failed to download image');
        }
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

const shareImage = () => {
  Share.open({
    title: 'Image Share',
    url: route.params.data.src.original,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
};

  return (
    <View style={styles.container}>
     <StatusBar barStyle={'dark-content'} backgroundColor={THEME_COLOR}/>
     <Image
      source={{uri: route.params.data.src.original}}
      style={styles.photo}/>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              downloadImage();
            }}>
            <Image
              source={require('../images/download.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backBtn, {marginLeft: 20}]}
            onPress={() => {
              shareImage()
            }}>
            <Image
              source={require('../images/share.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        </View>
        <Text style={styles.photographer}>{'PhotoGrapher: '+route.params.data.photographer}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'absolute',
    marginTop: 55,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  photographer: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    fontWeight:'500',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor:THEME_COLOR,
    padding:8,
    borderRadius:8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowColor: '#000',
    shadowRadius: 2,
  },
})