import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
      async function getExpenses() {
        setIsFetching(true);
        try {
          const expenses = await fetchExpenses();
          expensesCtx.setExpenses(expenses);
        } catch (error) {
          setError('No se pudieron recuperar los gastos!')
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