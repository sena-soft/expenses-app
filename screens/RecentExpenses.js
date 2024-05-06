import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { Alert } from "react-native";

function RecentExpenses() {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpensesContext);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
      async function getExpenses() {
        setIsFetching(true);
        try {
          const expenses = await fetchExpenses(authCtx.token, authCtx.user);
          expensesCtx.setExpenses(expenses);
        } catch (error) {
          console.log(error.response.data);
          if (error.response?.data?.error === 'Permission denied') {
            Alert.alert('Sesión terminada', 'Es necesario volver a iniciar sesión para continuar.');
          }
          setError('No se pudieron recuperar los gastos!');
        }
        setIsFetching(false);
      }
      getExpenses();
    }, [])

    function errorHandler() {
      setError(false);
    }

    if (error && !isFetching) {
      return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }
    if (isFetching) {
      return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense)=> {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
    })

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={'Los últimos 7 días'} fallbackText={'No hay Gastos durante los últimos 7 días'} />
  )
}

export default RecentExpenses;