import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import Streak from "../components/Profile/Streak";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
// import { Leaf, Award, History } from "lucide-react"
import PointsDisplay from "../components/Profile/PointsDisplay";
import MilestonesList from "../components/Profile/MilestonesList";
import avatar from "../assets/avatar.svg";
// import EcoActionsHistory from "~/components/History/EcoActionsHistory";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "Profile Page" },
  ];
};

export default function Profile(props: any) {
  const [profileData, setProfileData] = useState<any>({});

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://129.97.124.233:5173/api/v1/members/${props?.memberId}`
        );
        const json = await response.json();
        setProfileData(json || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (accessToken) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center pb-4">
          <Avatar className="h-20 w-20">
            <img src={avatar} alt="User's avatar" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="pl-4">
            <CardTitle className="text-2xl">{profileData?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {profileData?.points < 1000
                ? "Eco Beginner"
                : profileData?.points > 1000 && profileData?.points < 5000
                ? "Eco Warrior"
                : "Eco Master"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Streak streakDays={5} />
          <PointsDisplay points={profileData?.points} />
          <MilestonesList points={profileData?.points} />
        </CardContent>
        <div className="flex w-full">
          <button className="m-8 mt-0 bg-red-100 p-2 rounded-md w-full">
            Log Out
          </button>
        </div>
      </Card>
    );
  }

}
