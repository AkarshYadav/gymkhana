import HeroBanner from "./_components/(hero)/HeroBanner";
import AboutUs from "./_components/(aboutus)/AboutUs";
import Committees from "./_components/(committee)/Committees";
import Events from "./_components/(events)/Events";
import ShoppingSection from "./_components/(shop)/ShoppingSection";
export default async function Home() {
  const latestResponse = await fetch('https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=*[_type == "product"] | order(_createdAt desc) [0..2] { _id, title, intro, images[] { "url": asset->url }, price, discount, status, variant, stock }');
  const latestData = await latestResponse.json();
  const latestProducts = latestData.result;

  return (
    <>
      <HeroBanner />
      <AboutUs />
      <Committees />
      <Events />
      <ShoppingSection latestProducts={latestProducts} />
    </>
  );
}


