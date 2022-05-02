import React, { useState } from 'react';
import './search.scss';
// import { useSelector } from 'react-redux';

type Props = {
  dataSelect: string[],
  setCurr: (str: string, type: string) => void;
  type: string,
  defaultVal: string;
};

export const Search: React.FC<Props> = (props) => {
  const {
    dataSelect, setCurr, type, defaultVal,
  } = props;
  const [query, setQuery] = useState(defaultVal);
  const [arrData, setArrData] = useState<string[] | null>(null);
  const [select, setSelect] = useState(false);

  const onFocus = () => {
    setSelect(true);
    setQuery('');
  };

  const onCange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(true);
    setArrData(dataSelect);

    const { value } = ev.target;

    setQuery(value.toUpperCase());
    console.log(dataSelect);

    const filtredArr = dataSelect.filter(data => data.toLowerCase().includes(value.toLowerCase()));

    console.log(filtredArr);
    setArrData(filtredArr);
  };

  return (
    <>
      <input
        className="search"
        type="text"
        name="currencies"
        id="curr"
        value={query}
        onChange={(e) => onCange(e)}
        onFocus={onFocus}
        maxLength={3}
      />
      {arrData && select && (
        <ul className="search__list list-group">
          {arrData.map(data => (
            <li
              className="search__item list-group-item list-group-item-action"
              key={data}
              onClick={() => {
                setQuery(data);
                setCurr(data, type);
                setSelect(false);
              }}
            >
              {data}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
