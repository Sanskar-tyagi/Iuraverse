import Blog from "@/atoms/CMS/BlogCard";
import { ListFilter, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useGetBlogs } from "@/hooks/useCreateContent";

const Blogs = ({ setScreen, setBlog }: { setScreen: any; setBlog: any }) => {
  const data = [
    {
      title: "Rights of employees in India",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, animi! Maiores ea placeat totam maxime expedita laborum laudantium culpa soluta, hic minus voluptates saepe vel consequuntur nostrum suscipit ab vitae?",
      image: "image1",
      createdAt: "2021-09-01",
    },
    {
      title: "Can Caveat Be Filed in the NCLT and NCLAT?",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, animi! Maiores ea placeat totam maxime expedita laborum laudantium culpa soluta, hic minus voluptates saepe vel consequuntur nostrum suscipit ab vitae?",

      image: "image2",
      createdAt: "2021-09-02",
    },
    {
      title: "What consumer rights are guranteed in India",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, animi! Maiores ea placeat totam maxime expedita laborum laudantium culpa soluta, hic minus voluptates saepe vel consequuntur nostrum suscipit ab vitae?",
      image: "image3",
      createdAt: "2021-09-03",
    },
    {
      title: "How to apply for anticipatory bill",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, animi! Maiores ea placeat totam maxime expedita laborum laudantium culpa soluta, hic minus voluptates saepe vel consequuntur nostrum suscipit ab vitae?",
      image: "image4",
      createdAt: "2021-09-04",
    },
  ];
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const blogs = useGetBlogs().then((d) => setBlogs(d.data.data));
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 bg-white px-2">
        <div className="relative w-[220px]">
          <Search className="absolute left-3 h-5 w-5 text-gray-500 top-1/2 transform -translate-y-1/2 z-10" />
          <Input type="text" placeholder="Search" className="pl-10  " />
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ListFilter className="h-5 w-5" />
            </Button>
          </div>
          <Button
            onClick={() => {
              setScreen(1);
            }}
            variant="default"
            className="flex gap-2"
            size="default"
          >
            <Plus className="h-5 w-5" />
            Create Blog
          </Button>
        </div>
      </div>
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Blog setBlog={setBlog} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
