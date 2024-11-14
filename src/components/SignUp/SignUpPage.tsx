import { OTPModal } from "@/components/SignUp/OTPModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import logo from "@/assets/BeingVakil.png";
import RadioInputs from "@/atoms/radioButtons/radioInputs";
import { Gavel, Scale, UsersRound } from "lucide-react";
import RegistrationForm from "./BasicForm";

export const SignUpPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formstate, setFormState] = useState(1);
  const curr = searchParams.get("step");

  const [formData, setFormData] = useState({
    username: "",
    moblie: "",
    role: "CUSTOMER",
  });
  const roles = [
    {
      role: "Lawyer",
      value: "LAWYER",
      icon: <Gavel className="h-12 w-12 text-primary" />,
    },
    {
      role: "Legal Coordinator",
      value: "LEGALCOORDINATOR",
      icon: <UsersRound className="h-12 w-12 text-primary" />,
    },
    {
      role: "Customer",
      value: "CUSTOMER",
      icon: <Scale className="h-12 w-12 text-primary" />,
    },
  ];

  return (
    <>
      {formstate === 0 ? (
        <div className="w-full lg:grid  lg:grid-cols-2 ">
          <div className="hidden w-full h-full lg:block bg-[url('https://cdn.prod.website-files.com/5a9423a3f702750001758d4f/64ddbec690d3da8a292418d8_%20-%2012.png')]">
            <img
              src="https://png.pngtree.com/png-vector/20240820/ourmid/pngtree-realisitc-lady-justice-statue-png-image_13560893.png"
              alt="Image"
              className=" h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Card className="flex rounded-none flex-col justify-start items-start">
            <div className="mx-auto grid w-[350px] gap-4 ">
              <div className="grid text-center">
                <img src={logo} className="w-52 ml-10  " alt="" />
                <h1 className="text-3xl -mt-12 -ml-12 font-bold">
                  Hi, Welcome!
                </h1>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                    }}
                    id="name"
                    placeholder="Enter here"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="moblie">Phone number</Label>
                  </div>
                  <Input
                    placeholder="Enter here"
                    id="moblie"
                    type="moblie"
                    required
                    value={formData.moblie}
                    onChange={(e) =>
                      setFormData({ ...formData, moblie: e.target.value })
                    }
                  />
                  <Label>Select your role</Label>
                  <div className="flex flex-col justify-center items-center">
                    <div className="text-start"></div>
                    <RadioInputs
                      setSelected={(value: string) => {
                        setFormData({ ...formData, role: value });
                      }}
                      selected={formData.role}
                      data={roles}
                    />{" "}
                  </div>
                </div>
                <OTPModal setForm={setFormState} formData={formData} />
              </div>
              <div className="mt-4 text-center text-sm">
                Already having iuraverse account?
                <a
                  onClick={() => {
                    setSearchParams([["login", "true"]]);
                  }}
                  className="ml-2 cursor-pointer text-primary font-semibold"
                >
                  Login
                </a>
              </div>
            </div>
          </Card>
        </div>
      ) : formstate === 1 ? (
        <RegistrationForm setformState={setFormState} />
      ) : formstate === 2 ? (
        <div>Form 2</div>
      ) : null}
    </>
  );
};
