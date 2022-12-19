import { items } from "../data/items";
import { Item } from "../types/Item";

// lista de funções para manipular datas

// função para pegar o mes atual
export const getCurrentMonth = () =>{
     let now = new Date();
     return `${now.getFullYear()}-${now.getMonth()+1}`;
}

// função filtrando uma list por data
export const filterListByMonth = (list: Item[], date: string): Item[] => {
     let newList: Item[] = [];
     let  [year, month] = date.split('-');

     for(let i in list){
          if(list[i].date.getFullYear() === parseInt(year) &&
          (list[i].date.getMonth()+1) === parseInt(month)){
               newList.push(list[i]);
          }
     }
     return newList;
} 

//formatando uma data

export const formatDate = (date: Date): string => {
     let year = date.getFullYear();
     let month = date.getMonth();
     let day = date.getDate();

     return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`
}

const addZeroToDate = (n: number): string =>{
     if(n<10){
         return  `0${n}`;
     }else{
          return `${n}`;
     }
}

// formatando o nome do mes com a data
 export const formatCurrentMonth = (currentMonth: string): string =>{
      let [year, month] = currentMonth.split('-');
      let months = ['Janeiro','Fevereiro', 'Março', 'Abril' , 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return `${months[parseInt(month)-1]} ${year}`;
 }