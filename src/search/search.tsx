import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './search.scss';
// import { useSelector } from 'react-redux';

type Props = {
  arrayDataForSelect: Currency[],
  setCurrentValue: (str: string, type: string) => void;
  type: string,
  currentValue: string;
  changeCurrentValue: (arg: string) => void;
};

export const Search: React.FC<Props> = (props) => {
  const {
    arrayDataForSelect, setCurrentValue, type, currentValue, changeCurrentValue,
  } = props;
  const [arrData, setArrData] = useState<Currency[] | null>(null);
  const [displaySelect, setDisplaySelect] = useState(false);

  const onFocus = () => {
    setDisplaySelect(true);
    changeCurrentValue('');
  };

  const onCange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;

    console.log(arrayDataForSelect);

    setDisplaySelect(true);
    setArrData(arrayDataForSelect);
    changeCurrentValue(value.toUpperCase());

    console.log(arrayDataForSelect);

    const filtredArr = arrayDataForSelect.filter(data => value === ''
      ? data
      : data.id.toLowerCase().includes(value.toLowerCase()));

    console.log(filtredArr);
    setArrData(filtredArr);
  };

  // useEffect(() => {
  //   console.log(arrayDataForSelect);
  // }, []);

  return (
    <div className="search w-25">
      <label htmlFor="curr">
        {type}
        <input
          type="text"
          className="search__input w-100"
          name="currencies"
          id="curr"
          value={currentValue}
          onChange={(e) => onCange(e)}
          onFocus={onFocus}
          maxLength={3}
        />
        {displaySelect
          ? (<FontAwesomeIcon icon="caret-down" />)
          : (<FontAwesomeIcon icon="caret-down" />)}
      </label>
      {arrData && displaySelect && (
        <ul className="search__list list-group">
          {arrData.map(data => (
            <li
              className="search__item list-group-item list-group-item-action"
              key={data.id}
              onClick={() => {
                changeCurrentValue(data.id);
                setCurrentValue(data.id, type);
                setDisplaySelect(false);
              }}
            >
              {data.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
