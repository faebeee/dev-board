import { SignIn } from '@clerk/nextjs';

export const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignIn/>

        <div className={'mt-5 flex flex-row justify-center align-middle text-center'}>
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffaebeee%2Fdev-board&env=JIRA_USER_MAIL,JIRA_HOST,JIRA_ACCESS_TOKEN,GH_ACCESS_TOKEN,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY">
            <img
              className={'w-auto h-12'}
              src="https://vercel.com/button" alt="Deploy with Vercel"/></a>
        </div>
      </div>
    </div>
  );
};