import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenses(ItemData) {
    return <ExpenseItem {...ItemData.item} />
}

function ExpensesList({expenses}) {
  return <FlatList data={expenses} renderItem={renderExpenses} keyExtractor={(item) => item.id} />
    
  
}

export default ExpensesList;