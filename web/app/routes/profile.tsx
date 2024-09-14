import type { MetaFunction } from "@remix-run/node";
import Streak from "../components/Profile/Streak";

export const meta: MetaFunction = () => {
  return [
    { title: "EcoRewards - Profile" },
    { name: "description", content: "asdfasd" },
  ];
};

export default function Profile() {
  return (
    <div><Streak/></div>
  );
}