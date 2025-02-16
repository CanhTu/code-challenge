/* eslint-disable react/prop-types */

import React from 'react';
import Select from 'react-select';

interface Currency {
    currency: string;
    price: number;
    date: string;
}

interface CurrencyListProps {
    currencies: Currency[];
    currency: string;
    setCurrency: (currency: string) => void;
    title?: string;
}

const CurrencyList: React.FC<CurrencyListProps> = ({
    currencies,
    currency,
    setCurrency,
    title = "",
}) => {
    const options = currencies.map((currencyObj: Currency) => ({
        value: currencyObj.currency,
        label: (
            <div className='flex items-center'>
                <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currencyObj.currency}.svg`}
                    alt={currencyObj.currency}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                />
                {currencyObj.currency}
            </div>
        ),
    }));

    const handleChange = (selectedOption: any) => {
        setCurrency(selectedOption.value);
    };

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#f0f0f0' : 'white',
            color: 'black',
            padding: 10,
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'black',
        }),
        control: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '5px',
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: 'white',
        }),
    };

    return (
        <div className="">
            <label
                htmlFor={title}
                className={`block text-sm font-medium text-left pl-2 mb-2 ${title === 'To:' ? 'text-gray-700' : 'text-white'}`}
            >
                {title}
            </label>

            <div className="relative">
                <Select
                    value={options.find(option => option.value === currency)}
                    onChange={handleChange}
                    options={options}
                    id={title}
                    name={title}
                    styles={customStyles}
                    className="w-full shadow-sm"
                    menuPlacement="auto"
                    menuShouldScrollIntoView={false}
                    menuShouldBlockScroll={true}
                />
            </div>
        </div>
    );
};

export default CurrencyList;