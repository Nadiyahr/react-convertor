/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getFromSlector, getCurrenciesSelector, getToSelector, getArrDataFilter, getBase, getInvert } from '../../store/selectors';
import { setArrDataFilterActionCreator, SetBaseActionCreator, setCurrenciesActionCreator, setFromActionCreator, SetInvertActionCreator, SetRenderOutputActionCreator, setToActionCreator } from '../../store/actions';
import { getJsonApiArray } from '../../api';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  type: string,
};

export const Search: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { type } = props;
  const arrData = useSelector(getCurrenciesSelector);
  const fromValue = useSelector(getFromSlector);
  const toValue = useSelector(getToSelector);
  const baseValue = useSelector(getBase);
  const arrDataFilter = useSelector(getArrDataFilter);
  const invrert = useSelector(getInvert);
  const [internFrom, setInternFrom] = useState(fromValue);
  const [internTo, setInternTo] = useState(toValue);
  const [internBase, setInternBase] = useState(baseValue);
  const [displaySelect, setDisplaySelect] = useState(false);

  if (invrert) {
    console.log(invrert);
    const from = internFrom;

    setInternFrom(internTo);
    setInternTo(from);
    dispatch(SetInvertActionCreator(false));
  }

  const setValue = (typeProps: string) => {

    switch (typeProps){
      case 'from':
        return internFrom;

      case 'to':
        return internTo;

      case 'base':
        return internBase.slice(0,3);

      default:
        break;
    }
  };

  const clickDown = () => {
    setDisplaySelect(prev => !prev);
  };

  const onFocus = () => {
    setDisplaySelect(true);
    dispatch(SetRenderOutputActionCreator(false));

    switch (type) {
      case 'from':
        setInternFrom('');
        return internFrom;

      case 'to':
        setInternTo('');
        return internTo;

      case 'base':
        setInternBase('');
        return internBase;

      default:
        break;
    }
  };

  const onCange = (ev: React.ChangeEvent<HTMLInputElement>, typeS: string) => {
    const { value } = ev.target;

    setDisplaySelect(true);

    switch (typeS) {
      case 'from':
        setInternFrom(value.toUpperCase());
        break;

      case 'to':
        setInternTo(value.toUpperCase());
        break;

      case 'base':
        setInternBase(value.toUpperCase());
        break;

      default:
        break;
    }

    const filtredArr = arrData.filter((data: string[]) => value === ''
      ? data
      : data[0].toLowerCase().includes(value.toLowerCase()));

    console.log(filtredArr);
    dispatch(setArrDataFilterActionCreator(filtredArr));
    console.log(arrDataFilter);
  };

  const onClickLi = (str: string, type: string) => {
    switch (type) {
      case 'from':
        dispatch(setFromActionCreator(str));
        setInternFrom(str);
        return fromValue;

      case 'to':
        dispatch(setToActionCreator(str));
        setInternTo(str);
        return toValue;

      case 'base':
        dispatch(SetBaseActionCreator(str.slice(0,3)));
        setInternBase(str.slice(0,3));
        return baseValue;

        default:
          break;
    }
  };

  useEffect(() => {
    if (arrData.length === 0) {
      dispatch(setArrDataFilterActionCreator(getJsonApiArray));
    }
  }, []);

  return (
    <div className="search">
      <label htmlFor="curr" style={{textTransform: 'capitalize'}}>
        {type}
        <input
          type="text"
          placeholder="Start typting for filter"
          className="search__input"
          name="currencies"
          id="curr"
          value={setValue(type)}
          onChange={(e) => onCange(e, type)}
          onFocus={onFocus}
          maxLength={3}
        />
        <div className="search__icon" onClick={clickDown}>
        {displaySelect
        ? <FontAwesomeIcon icon={faCaretUp} />
        : <FontAwesomeIcon icon={faCaretDown} />}
        </div>
      </label>
      {displaySelect && (
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
