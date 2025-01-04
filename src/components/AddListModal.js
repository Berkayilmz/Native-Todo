import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../Colors'
import tempData from '../../tempData'

const AddListModal = ({ onPress }) => {

    const backgroundColors = ["#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"]

    const [name, setName] = useState('');
    const [backColor, setBackColor] = useState(backgroundColors[1])

    const renderColors = () => {
        return backgroundColors.map((color) => (
            <TouchableOpacity
                key={color}
                style={[styles.colorSelect, { backgroundColor: color }]}
                onPress={() => setBackColor(color)}
            />
        ));
    };

    const createTodo = () => {
        const newTodo = {
            name: name, // name state'inden alınan değer
            color: backColor, // backColor state'inden alınan değer
            todos: [] // Başlangıçta boş bir todos dizisi
        };

        tempData.push(newTodo); // tempData'ya yeni todo ekleniyor
        setName(""); // Liste adı state sıfırlanıyor
        onPress(); // Modal kapatılıyor
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>

            <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }} onPress={onPress}>
                <AntDesign name='close' size={24} color={colors.black} />
            </TouchableOpacity>

            <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>

                <Text style={styles.title}>Create a Todo List</Text>

                <TextInput
                    style={styles.input}
                    placeholder='List Name'
                    value={name}
                    onChangeText={(value) => setName(value)}
                />

                <View style={styles.colorsView}>
                    {renderColors()}
                </View>

                <TouchableOpacity style={[styles.create, { backgroundColor: backColor }]} onPress={createTodo}>
                    <Text style={{ color: colors.white, fontWeight: '600' }}>Create!</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12, // Dinamik bir yükseklik oluşturur.
        paddingHorizontal: 16,
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    },
    colorsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    }
})