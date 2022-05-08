/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getFromSlector, getCurrenciesSelector, getToSelector, getArrDataFilter } from '../../store/selectors';
import { setArrDataFilterActionCreator, setFromActionCreator, setToActionCreator } from '../../store/actions';

type Props = {
  type: string,
};

export const Search: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const {type} = props;
  const arrData = useSelector(getCurrenciesSelector);
  let fromValue = useSelector(getFromSlector);
  let toValue = useSelector(getToSelector);
  let arrDataFilter = useSelector(getArrDataFilter);
  const [displaySelect, setDisplaySelect] = useState(false);

  const setValue = (typeProps: string) => {
    switch (typeProps){
      case 'from':
        return fromValue;

      case 'to':
        return toValue;

      default:
        break;
    }
     
    // if (typeProps === 'from') {
    //   return fromValue;
    // }

    // return toValue;
  };

  const onFocus = () => {
    setDisplaySelect(true);
    if (type === 'from') {
      dispatch(setFromActionCreator(''));
      return fromValue;
    }

    dispatch(setToActionCreator(''));

    return toValue;
  };

  const onCange = (ev: React.ChangeEvent<HTMLInputElement>, typeS: string) => {
    const { value } = ev.target;

    setDisplaySelect(true);
    if (typeS === 'from') {
      dispatch(setFromActionCreator(value.toUpperCase()));
    } else {
      dispatch(setToActionCreator(value.toUpperCase()));
    }

    const filtredArr = arrData.filter((data: string[]) => value === ''
      ? data
      : data[0].toLowerCase().includes(value.toLowerCase()));

    console.log(filtredArr);
    dispatch(setArrDataFilterActionCreator(filtredArr));
    console.log(arrDataFilter);
  };

  const onClickLi = (str: string, type: string) => {
    if (type === 'from') {
      dispatch(setFromActionCreator(str));
      return fromValue;
    }

    dispatch(setToActionCreator(str));

    return toValue;
  };

  // useEffect(() => {
  //   dispatch(SetArrDataFilterActionCreator(arrData));
  // }, []);

  return (
    <div className="search">
      <label htmlFor="curr">
        {type}
        <input
          type="text"
          className="search__input"
          name="currencies"
          id="curr"
          value={setValue(type)}
          onChange={(e) => onCange(e, type)}
          onFocus={onFocus}
          maxLength={3}
        />
      </label>
      {arrDataFilter && displaySelect && (
        <ul className="search__list list-group">
          {arrDataFilter.map((data: string[]) => (
            <li
              className="search__item list-group-item list-group-item-action"
              key={data[0]}
              onClick={() => {
                onClickLi(data.join(' '), type);
                setDisplaySelect(false);
              }}
            >
                {data.join(' ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
