import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Trophy, ChevronUp, ChevronDown } from 'lucide-react'

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Alice", animal: "eagle", points: 1200 },
  { id: 2, name: "Bob", animal: "wolf", points: 1150 },
  { id: 3, name: "Charlie", animal: "squirrel", points: 1100 },
  { id: 4, name: "David", animal: "bird", points: 1050 },
  { id: 5, name: "Eve", animal: "turtle", points: 1000 },
  { id: 6, name: "Frank", animal: "eagle", points: 950 },
  { id: 7, name: "Grace", animal: "wolf", points: 900 },
  { id: 8, name: "Henry", animal: "squirrel", points: 850 },
  { id: 9, name: "Ivy", animal: "bird", points: 800 },
  { id: 10, name: "Jack", animal: "turtle", points: 750 },
]

const animalEmojis: { [key: string]: string } = {
  turtle: "🐢",
  squirrel: "🐿️",
  bird: "🐦",
  wolf: "🐺",
  eagle: "🦅",
}

export default function Component() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const sortedData = [...leaderboardData].sort((a, b) => 
    sortOrder === 'desc' ? b.points - a.points : a.points - b.points
  )
  const maxPoints = Math.max(...sortedData.map(user => user.points))

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-green-600 text-white">
          <h1 className="text-2xl font-bold flex items-center justify-center">
            <Trophy className="mr-2" /> Eco Leaderboard
          </h1>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800">Weekly Rankings</h2>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              {sortOrder === 'desc' ? <ChevronDown className="mr-2" /> : <ChevronUp className="mr-2" />}
              {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
            </Button>
          </div>
          <ScrollArea className="h-[60vh]">
            {sortedData.map((user, index) => (
              <div key={user.id} className="mb-4 last:mb-0">
                <div className="flex items-center mb-1">
                  <span className="text-md font-semibold text-green-800 w-8">{index + 1}.</span>
                  <span className="text-md font-medium flex-grow">{user.name}</span>
                  <span className="text-md font-semibold text-green-600">{user.points} pts</span>
                </div>
                <div className="relative h-12 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-green-300 rounded-full flex items-center justify-end pr-2 transition-all duration-500 ease-out"
                    style={{ width: `${(user.points / maxPoints) * 100}%` }}
                  >
                    <span className="text-2xl">{animalEmojis[user.animal]}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
