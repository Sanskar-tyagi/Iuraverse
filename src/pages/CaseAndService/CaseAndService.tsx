import NewCaseTable from "@/components/CaseManagement/NewCase/NewCaseTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, ChevronLeft, ListFilter, Plus, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { useGetCases } from "@/hooks/useGetCases";
import AddCase from "@/components/CaseManagement/AddCase";
import ApprovedCase from "@/components/CaseManagement/ApprovedCase/ApprovedCase";
import ViewCase from "@/components/CaseManagement/ViewCase";
import RejectCaseTable from "@/components/CaseManagement/RejectCase/RejectCaseTable";
import { CardTitle, Card } from "@/components/ui/card";
import ReminderTable from "@/components/CaseManagement/Reminder/ReminderTable";
import { fetchUserAttributes } from "aws-amplify/auth";
import AllCases from "@/components/CaseManagement/AllCases/AllCases";
import { UserStore } from "../HomeLayout/UserStore";
import LoaderMain from "@/atoms/Loaders/LoaderMain";
const AdminView = ({ role }: { role: string }) => {
  const [SelectedTab, setSelectedTab] = useState(0);
  const { data = [], isLoading, refetch } = useGetCases();
  const [selectedCase, setSelectedCase] = useState<any>("");
  if (isLoading || !role) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {SelectedTab !== 3 && !selectedCase && (
        <>
          <div className="flex items-center justify-between py-4 bg-white px-2">
            {SelectedTab !== 4 ? (
              <div className="relative w-[220px]">
                <Search className="absolute left-3 h-5 w-5 text-gray-500 top-1/2 transform -translate-y-1/2 z-10" />
                <Input type="text" placeholder="Search" className="pl-10  " />
              </div>
            ) : (
              <CardTitle>
                <div className=" my-4 mb-4">
                  <div
                    onClick={() => {
                      setSelectedTab(0);
                    }}
                    className="flex px-2 cursor-pointer justify-start items-center gap-2"
                  >
                    <ChevronLeft className="h-6 w-6 text-neutral-600" />
                    <h2 className="text-xl font-semibold ">Reminder</h2>
                  </div>
                </div>
              </CardTitle>
            )}
            <div className="flex gap-6 items-center">
              {SelectedTab !== 4 ? (
                <Button
                  onClick={() => {
                    setSelectedTab(4);
                  }}
                  variant="outline"
                  className="flex gap-2"
                  size="default"
                >
                  <Bell className="h-5 w-5" />
                  Reminder
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              )}
              <Button
                onClick={() => {
                  setSelectedTab(3);
                }}
                variant="default"
                className="flex gap-2"
                size="default"
              >
                <Plus className="h-5 w-5" />
                Add Case
              </Button>
            </div>
          </div>
          {SelectedTab !== 4 && (
            <div className="bg-white border-y ">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => setSelectedTab(0)}
                      className={`${navigationMenuTriggerStyle()} ${
                        SelectedTab === 0 && "border-b-2 border-primary"
                      }  hover:border-b-2 hover:border-primary cursor-pointer mt-2`}
                    >
                      New Case Requests
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => setSelectedTab(1)}
                      className={`${navigationMenuTriggerStyle()} ${
                        SelectedTab === 1 && "border-b-2 border-primary"
                      }  hover:border-b-2 hover:border-primary cursor-pointer mt-2`}
                    >
                      Approved Cases
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      onClick={() => setSelectedTab(2)}
                      className={`${navigationMenuTriggerStyle()} ${
                        SelectedTab === 2 && "border-b-2 border-primary"
                      }  hover:border-b-2 hover:border-primary cursor-pointer mt-2`}
                    >
                      Rejected Cases
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
        </>
      )}
      {selectedCase ? (
        <ViewCase setSelectedCase={setSelectedCase} Case={selectedCase} />
      ) : SelectedTab === 0 ? (
        <NewCaseTable
          // setSelectedCase={setSelectedCase}
          refetch={refetch}
          cases={data.data}
        />
      ) : SelectedTab === 1 ? (
        <ApprovedCase
          // refetch={refetch}
          setSelectedCase={setSelectedCase}
          cases={data.data}
        />
      ) : SelectedTab === 2 ? (
        <RejectCaseTable
          // refetch={refetch}
          cases={data.data}
        />
      ) : SelectedTab === 3 ? (
        <AddCase
          total={data.page.total}
          setSelectedTab={setSelectedTab}
          refetch={refetch}
        />
      ) : SelectedTab === 4 ? (
        <ReminderTable setSelectedCase={setSelectedCase} cases={data.data} />
      ) : null}
    </div>
  );
};

export const CaseAndService = () => {
  const currentUser = UserStore((state) => state.user?.userRole);

  return (
    <>
      {currentUser === "ADMIN" ? (
        <AdminView role={"ADMIN"} />
      ) : currentUser === "LAWYER" ? (
        <AdminView role={"LAWYER"} />
      ) : currentUser === "LEGALCOORDINATOR" ? (
        <AdminView role={"LEGALCOORDINATOR"} />
      ) : currentUser === "CUSTOMER" ? (
        <ClientView />
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <LoaderMain />
        </div>
      )}
    </>
  );
};

const ClientView = () => {
  const [SelectedTab, setSelectedTab] = useState(0);
  const User = UserStore((state) => state.user);
  const { data = [], isLoading, refetch } = useGetCases(User?.userId);
  return (
    <Card>
      {SelectedTab !== 5 && (
        <>
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
                  setSelectedTab(5);
                }}
                variant="default"
                className="flex gap-2"
                size="default"
              >
                <Plus className="h-5 w-5" />
                Add Case
              </Button>
            </div>
          </div>

          <div className="bg-white border-y mb-2 ml-2 ">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => setSelectedTab(0)}
                    className={`${navigationMenuTriggerStyle()} ${
                      SelectedTab === 0 && " text-white bg-primary"
                    } text-neutral-500 border border-neutral-400 rounded-full hover:bg-primary hover:text-white cursor-pointer mt-2`}
                  >
                    All (16)
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => setSelectedTab(1)}
                    className={`${navigationMenuTriggerStyle()} ${
                      SelectedTab === 1 && " text-white bg-primary"
                    } text-neutral-500 border border-neutral-400 rounded-full hover:bg-primary hover:text-white cursor-pointer mt-2`}
                  >
                    Approval pending (4)
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => setSelectedTab(2)}
                    className={`${navigationMenuTriggerStyle()} ${
                      SelectedTab === 2 && " text-white bg-primary"
                    } text-neutral-500 border border-neutral-400 rounded-full hover:bg-primary hover:text-white cursor-pointer mt-2`}
                  >
                    in progress (1)
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => setSelectedTab(3)}
                    className={`${navigationMenuTriggerStyle()} ${
                      SelectedTab === 3 && " text-white bg-primary"
                    } text-neutral-500 border border-neutral-400 rounded-full hover:bg-primary hover:text-white cursor-pointer mt-2`}
                  >
                    on hold (1)
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => setSelectedTab(4)}
                    className={`${navigationMenuTriggerStyle()} ${
                      SelectedTab === 4 && " text-white bg-primary"
                    } text-neutral-500 border border-neutral-400 rounded-full hover:bg-primary hover:text-white cursor-pointer mt-2`}
                  >
                    closed (1)
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </>
      )}
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {SelectedTab === 0 ? (
              <AllCases
                setSelectedCase={setSelectedTab}
                refetch={() => {}}
                data={data.data}
              />
            ) : SelectedTab === 5 ? (
              <AddCase
                total={data.page.total}
                setSelectedTab={setSelectedTab}
                refetch={refetch}
              />
            ) : null}
          </>
        )}
      </>
    </Card>
  );
};
