import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/style';

function Button({children, onPress, mode, style}) {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={[styles.button, mode === 'flat' && styles.flat, mode === 'picker' && styles.picker]}>
                <Text style={[styles.buttonText, mode === 'flat' && styles.flatText, mode === 'picker' && styles.pickerText]}>{children}</Text>
            </View>
        </Pressable>
    </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,

    },
    flat: {
        backgroundColor: 'transparent'
    },
    picker: {
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 6,
        
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    pickerText: {
        color: GlobalStyles.colors.primary800,
        fontSize: 18
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius:4

    },

});