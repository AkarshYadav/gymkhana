import { notFound } from "next/navigation"
import { Suspense } from "react"
import CommitteeHero from "../_components/committee-hero"
import ClubCard from "../_components/club-card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Container from "@/components/shop/Container";
interface CommitteePageProps {
  params: {
    committeeId: string
  }
}

async function getCommitteeData(committeeId: string) {
  const query = `*[_type == 'committee' && _id == '${committeeId}']{
    _id,
    name,
    description,
    "imageUrl": image.asset->url,
    "generalSecretary": generalSecretary->{
      name,
      email,
      "imageUrl": image.asset->url,
      role
    }
  }[0]`

  const url = `https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()
    return data.result
  } catch (error) {
    console.error("Error fetching committee data:", error)
    return null
  }
}

async function getClubsForCommittee(committeeId: string) {
  const query = `*[_type == 'club' && committee._ref == '${committeeId}']{
    _id,
    name,
    description,
    "imageUrl": image.asset->url,
    "secretary": secretary->{
      name,
      email,
      "imageUrl": image.asset->url,
      role
    }
  }`

  const url = `https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, { next: { revalidate: 60 } })
    const data = await response.json()
    return data.result || []
  } catch (error) {
    console.error("Error fetching clubs data:", error)
    return []
  }
}

function CommitteeLeadershipSkeleton() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div className="p-8 flex flex-col items-center">
        <Skeleton className="w-32 h-32 rounded-full mb-4" />
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  )
}

function ClubsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function CommitteePage({ params }: CommitteePageProps) {
  const committee = await getCommitteeData(params.committeeId)

  if (!committee) {
    notFound()
  }

  const clubs = await getClubsForCommittee(committee._id)

  // Determine theme based on committee name
  const themeMap: Record<string, "technical" | "sports" | "cultural" | "welfare"> = {
    Technical: "technical",
    Sports: "sports",
    Cultural: "cultural",
    Welfare: "welfare",
  }

  // Default to technical if no match, but try to match case-insensitive
  let theme: "technical" | "sports" | "cultural" | "welfare" = "technical"

  Object.entries(themeMap).forEach(([key, value]) => {
    if (committee.name.toLowerCase().includes(key.toLowerCase())) {
      theme = value
    }
  })

  return (
    <div>
      <CommitteeHero
        name={committee.name}
        description={committee.description || ""}
        imageUrl={committee.imageUrl || ""}
        theme={theme}
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12">Our Clubs</h2>

          <Suspense fallback={<ClubsSkeleton />}>
            {clubs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No clubs found for this committee.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubs.map((club, index) => (
                  <ClubCard
                    key={club._id}
                    id={club._id}
                    name={club.name}
                    description={club.description || ""}
                    imageUrl={club.imageUrl || ""}
                    committeeName={committee.name}
                    index={index}
                  />
                ))}
              </div>
            )}
          </Suspense>
        </Container>
      </section>

      {committee.generalSecretary && (
        <section className="relative py-16 text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-orange-500 overflow-hidden">
          {/* Top wave effect */}
          <div className="absolute top-0 left-0 w-full">
            <svg className="w-full h-16 md:h-24 text-white dark:text-gray-900" viewBox="0 0 1440 320">
              <path fill="currentColor" fillOpacity="1" d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,144C1120,139,1280,181,1360,202.7L1440,224V0H0Z"></path>
            </svg>
          </div>

          <div className="container relative z-10">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Committee Leadership</h2>
            <Suspense fallback={<CommitteeLeadershipSkeleton />}>
              <div className="max-w-md mx-auto backdrop-blur-lg bg-white/10 dark:bg-gray-900/30 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6">
                    <Image
                      src={committee.generalSecretary.imageUrl || "/placeholder.svg?height=320&width=320"}
                      alt={committee.generalSecretary.name}
                      layout="fill"
                      objectFit="cover"
                      className="border-4 border-primary rounded-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-1 text-white">
                    {committee.generalSecretary.name}
                  </h3>
                  <p className="text-primary dark:text-primary font-medium text-center mb-2">General Secretary</p>
                  <p className="text-gray-200 dark:text-gray-400 text-center text-sm">
                    {committee.generalSecretary.email}
                  </p>
                </div>
              </div>
            </Suspense>
          </div>

          {/* Bottom wave effect */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-16 md:h-24 text-white dark:text-gray-900" viewBox="0 0 1440 320">
              <path fill="currentColor" fillOpacity="1" d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,144C1120,139,1280,181,1360,202.7L1440,224V320H0Z"></path>
            </svg>
          </div>
        </section>
      )}
    </div>
  )
}

