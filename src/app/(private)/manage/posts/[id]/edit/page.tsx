import EditPostForm from "./EditPostForm";
import { notFound } from "next/navigation";
import { getOwnPost } from "@/lib/ownPost";
import {auth} from "@/auth";

type Params = {
  params: Promise<{id: string}>
}

export default async function EditPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }

  const { id } = await params;
  const post = await getOwnPost(userId, id);

  // 記事がなければnotFoundページが表示される
  if (!post) {
    notFound();
  }

  return (
    <EditPostForm post={post} />
  )
}
