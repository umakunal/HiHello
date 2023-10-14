//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ImagePath} from '../Theme/ImagePath';
import {moderateScale} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchImagePicker, uploadImageAsync} from '../Utils/ImagePickerHelper';
import {updateSignedInUserData} from '../Utils/Actions/AuthAction';
import {updateLoggedInUserData} from '../Redux/authSlice';
import {useDispatch} from 'react-redux';

// create a component
const ProfileImage = props => {
  const dispatch = useDispatch();
  const source = props.uri ? {uri: props.uri} : ImagePath.empty;
  const userId = props?.userId;
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;
      console.log('tempUri', tempUri);
      //Upload the Image
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri);
      setIsLoading(false);
      console.log('uploadUrl', uploadUrl);
      if (!uploadUrl) {
        throw new Error('Could not upload image');
      }
      const newData = {profilePicture: uploadUrl};
      await updateSignedInUserData(userId, newData);
      dispatch(updateLoggedInUserData({newData}));
      setImage({uri: uploadUrl});
    } catch (error) {
      console.log(' error occurred while uploading image ', error);
      setIsLoading(false);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : (
        <Image
          source={image}
          style={{
            ...styles.image,
            ...{width: props.size, height: props.size},
          }}
        />
      )}
      <View style={styles.edit}>
        <FontAwesome
          name="pencil"
          size={moderateScale(15)}
          color={COLORS.grey}
        />
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  image: {
    borderRadius: moderateScale(50),
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.lightGrey,
    borderRadius: moderateScale(20),
    padding: moderateScale(8),
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ProfileImage;
