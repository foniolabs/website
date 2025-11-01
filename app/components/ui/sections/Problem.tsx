import React from "react";
import {
  FaChartLine,
  FaNetworkWired,
  FaBrain,
  FaExclamationTriangle,
  FaClock,
  FaTools,
} from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Problem = () => {
  const problems: CardProps[] = [
    {
      title: "Fragmented Portfolio Tracking",
      description:
        "Managing assets across multiple chains and protocols is overwhelming. Users struggle to get a complete view of their DeFi portfolio.",
      icon: <FaNetworkWired />,
    },
    {
      title: "Complexity Overload",
      description:
        "DeFi protocols are complex and intimidating. Most users lack the knowledge to optimize yields and manage risks effectively.",
      icon: <FaBrain />,
    },
    {
      title: "Risk Management Gaps",
      description:
        "Without proper tools, users are exposed to impermanent loss, smart contract risks, and poor investment decisions.",
      icon: <FaExclamationTriangle />,
    },
    {
      title: "Time-Consuming Research",
      description:
        "Finding the best yield opportunities across chains requires hours of research, monitoring, and manual comparison.",
      icon: <FaClock />,
    },
    {
      title: "Missed Opportunities",
      description:
        "Market conditions change rapidly. Without real-time insights and alerts, users miss profitable opportunities.",
      icon: <FaChartLine />,
    },
    {
      title: "Technical Barriers",
      description:
        "Interacting with multiple wallets, bridges, and protocols creates friction and increases the chance of costly mistakes.",
      icon: <FaTools />,
    },
  ];

  return (
    <>
      {/* Heading */}
      <div className="mt-32 lg:mt-44 text-center">
        <h2 className="font-semibold text-lg lg:text-2xl text-neutral-600 mt-4 max-w-3xl mx-auto">
          DeFi users face fragmented experiences, complex interfaces, and overwhelming choices
          when trying to optimize their on-chain portfolios across multiple networks.
        </h2>
      </div>

      {/* Problem Cards */}
      <div className="mt-16 lg:mt-32 p-4 lg:px-22 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {problems.map((problem, index) => (
          <div
            key={index}
            className="p-10 lg:p-14 bg-gray-100 rounded-md shadow-md  cursor-pointer flex flex-col"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl text-[#444444] rounded-2xl lg:text-4xl">{problem.icon}</div>
              <div>
                <h3 className="font-bold text-xl mb-2">{problem.title}</h3>
                <p className="text-md">{problem.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Problem;
