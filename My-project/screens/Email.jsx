import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';

export const Email = props => {
  const [status, setStatus] = useState(null)
  var P4 = ["filmarg018@pslib.cz", "jaksiln018@pslib.cz", "vojdejn@pslib.cz", "petmike018@pslib.cz", "jansmutn@pslib.cz"]
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'P4', value: ["filmarg018@pslib.cz", "jaksiln018@pslib.cz", "vojdejn@pslib.cz", "petmike018@pslib.cz", "jansmutn@pslib.cz"] },
    { label: 'P3', value: ["filmarg018@pslib.cz", "jaksiln018@pslib.cz", "vojdejn@pslib.cz"] },
    { label: 'P2', value: ["vojdejn@pslib.cz", "petmike018@pslib.cz", "jansmutn@pslib.cz"] },
    { label: 'P1', value: [] },

  ]);
  const simpleAlertHandler = () => {
    //function to make simple alert
    alert('Choose something');
  };
  const showAlert = () =>
    Alert.alert(

      "No vyber něco",
      "Přidej file",
      [
        {

          text: "No",
          onPress: () => { sendEmail([]) },
          style: "cancel"
        },
        { text: "Yes", onPress: sendEmailWithAttachment }
      ]

    );
  console.log(value)


  const sendEmail = async (file) => {
    var options = {}
    if (value != null) {
      if (file.length < 1) {
        options = {
          subject: "Sending email with attachment",
          recipients: value,
          body: "Morodec..."
        }
      } else {
        options = {
          subject: "Sending email with attachment",
          recipients: value,
          body: "Morodec...",
          attachments: file
        }
      }
      let promise = new Promise((resolve, reject) => {
        MailComposer.composeAsync(options)
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })

      promise.then(
        result => setStatus("Status: email " + result.status),
        error => setStatus("Status: email " + error.status)
      )
    }
    else {
      simpleAlertHandler();
    }

  }
  const sendEmailWithAttachment = async () => {
    if (value != null) {
      //get the email. 
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      let idk
      idk = setStatus("Status: email " + result.result)
      if (!result.cancelled) {
        console.log(result.uri)
        sendEmail([result.uri]);
      } else {
        sendEmail([])
      }
    }
    else {
      simpleAlertHandler();
    }

  }
  return (
    <View style={styles.container}>
      <DropDownPicker style={styles.dropdown}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button onPress={showAlert} title="Send Email" />

      {status !== null &&
        <View style={{ borderWidth: 2, borderColor: 'black', margin: 20, padding: 10 }}>
          <Text>{status}</Text>
        </View>
      }
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
  dropdown: {
    marginBottom: 10,
    marginTop: 10,
  }
});
export default Email;