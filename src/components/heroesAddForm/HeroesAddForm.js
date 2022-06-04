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
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import { heroCreated } from "../../actions";
import { useHttp } from '../../hooks/http.hook';


const HeroesAddForm = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state);

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

  const renderOptions = (filters, status) => {
    if (status === 'loading') return <option>Загрузка...</option>;
    if (status === 'error') return <option>Ошибка</option>;

    if (filters && filters.length > 0) {
      return filters.map(({ name, output }) => {
        if (name === 'all') return; //eslint-disable-line
        return <option value={ name }>{ output }</option>
      });
    };
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
              <option value=''>Я владею элементом...</option>
              { renderOptions(filters, filtersLoadingStatus) }
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
