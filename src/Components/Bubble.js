//import liraries
import React, {Component, useRef} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {COLORS} from '../Theme/Color';
import {Fonts} from '../Theme/Fonts';
import {moderateScale, verticalScale} from '../Theme/Dimentions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// create a component

const MenuItem = props => {
  const Icon = props.iconPack ?? Feather;
  return (
    <MenuOption onSelect={props.onSelect}>
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuItemText}>{props.text}</Text>
        <Icon name={props.icon} size={15} color={COLORS.primary} />
      </View>
    </MenuOption>
  );
};
const Bubble = props => {
  const {message, type} = props;
  const bubbleStyles = {...styles.container};
  const textStyles = {...styles.textStyle};
  const wrapperStyle = {...styles.wrapperStyle};
  let Container = View;
  const menuRef = useRef(null);
  const id = useRef(uuid.v4());

  switch (type) {
    case 'system':
      textStyles.color = '#65644a';
      bubbleStyles.backgroundColor = COLORS.beige;
      bubbleStyles.alignItems = 'center';
      bubbleStyles.marginTop = verticalScale(10);
      break;
    case 'error':
      textStyles.color = COLORS.white;
      bubbleStyles.backgroundColor = COLORS.red;
      bubbleStyles.alignItems = 'center';
      bubbleStyles.marginTop = verticalScale(10);
      break;

    case 'own':
      wrapperStyle.justifyContent = 'flex-end';
      bubbleStyles.backgroundColor = COLORS.primaryLight;
      bubbleStyles.maxWidth = '90%';
      Container = TouchableWithoutFeedback;
      break;
    case 'other':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyles.maxWidth = '90%';
      Container = TouchableWithoutFeedback;
      bubbleStyles.backgroundColor = '#e6e6e6';
      break;

    default:
      break;
  }

  const copyToClipboard = message => {
    Clipboard.setString(message);
  };
  return (
    <View style={wrapperStyle}>
      <Container
        style={{width: '100%'}}
        onLongPress={() => {
          menuRef.current.props.ctx.menuActions.openMenu(id.current);
        }}>
        <View style={bubbleStyles}>
          <Text style={textStyles}>{message}</Text>
          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
              <MenuItem
                text="Copy"
                onSelect={() => {
                  copyToClipboard(message);
                }}
                icon="copy"
              />
              <MenuItem
                icon={'star-o'}
                iconPack={FontAwesome}
                text="Star message"
                onSelect={() => console.log('Start MEssage')}
              />
              <MenuItem
                text="Delete"
                onSelect={() => console.log('Delete')}
                icon="trash"
              />
              <MenuItem
                text="Edit"
                onSelect={() => console.log('Edit')}
                icon="edit"
              />
            </MenuOptions>
          </Menu>
        </View>
      </Container>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(6),
    padding: moderateScale(5),
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  textStyle: {
    color: COLORS.textColor,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    letterSpacing: 0.3,
  },
  menuItemContainer: {
    flexDirection: 'row',
    padding: moderateScale(5),
  },
  menuItemText: {
    flex: 1,
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    fontSize: moderateScale(12),
  },
});

//make this component available to the app
export default Bubble;
