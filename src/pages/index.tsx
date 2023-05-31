import BlockchainReader from "@/sections/BlockchainReader";
import WalletCard from "@/sections/WalletCard";
import Layout from "@/site/Layout";
import Head from "next/head";
import React, { useState, useEffect } from "react";

export default function Home(): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Page</title>
      </Head>
      <Layout>
        {/* <WalletCard/> */}
        <BlockchainReader/>
      </Layout>
    </React.Fragment>
  );
}
