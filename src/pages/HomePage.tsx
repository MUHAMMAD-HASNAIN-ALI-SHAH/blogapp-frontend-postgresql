import Hero from "../components/home/Hero"
import HomeBlogs from "../components/home/HomeBlogs"

const HomePage = () => {
    return (
        <div className="w-full mt-1">
            <div className="w-full max-w-7xl mx-auto">
                <Hero />
                <HomeBlogs />
            </div>
        </div>
    )
}

export default HomePage
