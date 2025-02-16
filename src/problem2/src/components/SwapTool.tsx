import { useEffect, useState } from "react";
import CurrencyList from "./CurrencyList";
import { MdSwapHorizontalCircle } from "react-icons/md";
const ConvertForm = () => {
    interface Currency {
        currency: string;
        price: number;
        date: string;
    }

    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("ETH");
    const [swappedAmount, setSwappedAmount] = useState(0);
    const [validateFail, setValidateFail] = useState("");

    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://interview.switcheo.com/prices.json");
            const data = await res.json();
            setCurrencies(data);
        } catch (error) {
            console.error("Error Fetching", error);
        }
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const swapCurrency = () => {
        if (fromCurrency === toCurrency) {
            setValidateFail('Please select different currencies');
            return;
        } else if (!amount) {
            setValidateFail('Invalid amount');
            return;
        } else {
            setValidateFail('');
        }
        if (currencies && currencies.length > 0) {

            const fromCurrencyPrice = currencies.find(
                (currency) => currency.currency === fromCurrency
            )?.price;

            const toCurrencyPrice = currencies.find(
                (currency) => currency.currency === toCurrency
            )?.price;

            if (fromCurrencyPrice && toCurrencyPrice) {
                let rate = fromCurrencyPrice / toCurrencyPrice;
                let swappedAmount = rate * amount;
                const formattedAmount = parseFloat(swappedAmount.toFixed(6));
                setSwappedAmount(formattedAmount);
            }
        }
    };

    const handleInputAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseFloat(e.target.value);
        if (!isValidFloat(inputValue)) {
            setValidateFail('Value cannot be zero or empty');
        } else {
            setValidateFail('');
        }
        setAmount(inputValue);
    };

    const isValidFloat = (floatVal: number) => {
        return !isNaN(floatVal) && floatVal > 0;
    }

    const swapCurrencyUnit = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="max-w-4xl mx-auto my-10 p-5 bg-thirdColor text-white rounded-sm shadow-lg">
            <h2 className="mb-10 text-3xl font-semibold text-center">
                Currency Swap
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primaryColor p-8 rounded-sm shadow-md">
                    <CurrencyList
                        currencies={currencies}
                        title="From:"
                        currency={fromCurrency}
                        setCurrency={setFromCurrency}
                        key={fromCurrency}
                    />
                    <div className="mt-4">
                        <label
                            htmlFor="inputAmount"
                            className="block text-sm font-medium text-white text-left pl-2"
                        >
                            Amount to send:
                        </label>
                        <input
                            value={isNaN(amount) ? '' : amount}
                            onChange={handleInputAmount}
                            name="inputAmount"
                            id="inputAmount"
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center -mb-5 sm:mb-5 gap-2">
                    <button
                        onClick={swapCurrencyUnit}
                        className="flex items-center cursor-pointer justify-center p-3 bg-white text-3xl text-gray-700 rounded-full hover:bg-fourthColor hover:text-white transition duration-300"
                    >
                        <MdSwapHorizontalCircle />
                    </button>
                </div>
                <div className="bg-secondColor p-8 rounded-sm shadow-md">
                    <CurrencyList
                        currencies={currencies}
                        currency={toCurrency}
                        setCurrency={setToCurrency}
                        title="To:"
                        key={toCurrency}
                    />
                    <div className="mt-4">
                        <label
                            htmlFor="outputAmount"
                            className="block text-sm font-medium text-gray-700 text-left pl-2"
                        >
                            Amount to receive:
                        </label>
                        <input
                            value={swappedAmount}
                            disabled
                            name="outputAmount"
                            type="number"
                            id="outputAmount"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1 text-gray-700"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={swapCurrency}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full shadow-lg hover:from-red-600 hover:to-red-800 focus:ring-4 cursor-pointer focus:ring-red-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Swap
                </button>
            </div>

            {validateFail && (
                <div role="alert" className="p-4 my-4 text-sm text-red-800 rounded-sm bg-red-50 dark:bg-gray-800 dark:text-red-400">
                    <span className="font-medium">{validateFail}</span>
                </div>
            )}
        </div>
    );
};

export default ConvertForm;
