import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSummiting, setIsSummiting] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar Gasto' : 'Agregar Gasto'
    });
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setIsSummiting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setIsSummiting(false);
      setError('No se ha podido borrar - Favor de intentelo más tarde')
    }
    
  }
  function cancelHandler(){
    navigation.goBack();
  }

  async function confirmHandler(expenseData){
    setIsSummiting(true);
    try {
      if (isEditing) {
          const response = await updateExpense(editedExpenseId, expenseData);
          expensesCtx.updateExpense(editedExpenseId, expenseData);        
      } else {
          const id = await storeExpense(expenseData)
          expensesCtx.addExpense({...expenseData, id: id});
      } 
      navigation.goBack();
    } catch (error) {
      setIsSummiting(false);
      setError('No se ha podido guardar el gasto - Favor de intentelo más tarde');
    }     
  }
  function errorHandler() {
    setError(false);
  }

  if (error && !isSummiting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isSummiting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Guardar' : 'Agregar'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }

})