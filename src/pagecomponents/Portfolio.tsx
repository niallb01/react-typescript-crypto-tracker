//this component is child of app - data is being sent down from app
import { useState } from "react";
import "../Modal.css";
import "react-toastify/dist/ReactToastify.css";
import InputCoin from "../inputcomponents/InputCoin";
import PortfolioCoin from "../portfoliocomponents.jsx/PortfolioCoin";
import { BsLightning } from "react-icons/bs";

type PortfolioProps = {
  portfolio: PortfolioPageType[];
  addPortfolio: React.Dispatch<React.SetStateAction<PortfolioPageType[]>>;
  coins: PortfolioPageType[];
};

type PortfolioPageType = {
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
  total_volume: number;
  item: object;
  coin: string;
  id: string;
  quantity: any;
  fully_diluted_valuation: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  filtered: object;
};
const Portfolio = (props: PortfolioProps) => {
  const [portfolioModal, setPortfolioModal] = useState<boolean>(false);
  const [portfolioSearch, setPortfolioSearch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const { portfolio, addPortfolio, coins } = props;

  const togglePortfolioModal = () => {
    setPortfolioModal(!portfolioModal);
  };

  const handlePortfolioSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPortfolioSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const onDeletePortfolio = (item: object) => {
    const deletePortfolio: any = [portfolio];
    deletePortfolio.splice(item);
    addPortfolio(deletePortfolio);
  };

  const onDeletePortfolioCoin = (coin: string) => {
    const portfolioCopy = [...portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === coin;
    });
    portfolioCopy.splice(indexOf, 1);
    addPortfolio(portfolioCopy);
    setPortfolioModal(!portfolioModal);
  };

  const onUpdatePortfolioCoin = (name: string, quantity: string) => {
    const portfolioCopy = [...portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === name;
    });
    portfolioCopy[indexOf].quantity = quantity;
    addPortfolio(portfolioCopy);
  };

  //looks inside each object of the array to see if coin name is inside it
  const coinPortfolio = coins.filter((coin: any) => {
    const indexOf = portfolio.findIndex((item) => {
      return item.name === coin.name;
    });
    if (indexOf > -1) {
      return true;
    }
  });

  const coinResults = coins.filter((coin: any) => {
    return coin.name.toLowerCase().includes(portfolioSearch);
  });

  const chooseCoin = (name: string) => {
    setPortfolioSearch(name);
  };

  //adding new coin to portfolio, need to add quantity, price * quantity = totalvalue
  const onAddNewCoin = () => {
    const newCoin: any = [...portfolio];
    //add new item to portfolio/state
    newCoin.push({ name: portfolioSearch, quantity });
    // console.log("new coin", newCoin);
    addPortfolio(newCoin);
    //empty search inputs
    setPortfolioSearch("");
    setQuantity("");
  };

  return (
    <>
      <h4 className="portfolio-header">
        <BsLightning size={22} />
        Quick Portfolio
      </h4>
      <div className="add-portfolio-btn">
        <button onClick={togglePortfolioModal} className="btn-modal">
          + Add Coin
        </button>
      </div>
      {portfolioModal && (
        <div className="modal">
          <div onClick={togglePortfolioModal} className="overlay"></div>
          <div className="modal-content-portfolio">
            <h4 className="modal-header">Add Coin</h4>
            <input
              className="portfolio-search"
              list="search-input-3"
              placeholder="Search Coin..."
              value={portfolioSearch}
              onInput={handlePortfolioSearchInput}
            />

            <ul className="input-coin">
              {coinResults.map((coin: any) => {
                return (
                  <li onClick={() => chooseCoin(coin.name)} key={coin.name}>
                    <InputCoin
                      image={coin.image}
                      symbol={coin.symbol.toUpperCase()}
                      name={coin.name}
                    />
                  </li>
                );
              })}
            </ul>

            <input
              onInput={handleQuantity}
              type="text"
              className="portfolio-quantity"
              value={quantity}
              placeholder="Add Quantity..."
            />
            <button onClick={onAddNewCoin} className="add-portfolio-coin-btn">
              + Add
            </button>

            <button onClick={togglePortfolioModal} className="close-modal">
              X
            </button>
          </div>
        </div>
      )}
      {coinPortfolio.map((coin: any) => {
        const item = portfolio.find((item) => {
          return item.name === coin.name;
        });
        return (
          <div className="portfolio-container">
            <div className="portfolio-row">
              <PortfolioCoin
                rank={coin.market_cap_rank}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol.toUpperCase()}
                twentyFourHour={coin.price_change_percentage_24h.toFixed(1)}
                coinPrice={coin.current_price.toLocaleString()}
                quantity={item?.quantity}
                marketCap={(coin.market_cap / 1000000000).toFixed(2)}
                totalValue={(
                  item?.quantity * coin.current_price
                ).toLocaleString()}
                onDeletePortfolioCoin={onDeletePortfolioCoin}
                onUpdatePortfolioCoin={onUpdatePortfolioCoin}
              />
            </div>
          </div>
        );
      })}

      {coinPortfolio.length === 0 && (
        <div className="add-portfolio-coin-text">
          <p>
            You don't have any holdings at the moment. Click Add a Coin button
            to add Coins to your portfolio.
          </p>
        </div>
      )}

      <div className="delete-portfolio-btn">
        <button onClick={onDeletePortfolio} className="delete-coin-button">
          Delete Portfolio
        </button>
      </div>

      <div className="portfolio-page-footer"></div>
    </>
  );
};

export default Portfolio;
