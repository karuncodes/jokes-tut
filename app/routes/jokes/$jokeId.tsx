import type { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";
import { db } from "~/utils/db.server";
import type { Joke } from "@prisma/client";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({
  params
}) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke) throw new Error("Joke not found");
  const data: LoaderData = { joke };
  return data;
};


export default function JokeRoute() {
  const data: LoaderData = useLoaderData();
  const { name, content } = data.joke;
    return (
      <div>
        <p>{name}</p>
        <p>{content}</p>
      </div>
    );
  }