import { useGetTnc } from "@/hooks/useCreateContent";
import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

const ListTnc = () => {
  const data = useGetTnc();
  console.log(data);
  const tempdata = [
    {
      title: "Loream Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita reprehenderit exercitationem nam omnis delectus fugiat vero sed soluta nostrum, atque dicta laudantium dolor magni praesentium tempore quis aut natus esse.",
    },
    {
      title: "Loream Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita reprehenderit exercitationem nam omnis delectus fugiat vero sed soluta nostrum, atque dicta laudantium dolor magni praesentium tempore quis aut natus esse.",
    },
    {
      title: "Loream Ipsum",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita reprehenderit exercitationem nam omnis delectus fugiat vero sed soluta nostrum, atque dicta laudantium dolor magni praesentium tempore quis aut natus esse.",
    },
  ];
  return (
    <Card>
      <CardTitle>
        <h2 className="text-xl font-semibold">Terms and Conditions</h2>
      </CardTitle>
      <CardContent>
        <div>
          {tempdata.map((item, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListTnc;
