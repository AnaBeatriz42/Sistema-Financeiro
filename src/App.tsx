import { useState, useEffect } from 'react';
import * as C from './App.styles';
import { Item } from './types/Item';
import { Category } from './types/Category';
import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/infoArea';
import { InputArea } from './components/InputArea'


const App = () => {
  const [list, setList] = useState<Item[]>(items); // lista completa
  const [filteredList, setFilteredList] = useState<Item[]>([]);// lista filtrada
  const [currentMonth, setCurrentMont] = useState(getCurrentMonth) // mes atual
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => { // similar ao watch.group
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value
      } else {
        incomeCount += filteredList[i].value
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);

  }, [filteredList])

  const handleMonthChenge = (newMonth: string) => {
    setCurrentMont(newMonth);
  }

  const handleAddItem = (item : Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText> Sistema Financeiro</C.HeaderText>
      </C.Header>

      <C.Body>

        {/* Área de informações*/}
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChenge}
          income={income}
          expense={expense}
        />
        {/* Area de inserir informações*/}
        <InputArea onAdd = {handleAddItem}/>

        {/* Area de apresentar itens*/}
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
}

export default App;
