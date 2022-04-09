
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SMS from "expo-sms"; 

export const Sender =  props => {
  var numbers = ["+420732428076", "+420606032398"];
  const [SMSstatus, setSmsstatus] = useState(null)
  const smsSender = async () => {
    try {
      const status = await SMS.sendSMSAsync(
        numbers,
        'you up?'
      )
      let result;
      result = setSmsstatus("Status: SMS " + status.result)

    } catch (error) {
      console.log(error)
    }


  };
  return (
    <View style={styles.container}>
      <Button onPress={smsSender} title="Send SMS" />


      {SMSstatus !== null &&
        <View style={{ borderWidth: 2, borderColor: 'black', margin: 20, padding: 10 }}>
          <Text>{SMSstatus}</Text>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Sender;