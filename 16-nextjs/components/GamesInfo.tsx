import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    }),
})

export default async function GamesInfo() {
    const games = await prisma.game.findMany({
        include: { console: true },
    })

    return (
        <div>
            <h1 className='text-4xl border-b2 pb-2 mb-8'>Games</h1>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {games.map((game) => (
                    <div key={game.id} className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            
                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h4>${game.price}</h4>
                            <h2 className="card-title">
                                {game.title}
                            </h2>
                            <h4 className="text-black/60">Disponible para {game.console.name}</h4>
                            <h4 className="text-black/60">Genre: {game.genre}</h4>
                            <div className="card-actions justify-end">
                                <div className="btn btn-soft btn-success">Add</div>
                                <div className="btn btn-soft btn-warning">Edit</div>
                                <div className="btn btn-soft btn-info">View</div>
                                <div className="btn btn-soft btn-error">Delete</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}