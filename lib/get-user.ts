import {getGithub} from "./gh"

export const getUser = async () => {
  const {data} = await getGithub().rest.users.getAuthenticated()
  return data;
}