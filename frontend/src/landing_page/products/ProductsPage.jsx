import HeroPage from "./HeroPage";
import LeftImage from "./LeftImage";
import RightImage from "./RightImage";

function ProductsPage() {
  return (
    <>
      <HeroPage />
      <hr></hr>
      <br></br>
      <LeftImage
        source={"media/images/coin.png"}
        title={"Coin"}
        info={
          "Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        }
      />
      <RightImage
        source={"media/images/kiteconnect.png"}
        title={"Kite Connect API"}
        info={
          "Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase."
        }
      />
      <LeftImage
        source={"media/images/kite.png"}
        title={"Kite"}
        info={
          "Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices"
        }
      />
      <RightImage
        source={"media/images/console.png"}
        title={"Console"}
        info={
          "The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        }
      />

      <br></br>
      <br></br>
    </>
  );
}

export default ProductsPage;
