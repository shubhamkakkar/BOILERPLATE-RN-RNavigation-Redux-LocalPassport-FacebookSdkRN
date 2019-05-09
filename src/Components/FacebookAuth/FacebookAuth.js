import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import { LoginManager, AccessToken } from 'react-native-fbsdk'


export default props => {
  setUserCredentials = accessToken => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + accessToken)
      .then(response => response.json())
      .then(({ name, email, id }) => {
        const credentials = { name, email, id }
        props.getCredentials(credentials)
        //post request to mongoDB
      })
      .catch(er => console.log(er))
  }
  resetUserCredentials = () => {
    props.ressetCredentials()
  }

  handleFacebookLogin = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          alert('Login cancelled')
        } else {
          AccessToken.getCurrentAccessToken()
            .then(({ accessToken }) => setUserCredentials(accessToken))
        }
      })
      .catch(error => alert('Login fail with error: ' + error))
  }

  return <TouchableOpacity
    onPress={handleFacebookLogin}
    style={{ padding: 10, borderRadius: 5, backgroundColor: "#007aff" }}
  >
    <View style={{ flexDirection: 'row' }}>
      <Entypo name="facebook-with-circle" size={20} color="white" />
      <Text style={{ color: "white", marginLeft: 5 }}>
        Continue with fb
    </Text>
    </View>
  </TouchableOpacity>
}