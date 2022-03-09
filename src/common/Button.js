import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({
  children,
  onPress,
  style,
  textStyle = {
    textAlign: 'center',
    fontSize: 20,
    color: style ? 'white' : 'black',
  },
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
