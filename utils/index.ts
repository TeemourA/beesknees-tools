export const removePropertiesFromObject = (
  initialObject: { [key: string]: unknown },
  propertiesList: string[]
) => {
  const filteredObject = { ...initialObject };

  propertiesList.forEach((prop) => delete filteredObject[prop]);

  return filteredObject;
};
