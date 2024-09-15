import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { useNavigate } from "@remix-run/react";

export default function Claim () {
    const [isAnimating, setIsAnimating] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const navigate = useNavigate()
  
    useEffect(() => {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
  
      // Set initial size
      handleResize()
  
      // Add event listener
      window.addEventListener("resize", handleResize)
  
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 5000)
  
      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize)
        clearTimeout(timer)
      }
    }, [])
  
    const handleNavigateHome = () => {
      navigate("/")
    }

  return (
    <div className="h-full bg-green-50 flex items-center justify-center p-4">
      {isAnimating && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-3xl font-bold text-green-600 text-center"
            >
              Congratulations!
            </motion.div>
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
          <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 60 }}
            >
              You've received Eco Points!
            </motion.div>
            
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-4xl font-bold text-green-500 mb-2">1000</p>
            <p className="text-xl text-gray-700">Points Added</p>
          </motion.div>
        </CardContent>
        <CardFooter className="flex justify-center">
        <Button 
            variant="outline" 
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleNavigateHome}
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}