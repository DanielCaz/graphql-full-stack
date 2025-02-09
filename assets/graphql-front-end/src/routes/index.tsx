import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { mutatePost, queryPosts } from "../lib/api";
import {
  AiFillInteraction,
  AiFillEdit,
  AiFillDelete,
  AiFillAlert,
} from "react-icons/ai";
import { FormEvent, useRef } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: queryPosts,
  });

  const mutation = useMutation({
    mutationFn: mutatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleAddPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mutation.isPending) return;

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    mutation.mutate(
      { title, content },
      {
        onSuccess: () => formRef.current?.reset(),
      },
    );
  };

  return (
    <main className="grid place-content-center pt-16">
      <form ref={formRef} onSubmit={handleAddPost}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">New Post</legend>

          <label className="fieldset-label">Title</label>
          <input name="title" required className="input" />

          <label className="fieldset-label">Content</label>
          <input name="content" required className="input" />

          <button
            className="btn btn-neutral mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : null}
            Add Post
          </button>
        </fieldset>
      </form>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="flex items-center gap-4 p-4 pb-2 text-xs tracking-wide opacity-60">
          <span className="flex-1">Posts</span>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => query.refetch()}
          >
            <AiFillInteraction className="text-2xl" />
          </button>
        </li>

        {query.isLoading ? (
          <span className="loading loading-dots loading-md mx-auto"></span>
        ) : query.isError ? (
          <div role="alert" className="alert alert-error">
            <AiFillAlert />
            <span>Error! Task failed successfully.</span>
          </div>
        ) : null}

        {query.data?.map((post) => (
          <li key={post?.id} className="list-row">
            <div>
              <img
                src="https://placehold.co/100x100"
                alt="Placeholder"
                className="rounded-box size-10"
              />
            </div>
            <div>
              <div>{post?.title}</div>
              <div className="text-xs font-semibold uppercase opacity-60">
                {post?.content || "No content"}
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <AiFillEdit />
            </button>
            <button className="btn btn-square btn-ghost">
              <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
