import {useState, useEffect} from 'react'
import type { MetaFunction } from "@remix-run/node";
import EcoActionsHistory from "../components/History/EcoActionsHistory"
import EcoPointsLeaderboard from "../components/History/EcoPointsLeaderboard"

export const meta: MetaFunction = () => {
    return [
      { title: "EcoRewards - Profile" },
      { name: "description", content: "Profile Page" },
    ];
  };
  
  export default function History(props: any) {
    const [history, setHistory] = useState<any>({});
    return <div><EcoPointsLeaderboard/> <EcoActionsHistory/>
    
    </div>
  }