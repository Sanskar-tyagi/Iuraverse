export const checkUserFormData = (userData: any) => {
  // Check if additionalInfo is missing

  for (let key in userData) {
    if (userData.hasOwnProperty(key) && userData[key] === null) {
      console.log(key);
      return 2;
    }
  }
  if (userData.additionalInfo === null) {
    return 1;
  }
  return 0;
};
