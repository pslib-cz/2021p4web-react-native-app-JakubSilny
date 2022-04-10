
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SMS from "expo-sms"; 
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
export const Sender =  props => {
  var numbers = ["+420732428076", "+420606032398", "+420608255000"];
  
  const [SMSstatus, setSmsstatus] = useState(null)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Friends', value: ["+420732428076", "+420606032398", "+420608255000", "+420605502907","+420736433325","+420777550768","+420735149450"] },
    { label: 'Family', value: ["+420732428076", "+420606032398", "+420608255000"] },
    { label: 'All Contacts', value: [value] },
    { label: 'other', value: ["+420732428076"] },
    

  ]);


  const simpleAlertHandler = () => {
    //function to make simple alert
    alert('Load Contacts');
  };

  const LoadContacts = async () => {
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
      for (let i = 0; i < contacts.data.length; i++) {
        value[i] = contacts.data[i].phoneNumbers[0].number;
      }
      try {
        if (contacts.total > 0) {
          
          Alert.alert(
            'Succesfully loaded',
            `Number of Contacts: ${contacts.data.length}\n`
            
          );
        }
      } catch (error) {
        
      }
    }
    
    
    
    
  }
  

  const smsSender = async () => {
    if (value != null && value[0] != null)
    {
      try {
        const status = await SMS.sendSMSAsync(
          value,
          'you up?'
        )
        let result;
        result = setSmsstatus("Status: SMS " + status.result)
  
      } catch (error) {
      }
    }
    
    else {
      simpleAlertHandler();
    }
  };
  return (
    
    <View style={styles.container}>
      
      <Button onPress={LoadContacts} title="Load all Contacts" />
       <DropDownPicker style={styles.dropdown}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button color={"#5793EA"} onPress={smsSender} title="Send SMS" />
     
         
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
    padding: 16
  },
  button : {
    position: 'absolute',
    bottom:0,
    left:0,
  }
});

export default Sender;