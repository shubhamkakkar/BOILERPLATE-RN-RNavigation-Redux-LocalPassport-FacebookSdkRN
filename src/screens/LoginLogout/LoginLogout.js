import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import LoginSignup from '../../Components/LoginLogout';
import FacebookAuth from "../../Components/FacebookAuth/FacebookAuth"
const { width } = Dimensions.get('window');

export default class App extends React.Component {
  componentDidUpdate = () => console.log(this.state)

  state = {
    active: 0,
    xTabOne: 0,
    xTabTwo: 0,
    translateX: new Animated.Value(0),
    translateXTabOne: new Animated.Value(0),
    translateXTabTwo: new Animated.Value(width),
    formInput: [
      {
        label: "Name"
      },
      {
        label: "Email"
      }, {
        label: "Password"
      }
    ],
    credentials: {}
  };


  handleSlide = type => {
    let {
      active,
      xTabOne,
      xTabTwo,
      translateX,
      translateXTabOne,
      translateXTabTwo,
    } = this.state;

    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true
    }).start();
    if (active === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }).start(),
      ]);
    }
  };


  loginSubmit = credentials => {
    const validationCheck = Object.keys(credentials).length
    if (validationCheck) {
      const [name, email, password] = [...Object.keys(credentials).map(key => credentials[key])]
      if (name.length && email.length && password.length) {
        const newCredential = { name, email, password }
        console.log(newCredential)
        this.setState({ credentials: newCredential })
      } else {
        alert("Fill in all the fields first")
      }
    } else {
      alert("Fill in all the fields first")
    }

  }

  signupSubmit = credentials => {
    const validationCheck = Object.keys(credentials).length

    if (validationCheck) {
      const [name, email, password, confirmPassword] = [...Object.keys(credentials).map(key => credentials[key])]
      if (name.length && email.length && password.length && confirmPassword.length) {
        if (password === confirmPassword) {
          const newCredential = { name, email, password, confirmPassword }
          this.setState({ credentials: newCredential })
        } else {
          alert("Passwords dont match")
        }
      } else {
        alert("Fill in all the fields first")
      }
    } else {
      alert("Fill in all the fields first")
    }
  }

  getCredentials = credentials => this.setState({ credentials })
  resetCredentials = () => this.setState({ credentials: {} })


  render() {
    let {
      xTabOne,
      xTabTwo,
      translateX,
      active,
      translateXTabOne,
      translateXTabTwo,
    } = this.state;
    return (
      <View style={{
        flexGrow: 1,
      }}>
        <View
          style={{
            flex: 1,
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              marginBottom: 20,
              height: 36,
              position: 'relative',
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                width: '50%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: '#007aff',
                borderRadius: 4,
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#007aff',
                borderRadius: 4,
                borderRightWidth: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              onLayout={event =>
                this.setState({
                  xTabOne: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 0 }, () => this.handleSlide(xTabOne))
              }>
              <Text
                style={{
                  color: active === 0 ? '#fff' : '#007aff',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#007aff',
                borderRadius: 4,
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onLayout={event =>
                this.setState({
                  xTabTwo: event.nativeEvent.layout.x,
                })
              }
              onPress={() =>
                this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))
              }>
              <Text
                style={{
                  color: active === 1 ? '#fff' : '#007aff',
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{
              flexGrow: 1,
            }}
            contentContainerStyle={{ flex: 1 }}
            keyboardDismissMode="interactive"
          >
            {active === 0 ? (
              <Animated.View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  transform: [
                    {
                      translateX: translateXTabOne,
                    },
                  ],
                }
                }>
                <LoginSignup submit={this.loginSubmit} formInput={this.state.formInput} ButtonTitle="Login" />
              </Animated.View>
            ) : (
                <Animated.View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    transform: [
                      {
                        translateX: translateXTabTwo,
                      }
                    ],
                  }}>
                  <LoginSignup submit={this.signupSubmit} formInput={[...this.state.formInput, { label: "Confirm Password" }]} ButtonTitle="Signup" />
                </Animated.View>
              )}
          </ScrollView>
        </View>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10
        }}>
          <FacebookAuth getCredentials={this.getCredentials} resetCredentials={this.resetCredentials} />
        </View>
      </View>
    );
  }
}