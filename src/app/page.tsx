import Navbar from "@/components/layouts/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 shadow-lg border border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome 👋
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Your professional and minimalistic Assignment Portal with dark/light theme.
          </CardContent>
        </Card>
      </main>
    </>
  )
}
