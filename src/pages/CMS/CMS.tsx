import Blog from "@/atoms/CMS/Blog";
import Blogs from "@/components/CMS/Blogs";
import CreateBlog from "@/components/CMS/CreateBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBlog } from "@/hooks/useCreateContent";
import { ListFilter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CMS = () => {
  const [screen, setScreen] = useState(0);
  const [blog, setBlog] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("blog") && !blog) {
      const blogId = searchParams.get("blog") || "";
      useGetBlog(blogId).then((res) => {
        setBlog(res.data);
        setScreen(0);
      });
    } else if (!searchParams.get("blog")) {
      setBlog(undefined);
    }
  }, [searchParams]);
  return (
    <>
      {blog ? (
        <Blog blog={blog} />
      ) : screen === 0 ? (
        <Card>
          <CardContent className="py-4">
            <Tabs defaultValue="blogs">
              <TabsList>
                <TabsTrigger value="blogs">Blogs / Articles</TabsTrigger>
                <TabsTrigger value="tnc">Terms & Condition</TabsTrigger>
                <TabsTrigger value="faq">FAQ's</TabsTrigger>
              </TabsList>
              <TabsContent value="blogs">
                <Blogs setScreen={setScreen} setBlog={setBlog} />
              </TabsContent>
              <TabsContent value="tnc">Change your password here.</TabsContent>
              <TabsContent value="faq">
                <section className="dark:bg-gray-100 dark:text-gray-800">
                  <div className="flex items-center justify-between py-4 bg-white px-2">
                    <div className="relative w-[220px]">
                      <Search className="absolute left-3 h-5 w-5 text-gray-500 top-1/2 transform -translate-y-1/2 z-10" />
                      <Input
                        type="text"
                        placeholder="Search"
                        className="pl-10  "
                      />
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
                        Create FAQ's
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <div className="flex flex-col divide-y">
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Optio maiores eligendi molestiae totam dolores
                          similique?
                        </summary>
                        <div className="px-4 pb-4">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Unde neque in fugiat magni, quas animi enim
                            veritatis deleniti ex. Impedit.
                          </p>
                        </div>
                      </details>
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Modi dolorem veritatis culpa quos consequuntur beatae
                          itaque excepturi perspiciatis?
                        </summary>
                        <div className="px-4 pb-4">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Est aspernatur quae, eos explicabo odit minima
                            libero veniam similique quibusdam doloribus facilis
                            ipsa accusantium vel maiores corrupti! Libero
                            voluptate a doloribus?
                          </p>
                        </div>
                      </details>
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Magni reprehenderit possimus debitis?
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ut voluptates aspernatur dolores in
                            consequatur doloremque inventore reprehenderit,
                            consequuntur perspiciatis architecto.
                          </p>
                          <p>
                            Sed consectetur quod tenetur! Voluptatibus culpa
                            incidunt veritatis velit quasi cupiditate unde
                            eaque! Iure, voluptatibus autem eaque unde possimus
                            quae.
                          </p>
                        </div>
                      </details>{" "}
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Optio maiores eligendi molestiae totam dolores
                          similique?
                        </summary>
                        <div className="px-4 pb-4">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Unde neque in fugiat magni, quas animi enim
                            veritatis deleniti ex. Impedit.
                          </p>
                        </div>
                      </details>
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Modi dolorem veritatis culpa quos consequuntur beatae
                          itaque excepturi perspiciatis?
                        </summary>
                        <div className="px-4 pb-4">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Est aspernatur quae, eos explicabo odit minima
                            libero veniam similique quibusdam doloribus facilis
                            ipsa accusantium vel maiores corrupti! Libero
                            voluptate a doloribus?
                          </p>
                        </div>
                      </details>
                      <details>
                        <summary className="py-2 outline-none cursor-pointer focus:underline">
                          Magni reprehenderit possimus debitis?
                        </summary>
                        <div className="px-4 pb-4 space-y-2">
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ut voluptates aspernatur dolores in
                            consequatur doloremque inventore reprehenderit,
                            consequuntur perspiciatis architecto.
                          </p>
                          <p>
                            Sed consectetur quod tenetur! Voluptatibus culpa
                            incidunt veritatis velit quasi cupiditate unde
                            eaque! Iure, voluptatibus autem eaque unde possimus
                            quae.
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : screen === 1 ? (
        <CreateBlog setScreen={setScreen} />
      ) : screen === 2 ? (
        <>create TNC </>
      ) : screen === 3 ? (
        <>create FAQ</>
      ) : null}
    </>
  );
};
