export type CoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  price_change_percentage_24h: number;
  quantity: string;
  coin: string;
  filtered: object;
  item: object;
};

export type CoinDescType = {
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
  coin_description: string;
  key: string;
  index: number;
  coindesc: string;
};

export type PortfolioType = {
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
  quantity: string | undefined;
  id: string;
  fully_diluted_valuation: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  filtered: object;
};

export type HomeProps = {
  coins: HomeCoinType[];
  portfolio: HomeCoinType[];
  addPortfolio: (portfolio: HomeCoinType[]) => void;
};

export type HomeCoinType = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  volume: number;
  price_change_24h: number;
  twentyFourHour: number;
  price_change_percentage_24h: number;
  quantity: string | undefined;
  coin: string;
  filtered: object;
  item: object;
};

export type PortfolioProps = {
  portfolio: PortfolioPageType[];
  addPortfolio: React.Dispatch<React.SetStateAction<PortfolioPageType[]>>;
  coins: PortfolioPageType[];
};

export type PortfolioPageType = {
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

export type DescriptionProps = {
  coinDescription: CoinDescriptionType[];
};

export type CoinDescriptionType = {
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
  coin_description: string;
  key: string;
  index: number;
  coindesc: string;
};

export type CoinDescCompProps = {
  marketRank: number;
  descImage: string;
  name: string;
  symbol: string;
  coinPrice: string;
  marketCap: string;
  descvolume: string;
  circulating: string;
  fullyDiluted: string;
  totalSupply: string;
  maxSupply: string;
  twentyFourHourHigh: string;
  twentyFourHourLow: string;
  ath: string;
  atl: string;
};

export type InputCoinProps = {
  image: string;
  name: string;
  symbol: string;
};

export type InputCoinComp = {
  image: string;
  name: string;
  symbol: string;
};

export type CoinDescProps = {
  marketRank: number;
  descImage: string;
  name: string;
  symbol: string;
  coinPrice: string;
  marketCap: string;
  descvolume: string;
  circulating: string;
  fullyDiluted: string;
  totalSupply: string;
  maxSupply: string;
  twentyFourHourHigh: string;
  twentyFourHourLow: string;
  ath: string;
  atl: string;
};

export type CoinCompProps = {
  rank: number;
  image: string;
  symbol: string;
  name: string;
  coinPrice: string;
  twentyFourHour: string;
  volume: string;
  fdv: string;
  marketCap: string;
};

export type CoinProps = {
  id: string;
  rank: number;
  image: string;
  symbol: string;
  name: string;
  coinPrice: string;
  twentyFourHour: string;
  volume: string;
  fdv: string;
  marketCap: string;
};

export type PortfolioCoin = {
  rank: number;
  image: string;
  name: string;
  symbol: string;
  coinPrice: string;
  quantity: string | undefined;
  marketCap: string;
  totalValue: any | number;
  twentyFourHour: string;
  onDeletePortfolioCoin: (coin: string) => void;
  onUpdatePortfolioCoin: (name: string, quantity: string) => void;
};
