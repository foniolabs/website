import React from 'react'


const countries = [
  { name: "Comoros", flag: "🇰🇲" },
  { name: "Costa Rica", flag: "🇨🇷" },
  { name: "Croatia", flag: "🇭🇷" },
  { name: "Cambodia", flag: "🇰🇭" },
  { name: "Cameroon", flag: "🇨🇲" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Cape Verde", flag: "🇨🇻" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "Colombia", flag: "🇨🇴", disabled: true },
];


const Features = () => {


  return (
<>
   {/* <div className='mt-20 lg:mt-44 -mb-20 lg:-mb-0'>
      <h1 className='text-center font-semibold text-2xl lg:text-[80px] -mb-10 lg:-mb-32'>Features</h1>
  <h1 className='text-center font-semibold text-2xl lg:text-[80px] rotate-180 opacity-20'>Features</h1>
   </div> */}

 <div className="flex flex-col lg:flex-row rounded-[24px] overflow-hidden h-[800px] mt-20 lg:mt-44 mb-2 font-sans bg-white lg:mx-20 ">
 <div>

 </div>
      {/* Left side */}
      <div className="flex-1 px-5 py-10 flex flex-col justify-center text-black lg:-mt-60">
        <h1 className="font-extrabold text-[36px] md:text-[60px] leading-tight m-0">
          Multi-Chain
          <br />
          Portfolio Tracking
        </h1>
        <strong className="mt-7 text-[22px]">All your assets in one view</strong>
        <p className="mt-2 text-[14px] lg:w-[400px] lg:text-[20px] text-gray-400">
          Track your DeFi portfolio across multiple blockchain networks, with real-time updates
          and comprehensive analytics.
        </p>
      </div>

      {/* Right side */}
      <div
        className="flex-1 relative flex flex-col justify-between p-8 text-white font-semibold text-sm  rounded-br-[24px] h-[150px] lg:h-[800px] rounded-tr-[24px] w-[400px]"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/szMdJ1k7ngrAgHVj7MLZmBF0TU.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
<div className="relative overflow-hidden lg:h-[700px] h-[400px]">
  <div className="animate-[slideup_30s_linear_infinite]">
    <ul className="flex flex-col gap-3 m-0 p-0 list-none drop-shadow-lg">
      {countries.concat(countries).map(({ name, flag, disabled }, i) => (
        <li
          key={i}
          className={`flex items-center gap-2 cursor-pointer ${
            disabled ? 'opacity-30 cursor-default' : ''
          }`}
        >
          <span
            role="img"
            aria-label={`${name} flag`}
            className="lg:text-[50px] text-[20px] leading-none"
          >
            {flag}
          </span>
          <span>{name}</span>
        </li>
      ))}
    </ul>
  </div>
</div>




        <div className="relative lg:right-0 bottom-3 lg:bottom-0 right-8 lg:self-end text-right font-medium text-[80px] lg:text-[250px] leading-none drop-shadow-lg">
          10
          <span className=" text-[30px] lg:text-[68px] ml-1">+</span>
          <div className=" text-[12px] lg:text-[22px] font-normal lg:mt-[-1rem]">Supported Networks</div>
        </div>
      </div>
    </div>

    {/* 2 */}


     <div className="flex flex-col lg:flex-row rounded-[24px] overflow-hidden h-[800px] mb-2 font-sans bg-white lg:mx-20 ">
      {/* Left side */}
      <div className="flex-1 px-5 py-10 flex flex-col justify-center text-black lg:-mt-60">
        <h1 className="font-extrabold text-[36px] lg:text-[60px] leading-tight m-0">
  AI-Driven Insights
  <br />
  For Smarter Decisions
</h1>
<strong className="mt-7 text-[22px]">
  Let AI find the best opportunities
</strong>
<p className="mt-2 text-[14px] lg:w-[400px] lg:text-[20px] text-gray-400">
  Get personalized recommendations for yield optimization, risk management, and portfolio
  rebalancing — powered by advanced AI algorithms that analyze real-time market data.
</p>

      </div>

      {/* Right side */}
      <div
        className="flex-1 relative flex flex-col justify-between p-8 text-white font-semibold text-sm rounded-tr-[24px] rounded-br-[24px] w-[400px]"
        style={{
          backgroundImage:
            'url("https://vgrouplimited.com/wp-content/uploads/2023/01/AdobeStock_1768853141.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >




        <div className="relative lg:right-0 top-[215px] lg:top-[450px] right-8 lg:self-end text-right font-medium text-[80px] lg:text-[250px] leading-none drop-shadow-lg">
          24
          <span className=" text-[30px] lg:text-[68px] ml-1">/7</span>
          <div className=" text-[12px] lg:text-[22px] font-normal lg:mt-[-1rem]">Real-Time Monitoring</div>
        </div>
      </div>
    </div>

    {/* 3 */}


     <div className="flex flex-col lg:flex-row rounded-[24px] overflow-hidden h-[800px]  mb-44 font-sans bg-white lg:mx-20 ">
      {/* Left side */}
      <div className="flex-1 px-5 py-10 flex flex-col justify-center text-black lg:-mt-60">
        <h1 className="font-extrabold text-[36px] lg:text-[60px] leading-tight m-0">
          Automated Strategy
          <br />
          Execution
        </h1>
        <strong className="mt-7 text-[22px]">Set it and forget it</strong>
        <p className="mt-2 text-[14px] lg:w-[400px] lg:text-[20px] text-gray-400">
         Execute complex DeFi strategies with a single click. Liqtra automates
          cross-chain transactions, protocol interactions, and portfolio rebalancing
         for maximum efficiency.
        </p>
      </div>

      {/* Right side */}
      <div
        className="flex-1 relative flex flex-col justify-between p-8 text-white font-semibold text-sm rounded-tr-[24px] rounded-br-[24px] w-[400px]"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/CWEUlbKfbmpNM4P2TeqjsQl6lI.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >




        <div className="relative lg:right-0 right-8 top-[235px] lg:top-[450px] lg:self-end text-right font-medium text-[80px] lg:text-[250px] leading-none drop-shadow-lg">
          1
          <span className=" text-[30px] lg:text-[68px] ml-1">Click</span>
          <div className=" text-[12px] lg:text-[22px] font-normal lg:mt-[-1rem]">Strategy Deployment</div>
        </div>
      </div>
    </div>
</>
  );
};

export default Features