
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SMS from "expo-sms"; 
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
export const Sender =  props => {
  var numbers = ["+420732428076", "+420606032398"];
  const [SMSstatus, setSmsstatus] = useState(null)
  const showFirstContactAsync = async () => {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
  
    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    else {
      const contacts = await Contacts.getContactsAsync({
      
        fields: [
          Contacts.PHONE_NUMBERS,
          Contacts.EMAILS,
        ], 
        pageSize: 10,
        pageOffset: 0,
      });
      try {
        if (contacts.total > 0) {
          Alert.alert(
            'Your first contact is...',
            `Name: ${contacts.data[0].name}\n` +
            `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n`
            
          );
        }
      } catch (error) {
        console.log(error)
        console.log(contacts.data[0].phoneNumbers[0].number)
      }
    }
    
    
    
  }
  

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
      <Button onPress={showFirstContactAsync} title="Contacts" />
         
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