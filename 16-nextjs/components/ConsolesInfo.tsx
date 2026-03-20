import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from 'next/image';
const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    }),
})

export default async function ConsolesInfo() {
    const consoles = await prisma.console.findMany()

    return (
        <div>
            <h1 className='text-4xl text-purple-400 border-b-2 pb-2 mb-8'>Consoles</h1>
            <div>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {consoles.map((console) => (
                        <div key={console.id} className="card bg-black-100 w-96 h-[420px] shadow-sm flex flex-col border-2 border-purple-400">
                            <figure className="w-full h-60 relative">
                                <Image
                                    src={`/img/${console.image}`}
                                    alt={console.image}
                                    fill
                                    className="object-cover"
                                />
                            </figure>
                            <div className="card-body flex flex-col justify-between bg-black/40 text-white h-150px">       
                                <h2 className="card-title">
                                    {console.name}
                                </h2>
                                <h4 className="text-white/60">Manufacurer {console.manuFacturer}</h4>
                                <div className="card-actions justbtn-outlineify-end flex">
                                    <div className="btn btn-outline btn-warning">Edit</div>
                                    <div className="btn btn-outline btn-info">View</div>
                                    <div className="btn btn-outline btn-error">Delete</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
        )
}

