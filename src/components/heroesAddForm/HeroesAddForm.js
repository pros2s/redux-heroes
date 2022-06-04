// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from "../../actions";
import { useHttp } from '../../hooks/http.hook';


const HeroesAddForm = () => {
  const [ inputValue, setInputValue ] = useState('');
  const [ textareaValue, setTextareaValue ] = useState('');
  const [ selectedElement, setSelectedElement ] = useState('');

  const { request } = useHttp();
  const dispatch = useDispatch();


  const onSubmit = (e) => {
    e.preventDefault();

    const newChar = {
      id: uuidv4(),
      name: inputValue,
      description: textareaValue,
      element: selectedElement
    };

    request('http://localhost:3001/heroes', 'POST', JSON.stringify(newChar))
      .then(dispatch(heroCreated(newChar)))
      .catch((err) => { throw new Error(err) });

    setInputValue('');
    setTextareaValue('');
    setSelectedElement('');
  };


  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={ onSubmit }>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
          <input
            value={ inputValue }
            onChange={ (e) => setInputValue(e.target.value)}
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            placeholder="Как меня зовут?"/>
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">Описание</label>
          <textarea
            value={ textareaValue }
            onChange={ (e) => setTextareaValue(e.target.value)}
            required
            name="text"
            className="form-control"
            id="text"
            placeholder="Что я умею?"
            style={{"height": '130px'}}/>
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
          <select
            value={ selectedElement }
            onChange={ (e) => setSelectedElement(e.target.value) }
            required
            className="form-select"
            id="element"
            name="element">
              <option >Я владею элементом...</option>
              <option value="fire">Огонь</option>
              <option value="water">Вода</option>
              <option value="wind">Ветер</option>
              <option value="earth">Земля</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary">
            Создать
        </button>
    </form>
  )
};


export default HeroesAddForm;
