import type { LoaderFunction } from "remix";
import { Link, useLoaderData, useParams, useCatch } from "remix";
import { db } from "~/utils/db.server";
import type { Joke } from "@prisma/client";

type LoaderData = { joke: Joke };

export const loader: LoaderFunction = async ({
  params
}) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId }
  });
  if (!joke) {
    throw new Response("What a joke! Not found.", {
      status: 404
    });
  }
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

  export function CatchBoundary() {
    const caught = useCatch();
    const params = useParams();
    if (caught.status === 404) {
      return (
        <div className="error-container">
          Huh? What the heck is "{params.jokeId}"?
        </div>
      );
    }
    throw new Error(`Unhandled error: ${caught.status}`);
  }

  
export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
