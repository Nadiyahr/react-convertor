import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFromSlector,
  getCurrenciesSelector,
  getToSelector,
  getArrDataFilter,
  getBase,
  getReverse,
} from '../../store/selectors';
import {
  setArrDataFilterActionCreator,
  SetBaseActionCreator,
  setFromActionCreator,
  SetReverseActionCreator,
  SetRenderOutputActionCreator,
  setToActionCreator,
} from '../../store/actions';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Selects.scss';

type Props = {
  type: string,
};

export const Select: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { type } = props;
  const arrData = useSelector(getCurrenciesSelector);
  const fromValue = useSelector(getFromSlector);
  const toValue = useSelector(getToSelector);
  const baseValue = useSelector(getBase);
  const arrDataFilter = useSelector(getArrDataFilter);
  const invert = useSelector(getReverse);
  const [internFrom, setInternFrom] = useState(fromValue);
  const [internTo, setInternTo] = useState(toValue);
  const [internBase, setInternBase] = useState(baseValue);
  const [displaySelect, setDisplaySelect] = useState(false);

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

  const onFocus = (selectType: string) => {
    setDisplaySelect(true);
    dispatch(SetRenderOutputActionCreator(false));
    dispatch(setArrDataFilterActionCreator(arrData));

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

    dispatch(setArrDataFilterActionCreator(filtredArr));
  };

  const onClickLi = (str: string, type: string) => {
    switch (type) {
      case 'from':
        dispatch(setFromActionCreator(str));
        setInternFrom(str);
        dispatch(setArrDataFilterActionCreator(arrData));
        return fromValue;

      case 'to':
        dispatch(setToActionCreator(str));
        setInternTo(str);
        dispatch(setArrDataFilterActionCreator(arrData));
        return toValue;

      case 'base':
        dispatch(SetBaseActionCreator(str));
        setInternBase(str.slice(0,3));
        dispatch(setArrDataFilterActionCreator(arrData));
        return baseValue;

        default:
          break;
    }
  };

  useEffect(() => {
    if (invert) {
      setInternFrom(fromValue);
      setInternTo(toValue);
      dispatch(SetReverseActionCreator(false));
    }  
  }, [invert]);

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
