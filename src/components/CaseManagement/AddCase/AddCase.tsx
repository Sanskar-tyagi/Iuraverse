import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import CaseForm from "./CaseForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddCase } from "@/hooks/useAddCase";
import { toast } from "@/hooks/use-toast";

export const AddCase = ({
  total,
  setSelectedTab,
  refetch,
}: {
  total: any;
  setSelectedTab: any;
  refetch: any;
}) => {
  const [data, setData] = useState<{ [key: string]: any }>({
    CaseID: parseInt(total + 1),
  });
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <Card className="rounded-sm">
        <CardTitle>
          <div className=" my-4 mb-4">
            <div
              onClick={() => {
                setSelectedTab(0);
              }}
              className="flex px-2 cursor-pointer justify-start items-center gap-2"
            >
              <ChevronLeft className="h-6 w-6 text-neutral-600" />
              <h2 className="text-xl font-semibold ">Add Case</h2>
            </div>
            <Separator className="mt-4" />
          </div>
        </CardTitle>
        <CardContent>
          <CaseForm total={total} data={data} setData={setData} />
        </CardContent>
      </Card>
      <Card className="mt-6 mb-0 pb-0">
        <CardContent className="p-6 px-2">
          <div className="grid grid-cols-6 justify-end items-center">
            <div className="col-span-2"></div>
            <div className="col-span-2"></div>

            <div className="col-span-1">
              <Button
                onClick={() => {
                  setSelectedTab(0);
                }}
                size={"lg"}
                variant={"outline"}
                className="text-primary"
              >
                Cancel
              </Button>
            </div>
            <div className="col-span-1">
              <Button
                size={"lg"}
                variant={"default"}
                onClick={() => {
                  const err = checkError(data);
                  if (err) {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: (
                        <>
                          <p>Please fill all the required fields</p>
                          <ul>
                            {err.map((e) => (
                              <li>{e}</li>
                            ))}
                          </ul>
                        </>
                      ),
                    });
                  } else {
                    setLoading(true);
                    useAddCase(data).then(() => {
                      refetch();
                      setSelectedTab(0);
                      setLoading(false);
                    });
                  }
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
const checkError = (data: any) => {
  const errors: string[] = [];

  if (!data.CaseType) errors.push("CaseType is required");
  if (!data.CaseTitle) errors.push("CaseTitle is required");
  if (!/^\d{6}$/.test(String(data.ClientId))) {
    errors.push("ClientId must be a 6-digit number");
  }
  if (!data.ClientName) errors.push("ClientName is required");
  if (!data.CreatedOn) errors.push("CreatedOn is required");
  if (!data.EstimatedEndDate) errors.push("EstimatedEndDate is required");
  if (!data.CaseDescription) errors.push("CaseDescription is required");
  if (!data.ConsultationDate) errors.push("ConsultationDate is required");
  if (!data.ConsultationTime) errors.push("ConsultationTime is required");
  if (!data.ConsultationType) errors.push("ConsultationType is required");
  if (!data.ConsultationDuration)
    errors.push("ConsultationDuration is required");
  if (!data.Fees) errors.push("Fees are required");

  return errors.length > 0 ? errors : null;
};
