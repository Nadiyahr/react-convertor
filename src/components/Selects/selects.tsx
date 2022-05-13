/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { isShouldReverse } from '../../store/features/reverse/reverseSlice';
import { isShouldRender } from '../../store/features/render/renderSlice';
import { loadFiltredCurrenciess } from '../../store/features/filter/filterSlice';
import { loadFromValue } from '../../store/features/from/fromSlice';
import { loadToValue } from '../../store/features/to/toSlice';
import { loadBaseValue } from '../../store/features/base/baseSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import './Selects.scss';

type Props = {
  type: string,
};

export const Selects: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { type } = props;
  const arrData = useSelector((state: RootState) => state.currencies.data);
  const fromValue = useSelector((state: RootState) => state.fromValue.value);
  const toValue = useSelector((state: RootState) => state.toValue.value);
  const baseValue = useSelector((state: RootState) => state.baseValue.value);
  const arrDataFilter = useSelector((state: RootState) => state.filtredCurrencies.array);
  const invert = useSelector((state: RootState) => state.reverse.value);
  const [internFrom, setInternFrom] = useState(fromValue);
  const [internTo, setInternTo] = useState(toValue);
  const [internBase, setInternBase] = useState(baseValue);
  const [displaySelect, setDisplaySelect] = useState(false);

  const setValue = (typeProps: string) => {

    const switchTypes: Curr = {
      'from': internFrom,
      'to': internTo,
      'base': internBase.slice(0,3)
    };

    return switchTypes[typeProps];
  };

  const onFocus = (selectType: string) => {
    setDisplaySelect(true);
    dispatch(isShouldRender(false));
    dispatch(loadFiltredCurrenciess(arrData));

    switch (selectType) {
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

    const filtredArr = arrData.filter((data) => value === ''
      ? data
      : data[0].toLowerCase().includes(value.toLowerCase()));

    dispatch(loadFiltredCurrenciess(filtredArr));
  };

  const onClickLi = (str: string, type: string) => {
    switch (type) {
      case 'from':
        dispatch(loadFromValue(str));
        setInternFrom(str);
        dispatch(loadFiltredCurrenciess(arrData));
        return fromValue;

      case 'to':
        dispatch(loadToValue(str));
        setInternTo(str);
        dispatch(loadFiltredCurrenciess(arrData));
        return toValue;

      case 'base':
        dispatch(loadBaseValue(str));
        setInternBase(str.slice(0,3));
        dispatch(loadFiltredCurrenciess(arrData));
        return baseValue;

        default:
          break;
    }
  };
  console.log(arrDataFilter);
  console.log(arrData);

  useEffect(() => {
    if (invert) {
      setInternFrom(fromValue);
      setInternTo(toValue);
      dispatch(isShouldReverse(false));
    }  
  }, [invert,]);

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
          onFocus={() => onFocus(type)}
          maxLength={3}
        />
        <div className="search__icon">
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
              key={`${data[0]}${type}`}
              onClick={() => {
                onClickLi(data.join(' '), type);
                setDisplaySelect(false);
              }}
            >
              {`${data.join(' ')}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
