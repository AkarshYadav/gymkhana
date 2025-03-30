import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Mail, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import MemberCard from "../../_components/member-card"
import Link from "next/link"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/shop/Container";
interface ClubPageProps {
    params: {
        committeeId: string
        club: string
    }
}

async function getClubData(clubId: string) {
    const query = `*[_type == 'club' && _id == '${clubId}']{
    _id,
    name,
    description,
    "imageUrl": image.asset->url,
    "committee": committee->{
      _id,
      name
    },
    "secretary": secretary->{
      name,
      email,
      "imageUrl": image.asset->url,
      role
    },
    "members": members[]->{
      _id,
      name,
      email,
      "imageUrl": image.asset->url,
      role,
      "clubs": clubs[]->name
    }
  }[0]`

    const url = `https://aiqtrfyk.api.sanity.io/v2025-01-26/data/query/production?query=${encodeURIComponent(query)}`

    try {
        const response = await fetch(url, { next: { revalidate: 60 } })
        const data = await response.json()
        return data.result
    } catch (error) {
        console.error("Error fetching club data:", error)
        return null
    }
}

function getThemeColors(committeeName: string) {
    switch (committeeName.toLowerCase()) {
        case "technical":
            return {
                bg: "from-blue-900 to-indigo-800",
                text: "text-blue-500",
                accent: "bg-blue-500",
                pattern: 'url("/patterns/circuit-board.png")',
            }
        case "sports":
            return {
                bg: "from-orange-800 to-red-700",
                text: "text-orange-500",
                accent: "bg-orange-500",
                pattern: 'url("/patterns/sports-pattern.png")',
            }
        case "cultural":
            return {
                bg: "from-purple-900 to-pink-800",
                text: "text-purple-500",
                accent: "bg-purple-500",
                pattern: 'url("/patterns/artistic-pattern.png")',
            }
        case "welfare":
            return {
                bg: "from-green-900 to-emerald-800",
                text: "text-green-500",
                accent: "bg-green-500",
                pattern: 'url("/patterns/leaves-pattern.png")',
            }
        default:
            return {
                bg: "from-gray-900 to-slate-800",
                text: "text-blue-500",
                accent: "bg-blue-500",
                pattern: 'url("/patterns/dots.svg")',
            }
    }
}

function MembersSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default async function ClubPage({ params }: ClubPageProps) {
    const club = await getClubData(params.club)

    if (!club) {
        notFound()
    }

    const theme = getThemeColors(club.committee.name)

    return (
        <div>
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-br ${theme.bg} py-16 md:py-24 overflow-hidden`}>
                {/* Background pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: theme.pattern, backgroundSize: "cover" }}
                ></div>

                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className={`absolute rounded-full ${theme.accent} opacity-20`}
                            style={{
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Background image overlay */}
                {club.imageUrl && (
                    <div className="absolute inset-0 opacity-20">
                        <Image src={club.imageUrl || "/placeholder.svg"} alt={club.name} fill className="object-cover" priority />
                    </div>
                )}

                <div className="container relative z-10">
                    <Link href={`/committees/${club.committee._id}`}>
                        <Button variant="ghost" className="mb-8 text-white hover:bg-white/10 hover:text-white">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {club.committee.name}
                        </Button>
                    </Link>

                    <div className="flex flex-col-reverse md:flex-row gap-12 items-center justify-center">
                        <div>
                            <div className={`h-1 ${theme.accent} w-20 mb-6`}></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{club.name}</h1>
                            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">{club.description}</p>

                            {club.secretary && (
                                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-flex items-center gap-6 border border-white/20">
                                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                                        <Image
                                            src={club.secretary.imageUrl || "/placeholder.svg?height=160&width=160"}
                                            alt={club.secretary.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white/70 mb-1">Club Secretary</p>
                                        <p className="text-xl font-medium text-white">{club.secretary.name}</p>
                                        <p className="text-sm text-white/70 mt-1 flex items-center">
                                            <Mail className="h-3 w-3 mr-1" /> {club.secretary.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative w-64 h-64 shrink-0 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                            <Image
                                src={club.imageUrl || "/placeholder.svg?height=640&width=640"}
                                alt={club.name}
                                fill
                                className=""
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom wave/curve decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 54C1248 48 1344 48 1392 48L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
                            fill="white"
                            className="dark:fill-gray-800"
                        />
                    </svg>
                </div>
            </section>

            {/* Members Section */}
            <section className="bg-white dark:bg-gray-800 py-16 md:py-24">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Club Members</h2>
                            <div className={`h-1 ${theme.accent} w-16 mt-3`}></div>
                        </div>

                        {club.members && (
                            <div className="flex items-center mt-4 md:mt-0 text-gray-700 dark:text-gray-300">
                                <Users className="h-5 w-5 mr-2" />
                                <span className="text-lg font-medium">{club.members.length} Members</span>
                            </div>
                        )}
                    </div>

                    <Suspense fallback={<MembersSkeleton />}>
                        {!club.members || club.members.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <Users size={48} className="text-gray-300 mb-4" />
                                <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">No Members Yet</h3>
                                <p className="text-muted-foreground max-w-md">
                                    No members found for this club. New members will appear here when they join.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {club.members.map((member, index) => (
                                    <MemberCard
                                        key={member._id}
                                        name={member.name}
                                        email={member.email || ""}
                                        imageUrl={member.imageUrl || ""}
                                        role={member.role || "member"}
                                        clubs={member.clubs || []}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}
                    </Suspense>
                </Container>
            </section>
        </div>
    )
}

