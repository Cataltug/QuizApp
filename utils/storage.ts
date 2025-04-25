import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_COMPLETED_TESTS = "completedTests"

export const saveCompletedTest = async (category: string) => {
    const completed = await AsyncStorage.getItem(KEY_COMPLETED_TESTS);
    const completedTests = completed === null ? [] : JSON.parse(completed);

    //if category already completed, return without it
    if (completedTests.includes(category)) return;

    completedTests.push(category)
    await AsyncStorage.setItem(KEY_COMPLETED_TESTS, JSON.stringify(completedTests));

}


export const getCompletedTests = async () => {
    const completed = await AsyncStorage.getItem(KEY_COMPLETED_TESTS);

    return completed ? JSON.parse(completed) : [];
}