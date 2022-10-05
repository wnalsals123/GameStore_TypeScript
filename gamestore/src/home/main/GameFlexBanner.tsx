import { Carousel } from "flowbite-react";
import summerDeal from '../../img/summer-deal.png'
import newOrder from "../../img/new-order.png"
import welcome from "../../img/welcome2022.png"
import React from "react";

/* 사이트 배너 */
const GameFlexBanner = () => {
  return (
    <div className="h-56 sm:h-80 lg:h-96 xl:h-[26rem] 3xl:m-5 2xl:mt-5 3xl:mt-6">
      <Carousel slideInterval={6000}>
        <img className="object-cover h-full" src={summerDeal} alt="summer-sale"/>
        <img className="object-cover h-full" src={welcome} alt="welcome"/>
        <img className="object-cover h-full" src={newOrder} alt="new-order"/>
      </Carousel>
    </div>
  )
}

export default React.memo(GameFlexBanner);