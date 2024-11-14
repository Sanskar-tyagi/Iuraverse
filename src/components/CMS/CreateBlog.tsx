import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronLeft, Minus, UploadCloud } from "lucide-react";
import { Editor } from "@/components/ui/editor";
import { ChangeEvent, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateContent } from "@/hooks/useCreateContent";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import { useUploadImage } from "@/hooks/useUploadMedia";
const CreateBlog = ({ setScreen }: { setScreen: any }) => {
  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>({
    title: "",
    content: "",
  });
  const [image, setImage] = useState<File | undefined>(undefined);
  const user = UserStore((state) => state.user);
  const handleCreateContent = async () => {
    const uploadImage = await useUploadImage(image)
      .then((d) => {
        useCreateContent({
          author: user?.userId,
          content: content?.content || "",
          title: content?.title || "",
          type: "BLOG",
          createdOn: new Date().toISOString(),
          thumbnail: d?.data.id,
        });
      })
      .then(() => {
        setScreen(0);
      });
  };
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // setIsLoading(true);
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInMB = file.size / (1024 * 1024); // Size in MB
      console.log("File Size:", fileSizeInMB, "MB");
      if (fileSizeInMB >= 6) {
        // setSizeIssue(true);
      } else {
        setImage(file);
      }
    }
    // setIsLoading(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <Card>
        {" "}
        <div className=" my-3">
          <div className="flex px-2 cursor-pointer justify-start items-center gap-2">
            <ChevronLeft
              onClick={() => {
                setScreen(0);
              }}
              className="h-7 w-7 text-neutral-600"
            />
            <h2 className="text-xl text-neutral-900 ">Create Blogs</h2>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <Card className="flex md:h-[450px] flex-col col-span-2">
          <CardHeader>
            <p>Title</p>
            <Input
              value={content?.title}
              onChange={(e) => {
                setContent({
                  ...content,
                  title: e.target.value,
                  content: content?.content || "",
                });
              }}
              placeholder="Enter Title"
            />
          </CardHeader>
          <CardContent>
            <Editor setContent={setContent} content={content} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <p className="text-neutral-800">Thumbnail Image</p>
          </CardHeader>
          <CardContent>
            <div className="h-44 w-72 flex  cursor-pointer justify-center items-center border-primary relative border rounded-[2px] border-dashed">
              {image ? (
                <>
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-full w-full object-cover"
                  />
                  <Minus
                    onClick={() => {
                      setImage(undefined);
                    }}
                    className="h-4 w-4 absolute -top-2 bg-red-500 shadow -right-1 rounded-2xl text-white"
                  />
                </>
              ) : (
                <>
                  <Input
                    onChange={handleImageChange}
                    ref={hiddenFileInput}
                    type="file"
                    className=" z-10 h-full w-full opacity-0"
                  />
                  <div className="flex absolute  top-8 flex-col justify-center items-center  text-primary">
                    <UploadCloud className="h-12 w-12" />

                    <p>Upload Image</p>
                    <p className="text-xs text-neutral-500 px-6 mt-2 text-center">
                      Support for a single upload. Maximum file size 2MB.
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Button
              onClick={() => {
                console.log(image);
                handleCreateContent();
              }}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Save
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CreateBlog;
