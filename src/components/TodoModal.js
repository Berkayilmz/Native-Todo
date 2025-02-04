import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from "@expo/vector-icons"
import colors from "../../Colors";

const TodoModal = ({ list, closeModal }) => {

    const [name, setName] = useState(list.name);
    const [color, setColor] = useState(list.color);
    const [todos, setTodos] = useState(list.todos);

    const taskCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length

    const renderTodo = ({ item }) => {
        const todo = item;
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity>
                    <Ionicons name={todo.completed ? 'square' : 'square-outline'} size={24} color={colors.gray} style={{width: 32}}/>
                </TouchableOpacity>
                <Text 
                    style={[styles.todo, {textDecorationLine: todo.completed ? 'line-through' : 'none'} ,{color: todo.completed ? colors.gray : colors.black}]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
                style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                onPress={closeModal}
            >
                <AntDesign name='close' size={24} color={colors.black} />
            </TouchableOpacity>

            <View style={[styles.section, styles.header, { borderBottomColor: color }]}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.taskCount}>
                        {completedCount} of {taskCount} tasks
                    </Text>
                </View>
            </View>

            <View style={[styles.section, { flex: 3 }]}>
                <FlatList
                    data={todos}
                    renderItem={renderTodo}
                    keyExtractor={item => item.title}
                    contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                />
            </View>

            <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput style={[styles.input, { borderColor: color }]}/>
                <TouchableOpacity style={[styles.addTodo, {backgroundColor: color}]}>
                    <AntDesign name='plus' size={16} color={colors.white}/>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default TodoModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todo: {
        color: colors.black,
        fontWeight: '700',
        fontSize: 16
    }
})