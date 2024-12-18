import {getGithub} from "@/lib/gh";

export const UserInfo = async () => {
  const {data} = await getGithub().rest.users.getAuthenticated()

  return <div>
    {data.login}
  </div>
}