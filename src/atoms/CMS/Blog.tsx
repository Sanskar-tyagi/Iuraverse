import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { getAttachment } from "@/hooks/useUploadMedia";
import { getUser } from "@/hooks/useAddUser";
import { useNavigate, useSearchParams } from "react-router-dom";

const Blog = ({ blog }: { blog: any }) => {
  const createMarkup = (html: string): { __html: string } => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [img, setImg] = useState<string>("");
  const [author, setAuthor] = useState<{ name: string }>({ name: "" });
  useEffect(() => {
    if (blog.image) {
      setImg(blog.image);
    } else {
      const fetchImage = async () => {
        const res = await getAttachment(blog.thumbnail);
        setImg(res.data);
      };
      fetchImage();
    }

    const fetchAuthor = async () => {
      const res = await getUser(blog.author);
      setAuthor(res.data);
    };
    if (!blog.authorName) {
      fetchAuthor();
    } else {
      setAuthor({ name: blog.authorName });
    }
  }, []);
  const nav = useNavigate();
  return (
    <Card>
      <div className="px-6">
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchParams([]);
                    nav("/");
                  }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchParams([]);
                  }}
                >
                  Blogs / Articles
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blog.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardHeader>
        <CardTitle className="text-4xl px-6 p-4">
          <h1>{blog.title}</h1>
          <p className="text-base font-semibold text-neutral-400">
            by {author?.name}
            {"  "}
          </p>
          <p className="text-neutral-500 text-base">
            {" "}
            {blog.createdOn.slice(0, 10)}
          </p>
        </CardTitle>
        <img src={img} alt="blog" className="w-full h-96 px-5 object-cover" />
        <CardContent className="border-t-2 m-5 pt-5 px-0">
          <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Blog;
