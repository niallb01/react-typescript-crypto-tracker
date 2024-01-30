//this component is child of app - data is being sent down from app
import { useState } from "react";
import "../Modal.css";
import "react-toastify/dist/ReactToastify.css";
import InputCoin from "../inputcomponents/InputCoin";
import PortfolioCoin from "../portfoliocomponents.jsx/PortfolioCoin";
import { BsLightning } from "react-icons/bs";

const Portfolio = (props) => {
  const [portfolioModal, setPortfolioModal] = useState(false);
  const [portfolioSearch, setPortfolioSearch] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const togglePortfolioModal = () => {
    setPortfolioModal(!portfolioModal);
  };

  const handlePortfolioSearchInput = (e) => {
    setPortfolioSearch(e.target.value);
    console.log(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const onDeletePortfolio = (item) => {
    const deletePortfolio = [...props.portfolio];
    deletePortfolio.splice(item);
    props.addPortfolio(deletePortfolio);
  };

  const onDeletePortfolioCoin = (coin) => {
    const portfolioCopy = [...props.portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === coin;
    });
    portfolioCopy.splice(indexOf, 1);
    props.addPortfolio(portfolioCopy);
    setPortfolioModal(!portfolioModal);
  };

  const onUpdatePortfolioCoin = (name, quantity) => {
    const portfolioCopy = [...props.portfolio];
    const indexOf = portfolioCopy.findIndex((item) => {
      return item.name === name;
    });
    console.log(indexOf);
    portfolioCopy[indexOf].quantity = quantity;
    props.addPortfolio(portfolioCopy);
  };

  //looks inside each object of the array to see if coin name is inside it
  const coinPortfolio = props.coins.filter((coin) => {
    const indexOf = props.portfolio.findIndex((item) => {
      return item.name === coin.name;
    });
    if (indexOf > -1) {
      return true;
    }
  });

  const coinResults = props.coins.filter((coin) => {
    return coin.name.toLowerCase().includes(portfolioSearch);
  });

  const chooseCoin = (name) => {
    setPortfolioSearch(name);
  };

  //adding new coin to portfolio, need to add quantity, price * quantity = totalvalue
  const onAddNewCoin = () => {
    const newCoin = [...props.portfolio];
    //add new item to portfolio/state
    newCoin.push({ name: portfolioSearch, quantity });
    // console.log("new coin", newCoin);
    props.addPortfolio(newCoin);
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
              {coinResults.map((coin) => {
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
      {coinPortfolio.map((coin) => {
        const item = props.portfolio.find((item) => {
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
                quantity={item.quantity}
                marketCap={(coin.market_cap / 1000000000).toFixed(2)}
                totalValue={item.quantity * coin.current_price}
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
