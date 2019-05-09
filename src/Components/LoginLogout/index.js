import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from "react-native"

export default props => {
    let credentials = []

    handleInput = (text, index) => {
        if (text.trim().length) {
            credentials = { ...credentials, [index]: text }
        } else {
            credentials = { ...credentials, [index]: "" }
        }
    }
    return (
        <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
            {
                props.formInput.map(({ label }, index) => (
                    <View key={label}>
                        <TextInput
                            blurOnSubmit={true}
                            clearTextOnFocus={true}
                            placeholder={label}
                            secureTextEntry={
                                label === "Password" || label === "Confirm Password"
                                    ? true
                                    : false
                            }
                            onChangeText={text => handleInput(text, index)}
                            style={{ textAlign: "center" }}
                        />
                    </View>
                ))
            }
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => props.submit(credentials)}
                    style={{ borderColor: "#007aff", borderWidth: 1, padding: 5, borderRadius: 5 }}>
                    <Text style={{ color: "#007aff" }}> {props.ButtonTitle} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}