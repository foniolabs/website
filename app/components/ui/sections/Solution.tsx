import React from 'react'
import {
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaBolt,
  FaNetworkWired,
  FaLightbulb,
} from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}


const Solution = () => {
  
  const card: CardProps[] = [
  {
    title: "Unified Cross-Chain Dashboard",
    description:
      "View your entire DeFi portfolio across multiple networks in one place. Track assets, yields, and performance with real-time data and insights.",
    icon: <FaNetworkWired />,
    bgColor: "bg-white",
  },
  {
    title: "AI-Powered Recommendations",
    description:
      "Get intelligent, personalized strategy recommendations based on your portfolio, risk tolerance, and market conditions. Let AI find the best opportunities.",
    icon: <FaRobot />,
    bgColor: "bg-blue-500",
  },
  {
    title: "Smart Risk Management",
    description:
      "Automated risk monitoring and alerts protect your portfolio. Liqtra identifies potential risks and suggests hedging strategies to minimize losses.",
    icon: <FaShieldAlt />,
    bgColor: "bg-orange-700",
  },
  {
    title: "Real-Time Portfolio Optimization",
    description:
      "Continuously optimize your positions for maximum yield. Liqtra automatically rebalances and adjusts strategies based on changing market conditions.",
    icon: <FaChartLine />,
    bgColor: "bg-purple-200",
  },
  {
    title: "Instant Yield Opportunities",
    description:
      "Discover the best yield farming and liquidity provision opportunities across chains. Get notified when new profitable strategies emerge.",
    icon: <FaLightbulb />,
    bgColor: "bg-sky-300",
  },
  {
    title: "Lightning-Fast Execution",
    description:
      "Execute strategies instantly with one click. Liqtra handles all the complexity of cross-chain transactions and protocol interactions.",
    icon: <FaBolt />,
    bgColor: "bg-orange-500",
  },
];
  return (
<>

     {/* <div className='mt-32 lg:mt-44 -mb-20 lg:-mb-44'>
       <h1 className='text-center font-semibold text-2xl lg:text-[80px]'>Solution</h1>
    <h1 className='text-center font-semibold text-2xl rotate-12 opacity-20 lg:text-[80px] relative lg:bottom-7'>Solution</h1>
     </div> */}

     <div className="mt-36 lg:mt-72 text-center">
        <h2 className="font-semibold text-lg lg:text-2xl text-neutral-600 mt-4 max-w-3xl mx-auto">
          Liqtra: Your AI-Powered DeFi Co-Pilot for Smarter, Safer, and More Profitable Portfolio Management
        </h2>
      </div>

   <div className="mt-20 lg:mt-40 p-4 lg:px-22 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
   
      {card.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl p-6 bg-transparent card text-black flex flex-col shadow-xl justify-between min-h-[200px] hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer`}
        >
          <div className='text-white'>
            <h3 className="font-bold text-2xl mb-7">{card.title}</h3>
            <p className="text-md">{card.description}</p>
          </div>
          <div className="self-end text-2xl lg:text-4xl mt-12 p-3 bg-black text-white  flex items-center justify-center rounded-full">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
</>
  );
};

export default Solution