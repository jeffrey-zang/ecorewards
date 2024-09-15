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
import { useNavigate } from "@remix-run/react";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "Profile Page" },
  ];
};

export default function Profile(props: any) {
  const [profileData, setProfileData] = useState<any>({});

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
        <button className="m-8 mt-0 bg-red-100 p-2 rounded-md w-full" onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/login');
          toast.success('Logged out successfully!');
        }}>
          Log Out
        </button>
      </div>
    </Card>
  );
}
