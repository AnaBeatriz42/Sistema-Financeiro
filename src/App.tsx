import { useState, useEffect } from 'react';
import * as C from'./App.styles';
import { Item } from './types/Item';
import { Category } from './types/Category';
import { categories } from './data/categories';
import { items } from './data/items';
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter';
import { TableArea } from './components/TableArea';
import { InfoArea } from './components/infoArea';


const App = () => {
  const [list, setList] = useState<Item[]>(items); // lista completa
  const [filteredList, setFilteredList] = useState<Item[]>([]);// lista filtrada
  const[ currentMonth, setCurrentMont] = useState(getCurrentMonth) // mes atual
  
  useEffect(() => { // similar ao watch.group
    setFilteredList(filterListByMonth(list,currentMonth));
  },[list,currentMonth]);

  const handleMonthChenge = (newMonth:string) => {
      setCurrentMont(newMonth);
  }

  return(
     <C.Container>
        <C.Header>
          <C.HeaderText> Sistema Financeiro</C.HeaderText>
        </C.Header>  

          <C.Body>

            {/* Área de informações*/}
              <InfoArea 
              currentMonth={currentMonth}
              onMonthChange={handleMonthChenge}
              />
            {/* Area de inserir informações*/}

            {/* Area de apresentar itens*/}
              <TableArea list={filteredList}/>
          </C.Body>
     </C.Container>
  );
}

export default App;
