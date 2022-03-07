import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({
  children,
  onPress,
  style = {flex: 1},
  textStyle = {textAlign: 'center'},
}) => {
  return (
    <TouchableOpacity onPress={onPress && onPress} style={style}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
