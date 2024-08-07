import BackupImage from "../assests/backup.jpg"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTitle } from "../hooks/useTitle"

export const MovieDetail = () => {

  const params = useParams()
  const [ data, setData ] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const image = data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : BackupImage;
  //eslint-disable-next-line
  const pageTitle = useTitle(data.title);

  useEffect(() => {
    async function fetchMovie(){
      try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=eea906a28f0e32b3402e24819c189c0b`)
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const json = await response.json()
        setData(json);
        setLoading(false);
      } catch (error){
        setError(error);
        setLoading(false);
      }
    }
    fetchMovie();
  }, [params.id])

  console.log(data);

  function formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  }

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No movie data</div>;
  }

  console.log(data)

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5 ">
        <div className="max-w-s">
            <img className="rounded" src={image} alt={data.title} />
        </div>  
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
            <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{data.title}</h1>
            <p className="my-4 text-justify">{data.overview}</p>
            <div className="flex">
              { data.genres ? 
              <p className="my-7 flex flex-wrap gap-2">
                { data.genres.map((genre) => (
                  <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2" key={genre.id}>{genre.name}</span>
                )) }  
              </p> : ""}
            </div>
            
            <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p className="ms-2 text-gray-900 dark:text-white">{data.vote_average}</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <span className=" text-gray-900 dark:text-white">({formatNumber(data.vote_count)})</span>
            </div>
            <p className="my-4">
              <span className="mr-2 font-bold">Status:</span> 
              {data.status}
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Popularity:</span> 
              {formatNumber(data.popularity)}
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Production Companies:</span> 
              {data.production_companies.map(company => company.name).join(', ')}
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Production Countries:</span> 
              {data.production_countries.map(country => country.name).join(', ')}
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Spoken Languages:</span> 
              {data.spoken_languages.map(language => language.name).join(', ') || "N/A"}
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">RunTime:</span>
              <span>{formatRuntime(data.runtime)}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Budget:</span>
              <span>{formatNumber(data.budget)}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Revenue:</span>
              <span>{formatNumber(data.revenue)}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Release Date:</span>
              <span>{data.release_date}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Language:</span>
              <span>{data.original_language.toUpperCase()}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Spoken Languages:</span>
              <span>{data.spoken_languages.map(language => language.name).join(', ')}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Belongs to Collection:</span>
              <span>{data.belongs_to_collection?.name || 'N/A'}</span>
            </p>
            <p className="my-4">
              <span className="mr-2 font-bold">Adult:</span>
              <span>{data.adult ? 'Yes' : 'No'}</span>
            </p>

            <p className="my-4">
              <span className="mr-2 font-bold">Homepage:</span>
              <a href={data.homepage} target="_blank" rel="noreferrer">{data.homepage}</a>
            </p>

            <p className="my-4">
              <span className="mr-2 font-bold">IMDB Code:</span>
              <a href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noreferrer">{data.imdb_id}</a>
            </p>
            
        </div>  
      </section>
    </main>
  )
}
