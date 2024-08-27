import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchDoctors, fetchFacilitiesCount, fetchServicesCount, fetchReviewCount } from "../api/getCategoriesData";
import { FadeInRight } from "./ComponentAnimations";
import AnimateCount from "./AnimateCount";

const CategoryItem = ({ count, label, to, icon }) => (
  <Link
    to={to}
    className="relative flex items-center px-2 bg-white border border-gray-400 md:border-black rounded-md max-w-[191px] md:max-w-[250px] lg:max-w-[310px] h-[70px] md:h-[90px] lg:h-[110px]"
  >
    <div className="flex flex-col gap-[1px]">
      <p className="font-semibold text-sm md:text-base">
        <AnimateCount end={parseInt(count, 10)} />
      </p>
      <p className="font-medium text-xs md:text-sm">{label}</p>
    </div>
    {icon}
  </Link>
);

const ExploreCategories = () => {
  const [counts, setCounts] = useState({
    doctors: '0',
    reviews: '0',
    facilities: '0',
    services: '0'
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetches the cached data from localStorage
        const cachedCounts = localStorage.getItem('categoryCounts');
        if (cachedCounts) {
          setCounts(JSON.parse(cachedCounts));
        }

        // Fetch the new data from the api
        const [doctorsCount, facilitiesCount, servicesCount, reviewsCount] = await Promise.all([
          fetchDoctors(),
          fetchFacilitiesCount(),
          fetchServicesCount(),
          fetchReviewCount()
        ]);

        const newCounts = {
          doctors: doctorsCount.count,
          facilities: facilitiesCount,
          services: servicesCount,
          reviews: reviewsCount
        };

        // Updates the localStorage periodically(every 20 seconds) with new data
        localStorage.setItem('categoryCounts', JSON.stringify(newCounts));
        setCounts(newCounts);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();

    const intervalId = setInterval(fetchCounts, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const categoryIcon = (
    <svg
      className="absolute bottom-0 right-0 fill-current text-gray-300"
      width="48" height="44" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path opacity="0.4" d="M10.6364 38.5715C10.6364 41.4482 12.9684 43.7802 15.8451 43.7802C17.5239 43.7802 19.0997 42.9711 20.078 41.6068L31.4427 25.7582C31.8304 25.2176 32.1216 24.6012 32.3163 23.9092C32.511 23.2171 32.6075 22.5419 32.6058 21.8835C32.604 21.2251 32.4963 20.5799 32.2827 19.948C32.069 19.316 31.789 18.7297 31.4427 18.189L29.1165 14.7648C28.7288 14.2242 28.298 13.8193 27.8242 13.5501C27.3503 13.281 26.855 13.1453 26.338 13.1429C25.8642 13.1429 25.38 13.2786 24.8855 13.5501C24.3909 13.8217 23.949 14.2266 23.5595 14.7648L12.1949 30.6134C11.1814 32.0267 10.6364 33.7221 10.6364 35.4612V38.5715ZM16.1357 38.3736C15.2397 38.3736 14.5133 37.6473 14.5133 36.7512V35.7825C14.5133 35.2408 14.6831 34.7127 14.9988 34.2725L21.0395 25.8483L22.3318 27.4703L23.4949 29.2725L17.4542 37.6967C17.1495 38.1216 16.6586 38.3736 16.1357 38.3736ZM22.3318 27.4703L23.4949 29.2725L21.0395 25.8483L22.3318 27.4703ZM28.1027 38.0754C26.3925 40.4604 28.097 43.7802 31.0318 43.7802H38.0476C40.0382 43.7802 41.652 42.1665 41.652 40.1758C41.652 38.1852 40.0382 36.5714 38.0476 36.5714H31.0318C29.8701 36.5714 28.7796 37.1313 28.1027 38.0754ZM9.17163 60.2405C6.39903 64.107 0.297852 62.1456 0.297852 57.3877V7.73626C0.297852 5.75384 0.80444 4.05737 1.81762 2.64685C2.83079 1.23633 4.04729 0.529869 5.46712 0.527466H46.8212C48.2428 0.527466 49.4602 1.23393 50.4733 2.64685C51.4865 4.05977 51.9922 5.75624 51.9905 7.73626V50.989C51.9905 52.9714 51.4848 54.6691 50.4733 56.082C49.4619 57.4949 48.2445 58.2002 46.8212 58.1978H13.15C11.5722 58.1978 10.0911 58.9583 9.17163 60.2405ZM8.01656 51.5659C8.28238 51.2033 8.70511 50.989 9.15476 50.989H36.8213C42.3441 50.989 46.8212 46.5119 46.8212 40.989V17.7362C46.8212 12.2134 42.3441 7.73626 36.8212 7.73626H5.46712V50.7316C5.46712 52.0957 7.21013 52.6661 8.01656 51.5659Z" />
    </svg>
  );

  return (
    <FadeInRight>
      <section className="w-full flex flex-col gap-4 md:gap-6 lg:gap-10 p-2 py-3 lg:py-6 items-center mt-2 lg:mt-4">
        <h2 className="font-bold text-xl md:text-2xl">Explore Categories</h2>
        <div className="w-full max-w-[400px] md:max-w-[800px] lg:max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 px-2 lg:px-6">
            <CategoryItem count={counts.reviews} label="Reviews" to="#" icon={categoryIcon} />
            <CategoryItem count={counts.doctors} label="Doctors" to="/doctors" icon={categoryIcon} />
            <CategoryItem count={counts.facilities} label="Facilities" to="/hospitals" icon={categoryIcon} />
            <CategoryItem count={counts.services} label="Services" to="/services" icon={categoryIcon} />
          </div>
        </div>
      </section>
    </FadeInRight>
  );
};

export default ExploreCategories;
