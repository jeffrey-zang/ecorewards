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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <EcoPointsLeaderboard /> <EcoActionsHistory />
    </div>
  );
}
