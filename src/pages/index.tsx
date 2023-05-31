import BlockchainReader from "@/sections/BlockchainReader";
import WalletCard from "@/sections/WalletCard";
import WalletConnect from "@/sections/WalletConnect";
import Layout from "@/site/Layout";
import Head from "next/head";
import React, { useState } from "react";

export default function Home(): JSX.Element {
  const [activeTab, setActiveTab] = useState("walletCard");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "walletCard":
        return <WalletCard />;
      case "blockchainReader":
        return <BlockchainReader />;
      case "walletConnect":
        return <WalletConnect />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Page</title>
      </Head>
      <Layout>
        <div className="flex space-x-4 mb-4">
          <button
            className={`text-lg font-medium ${activeTab === "walletCard" ? "text-blue-500" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("walletCard")}
          >
            Wallet Card
          </button>
          <button
            className={`text-lg font-medium ${activeTab === "blockchainReader" ? "text-blue-500" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("blockchainReader")}
          >
            Blockchain Reader
          </button>
          <button
            className={`text-lg font-medium ${activeTab === "walletConnect" ? "text-blue-500" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("walletConnect")}
          >
            Wallet Connect
          </button>
        </div>
        {renderActiveTab()}
      </Layout>
    </React.Fragment>
  );
}
