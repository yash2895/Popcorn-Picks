"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
const Page = ({ params }) => {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const id = (await params).id;
      const data = await fetch(`/api/movies/title?id=${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data;
        });

      setDetail(data.data);
    };
    loadData();
  }, []);

  return (
    <>
      {detail == null && (
        <div className="loadercontainer ">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}
      {detail != null && (
        <div className="container py-20 max-w-screen-2xl mx-auto min-h-[calc(100vh-75px)]  p-4 flex gap-10 flex-col ">
          <h1 className="text-6xl font-bold px-10 ">{detail.Title}</h1>
          <div className="upperwrapper w-full flex gap-10 h-[900px] items-center justify-evenly">
            <div className="poster relative w-[40%] h-full rounded-md overflow-hidden">
              <Image
                className="object-cover max-h-full max-w-full"
                fill
                priority="lazy"
                src={
                  detail.Poster == "N/A" ? "/notAvailable.png" : detail.Poster
                }
                alt="poster"
                sizes="(max-width: 700px)"
              />
            </div>
            <div className="details w-1/2 h-full border-2 rounded-md border-[#baa5df]">
              <ul className="flex flex-col gap-3 p-5 text-xl">
                <li>
                  <span className="text-[#baa5df] font-bold">Title</span>
                  <span> : </span>
                  <span>{detail.Title}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">BoxOffice</span>
                  <span> : </span>
                  <span>{detail.BoxOffice}</span>
                </li>{" "}
                <li>
                  <span className="text-[#baa5df] font-bold">Actors</span>
                  <span > : </span>
                  <span>{detail.Actors}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Country</span>
                  <span> : </span>
                  <span>{detail.Country}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Genre</span>
                  <span> : </span>
                  <span>{detail.Genre}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Language</span>
                  <span> : </span>
                  <span>{detail.Language}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Writer</span>
                  <span> : </span>
                  <span>{detail.Writer}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Year</span>
                  <span> : </span>
                  <span>{detail.Year}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Type</span>
                  <span> : </span>
                  <span className="capitalize">{detail.Type}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Awards</span>
                  <span> : </span>
                  <span>{detail.Awards}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Director</span>
                  <span> : </span>
                  <span>{detail.Director}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Metascore</span>
                  <span> : </span>
                  <span>{detail.Mentascore}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Released</span>
                  <span> : </span>
                  <span>{detail.Released}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">Duration</span>
                  <span> : </span>
                  <span>{detail.Runtime}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">ImDB Rating</span>
                  <span> : </span>
                  <span>{detail.imdbRating}</span>
                </li>
                <li>
                  <span className="text-[#baa5df] font-bold">ImDB Votes</span>
                  <span> : </span>
                  <span>{detail.imdbVotes}</span>
                </li>
                {detail.Ratings.map((item) => {
                  return (
                    <li key={uuidv4()}>
                      <span className="text-[#baa5df] font-bold">{item.Source}</span>
                      <span> : </span>
                      <span>{item.Value}</span>
                    </li>
                  );
                })}{" "}
                {detail.Type == "series" && (
                  <li>
                    <span className="text-[#baa5df] font-bold">Total Season</span>
                    <span> : </span>
                    <span>{detail.totalSeasons}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="text-2xl/10 ">
            <div className="px-10">
              <div className="text-2xl font-bold mb-4">Plot :</div>
              <div className=" text-pretty">{detail.Plot}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
