import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const App = () => {
    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [values, setValues] = useState([]);

    const handleAddValues = async () => {
        try {
            //const response = await fetch('http://172.16.1.65:8080/api/addValues', {
                const response = await axios.post('http://172.16.1.65:8080/api/addValues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ val1, val2 })
            });
            const data = await response.json();
            setValues([...values, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetValues = async () => {
        try {
            const response = await fetch('http://172.16.1.65:8080/api/getCalculations');
    
            console.log(response.data);
            const data = await response.json();
            setValues(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                style={{ height: 40, marginBottom: 20 }}
                placeholder="Enter Val1"
                onChangeText={text => setVal1(text)}
                value={val1}
            />
            <TextInput
                style={{ height: 40, marginBottom: 20 }}
                placeholder="Enter Val2"
                onChangeText={text => setVal2(text)}
                value={val2}
            />
            <Button title="Add Values" onPress={handleAddValues} />
            <Button title="Get Values" onPress={handleGetValues} />
            {values.map((value, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                    <Text>Val1: {value.val1}</Text>
                    <Text>Val2: {value.val2}</Text>
                    <Text>Total: {value.total}</Text>
                </View>
            ))}
        </View>
    );
};

export default App;
