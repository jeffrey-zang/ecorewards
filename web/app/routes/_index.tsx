import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";

import TreesImage from "~/assets/trees.webp";

export const meta: MetaFunction = () => {
  return [{ title: "EcoRewards" }, { name: "description", content: "asdfasd" }];
};

export default function Index() {
  const rewards = [
    {
      id: 1,
      name:"$10 Prepaid Visa",
      points: 10000,
      image: "https://via.placeholder.com/150",
      description: "Get a $10 prepaid Visa gift card to spend on anything you want.",
      category: "Gift Cards",
    },
    {
      id: 2,
      name: "25% off Beyond Meat",
      points: 5000,
      image: "https://via.placeholder.com/150",
      description: "Get 25% off your next purchase of Beyond Meat products.",
      category: "Food",
    },
    {
      id: 3,
      name: "Plant a tree",
      points: 1000,
      image: "https://via.placeholder.com/150",
      description: "Plant a tree in a forest to help offset your carbon footprint.",
      category: "Carbon Offsets",
    },
    {
      id: 4,
      name: "1 month of Netflix",
      points: 5000,
      image: "https://via.placeholder.com/150",
      description: "Get 1 month of Netflix for free.",
      category: "Entertainment",
    },
    {
      id: 5,
      name: "1 month of Spotify",
      points: 5000,
      image: "https://via.placeholder.com/150",
      description: "Get 1 month of Spotify for free.",
      category: "Entertainment",
    },
    {
      id: 6,
      name: "1 month of Amazon Prime",
      points: 5000,
      image: "https://via.placeholder.com/150",
      description: "Get 1 month of Amazon Prime for free.",
      category: "Entertainment",
    },
    {
      id: 7,
      name: "50 pack of Yes Straws",
      points: 5000,
      image: "https://via.placeholder.com/150",
      description: "Get a 50 pack of Yes Straws to help reduce plastic waste.",
      category: "Miscellaneous",
    }
  ]
  const categorizedRewards = rewards.reduce((acc, reward) => {
    if (!acc[reward.category]) {
      acc[reward.category] = [];
    }
    acc[reward.category].push(reward);
    return acc;
  }
  , {} as Record<string, typeof rewards>);
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <div className="sticky top-0 w-full">
        <div className="relative flex h-12 w-full">
          <Search className="absolute left-2 top-3" />
          <button
            className="!absolute right-2 top-2 z-10 select-none rounded bg-green-600 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Search
          </button>
          <input
            type="url"
            className="h-full w-full rounded-lg border border-[#bbb] bg-transparent pl-10 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            required
            placeholder="What are you looking for?"
          />
        </div>
      </div> */}
      <SearchBar className="relative w-full" />
      <div className="flex flex-col w-full mt-4 h-screen">
        <div className="rounded-lg w-full p-8" style={{
            backgroundImage: `url(${TreesImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
          <h1 className="text-4xl font-bold text-white">Carbon Offsets</h1>
          <p className="text-gray-300 text-sm mt-3">Offset your carbon footprint by redeeming your points to support projects that reduce greenhouse gas emissions like tree planting.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4">Learn More &rarr;</button>
        </div>
        <div className="flex flex-col w-full mt-4">
          {Object.entries(categorizedRewards).map(([category, rewards]) => (
            <div key={category} className="flex flex-col w-full mt-4">
              <h2 className="text-2xl font-bold">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {rewards.map(reward => (
                  <div key={reward.id} className="rounded-lg bg-white shadow-md p-4">
                    <img src={reward.image} alt={reward.name} className="w-full h-40 object-cover rounded-lg" />
                    <h3 className="text-xl font-bold mt-2">{reward.name}</h3>
                    <p className="text-gray-500 mt-1">{reward.description}</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4">{reward.points.toLocaleString()} Points</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchBar(props: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/?a=true`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFormSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form className="relative top-0 w-full" onSubmit={handleFormSubmit} {...props}>
      <Input
        className="w-full"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        name="search"
        autoComplete="one-time-code"
      />
      <button
        type="submit"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width={512}
          height={512}
          className="text-gray-600 h-4 w-4 fill-current"
          viewBox="0 0 56.966 56.966"
        >
          <path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" />
        </svg>
      </button>
    </form>
  );
}
