import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import EcoActionsHistory from "../components/History/EcoActionsHistory";
import EcoPointsLeaderboard from "../components/History/EcoPointsLeaderboard";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "Profile Page" },
  ];
};

const Navigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  })

  return null;
}

export default function History(props: any) {
  const [history, setHistory] = useState<any>({});
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setAccessToken(localStorage.getItem("accessToken"));
      // try {
      //   const response = await fetch(
      //     `http://_/api/v1/members/${props?.memberId}`
      //   );
      //   const json = await response.json();
      //   setProfileData(json || {});
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }

      console.log(localStorage.getItem("accessToken"));
    };

    fetchData();
  }, []);

  if (!accessToken) {
    return (
      <Navigate />
    )
  }

  return (
    <div>
      <EcoPointsLeaderboard /> <EcoActionsHistory />
    </div>
  );
}
