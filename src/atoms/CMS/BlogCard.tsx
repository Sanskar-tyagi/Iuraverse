import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/hooks/useAddUser";
import { getAttachment } from "@/hooks/useUploadMedia";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BlogCard = ({ setBlog, blog }: { setBlog: any; blog: any }) => {
  const createMarkup = (html: string): { __html: string } => {
    return {
      __html: DOMPurify.sanitize(html.slice(0, 40)),
    };
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [imageSrc, setImageSrc] = useState<any>();
  const [author, setAuthor] = useState<any>();
  useEffect(() => {
    const fetchImage = async () => {
      const res = await getAttachment(blog.thumbnail);
      setImageSrc(res.data);
    };
    const fetchAuthor = async () => {
      const res = await getUser(blog.author);
      setAuthor(res.data);
    };
    fetchAuthor();
    fetchImage();
  }, [blog.thumbnail]);
  return (
    <Card
      onClick={() => {
        setSearchParams([["blog", blog._id]]);
        setBlog({ ...blog, image: imageSrc, authorName: author.name });
      }}
      className="rounded-md justify-between"
    >
      <img
        className="rounded-t-md mb-2 h-48 w-full object-cover"
        src={imageSrc}
        alt=""
      />
      <CardContent className="px-3 pb-2 flex flex-col justify-between h-28">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="text-base text-neutral-900">{blog.title}</p>
            <DotsHorizontalIcon className="h-4 w-4" />
          </div>{" "}
          <p
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className="text-neutral-600 text-sm"
          ></p>
        </div>
        <div className="flex gap-4">
          <p className="text-xs text-neutral-400">by : {author?.name}</p>
          <p className="text-xs text-neutral-400">{blog.createdOn}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
