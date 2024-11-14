import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardTitle } from "../ui/card";
import { UserStore } from "@/pages/HomeLayout/UserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  DOB: z.string(),
  gender: z.enum(["male", "female", "other"]),
  profilePicture: z.string().optional(),
  nationality: z.string().min(2, "Nationality is required"),
  contactNumber: z.number().positive(),
  altContactNumber: z.number().optional(),
  email: z.string().email(),
  officeAddress: z.string().min(5, "Office address is required"),
  officeAddressPIN: z.number().positive(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  additionalInfo: z.record(z.any()),
  caseID: z.array(z.string()),
  cognitoID: z.string(),
});

export default function RegistrationForm({
  setformState,
}: {
  setformState: any;
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      DOB: "",
      gender: "",
      nationality: "",
      contactNumber: 0,
      altContactNumber: 0,
      email: "",
      officeAddress: "",
      officeAddressPIN: "",
      city: "",
      state: "",
      country: "",
      additionalInfo: {},
      caseID: [],
      cognitoID: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // setformState(1);
  };

  const User = UserStore((state) => state.user?.userId);
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  return (
    <div className="bg-primary/20 h-full w-full">
      <Card className="flex flex-col mx-12 my-2 bg-white">
        <CardTitle className="py-10 gap-3 flex flex-col justify-center items-center">
          <p className="text-base font-normal text-neutral-700">
            Create your profile
          </p>
          <p className="text-3xl font-bold text-neutral-900 ">
            Need some of your personal details
          </p>
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lawyer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="DOB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Country</FormLabel>
                      <FormControl>
                        <LocationSelector
                          isShowState={true}
                          onCountryChange={(country) => {
                            setCountryName(country?.name || "");
                            form.setValue(field.name, country?.name || "");
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder=""
                          {...field}
                          defaultCountry="IN"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="altContactNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Alternate Contact Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="Enter mobile number"
                          {...field}
                          defaultCountry="TR"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" type="email" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="officeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Address</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="officeAddressPIN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input placeholder="pin code" type="number" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="" type="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Country</FormLabel>
                    <FormControl>
                      <LocationSelector
                        onCountryChange={(country) => {
                          setCountryName(country?.name || "");
                          form.setValue(field.name, country?.name || "");
                        }}
                        onStateChange={(state) => {
                          setStateName(state?.name || "");
                          form.setValue(field.name, countryName || "");
                          form.setValue("state", state?.name || "");
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Save and Next</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// <form>
// <div className="grid gap-6">
//   {/* Row 1 */}
//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
//     <div className="md:col-span-2">
//       <Label htmlFor="lawyer-name">Lawyer Name</Label>
//       <Input
//         onChange={(event) => {
//           setFormData({ ...formData, name: event.target.value });
//         }}
//         id="lawyer-name"
//         placeholder="Enter full name"
//       />
//     </div>
//     <div>
//       <Label htmlFor="gender">Gender</Label>
//       <Select
//         value={formData.gender}
//         onValueChange={(value: any) => {
//           setFormData({ ...formData, gender: value });
//         }}
//       >
//         <SelectTrigger id="gender">
//           <SelectValue placeholder="Select gender" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="male">Male</SelectItem>
//           <SelectItem value="female">Female</SelectItem>
//           <SelectItem value="other">Other</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//     <div>
//       <Label htmlFor="dob">Date of Birth</Label>
//       <Input
//         onChange={(e) => {
//           setFormData({ ...formData, DOB: e.target.value });
//         }}
//         id="dob"
//         type="date"
//       />
//     </div>
//     <div>
//       <Label htmlFor="nationality">Nationality</Label>
//       <Input
//         onChange={(e) => {
//           setFormData({ ...formData, nationality: e.target.value });
//         }}
//         id="nationality"
//         placeholder="Enter nationality"
//       />
//     </div>
//   </div>

//   {/* Row 2 */}
//   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-8">
//     <div className="md:col-span-2">
//       <Label htmlFor="contact-number">Contact Number</Label>
//       <div className="grid grid-cols-4 gap-2">
//         <Select>
//           <SelectTrigger
//             className=" col-span-1"
//             id="contact-number"
//           >
//             <SelectValue placeholder="+91" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="country-code1">+91</SelectItem>
//             <SelectItem value="country-code2">+1</SelectItem>
//             <SelectItem value="country-code3">+44</SelectItem>
//           </SelectContent>
//         </Select>
//         <Input
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               contactNumber: parseInt(e.target.value),
//             });
//           }}
//           className="col-span-3"
//           id="contact-number"
//           type="tel"
//           placeholder="Enter contact number"
//         />
//       </div>
//     </div>
//     <div className="md:col-span-2">
//       <Label htmlFor="alt-contact-number">
//         Alt. Contact Number
//       </Label>
//       <div className="grid grid-cols-4 gap-2">
//         <Select>
//           <SelectTrigger
//             className=" col-span-1"
//             id="alt-contact-number"
//           >
//             <SelectValue placeholder="+91" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="country-code1">+91</SelectItem>
//             <SelectItem value="country-code2">+1</SelectItem>
//             <SelectItem value="country-code3">+44</SelectItem>
//           </SelectContent>
//         </Select>
//         <Input
//           className="col-span-3"
//           id="alt-contact-number"
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               altContactNumber: parseInt(e.target.value),
//             });
//           }}
//           type="tel"
//           placeholder="Enter alternative number"
//         />
//       </div>
//     </div>
//     <div className="md:col-span-4">
//       <Label htmlFor="email">Email</Label>
//       <Input
//         id="email"
//         onChange={(e) => {
//           setFormData({ ...formData, email: e.target.value });
//         }}
//         type="email"
//         placeholder="Enter email address"
//       />
//     </div>
//   </div>

//   {/* Row 3 */}
//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//     <div className="sm:col-span-2">
//       <Label htmlFor="office-address">Office Address</Label>
//       <Input
//         onChange={(e) => {
//           setFormData({
//             ...formData,
//             officeAddress: e.target.value,
//           });
//         }}
//         id="office-address"
//         placeholder="Enter office address"
//       />
//     </div>
//     <div>
//       <Label htmlFor="pincode">Pincode</Label>
//       <Input
//         onChange={(e) => {
//           setFormData({
//             ...formData,
//             officeAddressPIN: parseInt(e.target.value),
//           });
//         }}
//         id="pincode"
//         placeholder="Enter pincode"
//       />
//     </div>
//   </div>

//   {/* Row 4 */}
//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//     <div>
//       <Label htmlFor="city">City</Label>
//       <Select
//         value={formData.city}
//         onValueChange={(value) => {
//           setFormData({ ...formData, city: value });
//         }}
//       >
//         <SelectTrigger id="city">
//           <SelectValue placeholder="Select city" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="city1">City 1</SelectItem>
//           <SelectItem value="city2">City 2</SelectItem>
//           <SelectItem value="city3">City 3</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//     <div>
//       <Label htmlFor="state">State</Label>
//       <Select
//         value={formData.state}
//         onValueChange={(value) => {
//           setFormData({ ...formData, state: value });
//         }}
//       >
//         <SelectTrigger id="state">
//           <SelectValue placeholder="Select state" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="state1">State 1</SelectItem>
//           <SelectItem value="state2">State 2</SelectItem>
//           <SelectItem value="state3">State 3</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//     <div>
//       <Label htmlFor="country">Country</Label>
//       <Select
//         value={formData.country}
//         onValueChange={(value) => {
//           setFormData({ ...formData, country: value });
//         }}
//       >
//         <SelectTrigger id="country">
//           <SelectValue placeholder="Select country" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="country1">Country 1</SelectItem>
//           <SelectItem value="country2">Country 2</SelectItem>
//           <SelectItem value="country3">Country 3</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   </div>

//   <div className="flex flex-col">
//     Educational Background
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
//       <div>
//         <Label htmlFor="law-degree">Law Degree</Label>
//         <Input
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               additionalInfo: {
//                 ...formData.additionalInfo,
//                 lawDegree: e.target.value,
//               },
//             });
//           }}
//           id="law-degree"
//           placeholder="Enter law degree"
//         />
//       </div>
//       <div className="">
//         <Label htmlFor="institute-name">Institute Name</Label>
//         <Input
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               additionalInfo: {
//                 ...formData.additionalInfo,
//                 instituteName: e.target.value,
//               },
//             });
//           }}
//           id="institute-name"
//           placeholder="Enter institute name"
//         />
//       </div>
//       <div>
//         <Label htmlFor="graduation-year">Graduation Year</Label>
//         <Input
//           id="graduation-year"
//           type="number"
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               additionalInfo: {
//                 ...formData.additionalInfo,
//                 graduationYear: e.target.value,
//               },
//             });
//           }}
//           placeholder="Enter year"
//           min="1900"
//           max="2099"
//         />
//       </div>
//       <div>
//         <Label htmlFor="postgrad-degree">Postgrad Degree</Label>
//         <Input
//           id="postgrad-degree"
//           onChange={(e) => {
//             setFormData({
//               ...formData,
//               additionalInfo: {
//                 ...formData.additionalInfo,
//                 postgradDegree: e.target.value,
//               },
//             });
//           }}
//           placeholder="Enter postgrad degree (if any)"
//         />
//       </div>
//     </div>
//   </div>

//   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//     <div>
//       <Label htmlFor="additional-certificate">
//         Additional Certificates
//       </Label>
//       <Input
//         onChange={(e) => {
//           setFormData({
//             ...formData,
//             additionalInfo: {
//               ...formData.additionalInfo,
//               additionalCertificate: e.target.value,
//             },
//           });
//         }}
//         id="additional-certificate"
//         placeholder="Enter here"
//       />
//     </div>
//   </div>
//   <div className="flex justify-end items-end">
//     {" "}
//     <Button
//       onClick={(e) => {
//         e.preventDefault();
//         handleSave();
//       }}
//       className="bg-primary text-white"
//     >
//       Save and Next
//     </Button>
//   </div>
// </div>
// </form>
