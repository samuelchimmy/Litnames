
import React from 'react';
import { Activity, Zap, Shield, TrendingUp } from 'lucide-react';
import { ProjectPhase, RoadmapStep } from './types';

export const LIGHTER_REF_URL = "https://app.lighter.xyz/?referral=LIGHTERDASH";

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    phase: ProjectPhase.BUILDING,
    title: "Lighter Protocol Architecture",
    description: "Designing the custom naming layer specifically for Lighter's high-performance execution environment. Implementation of ERC721Lit.",
    status: 'completed'
  },
  {
    phase: ProjectPhase.SETTING_UP,
    title: "Verifiable Resolution Nodes",
    description: "Deploying Registry and Router on Lighter Mainnet. Setting up verifiable resolution endpoints for the Lighter DEX.",
    status: 'current'
  },
  {
    phase: ProjectPhase.INTEGRATION,
    title: "Orderbook Integration",
    description: "Collaborating with Lighter core devs to show .lit names in the orderbook and trade history.",
    status: 'upcoming'
  },
  {
    phase: ProjectPhase.COLLABORATION,
    title: "Liquidity Provider Rewards",
    description: "Exclusive .lit badges and suffixes for top Lighter Market Makers and Liquidity Providers.",
    status: 'upcoming'
  },
  {
    phase: ProjectPhase.MARKETING,
    title: "Lighter Genesis Launch",
    description: "Major marketing push to the Lighter community. Genesis auction for trading-related premiums (e.g. whale.lit).",
    status: 'upcoming'
  }
];

export const FEATURES = [
  {
    icon: <Activity className="w-6 h-6 text-orange-500" />,
    title: "DEX Native",
    description: "Built specifically to display your identity across the Lighter.xyz orderbooks and trade history."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "High Performance",
    description: "Optimized resolution times matching Lighter's trad-fi level exchange speeds."
  },
  {
    icon: <Shield className="w-6 h-6 text-orange-400" />,
    title: "Verifiable Identity",
    description: "Verifiable order matching meets verifiable identity. Fully on-chain and trustless."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
    title: "Trader Profiles",
    description: "Link your trading stats and records directly to your .lit domain via text records."
  }
];
