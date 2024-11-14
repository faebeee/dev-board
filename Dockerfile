FROM node:20 AS base
WORKDIR /app
COPY package.json package-lock.json ./


RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:20-alpine3.19 as release
ENV JIRA_USER_MAIL=#
ENV JIRA_ACCESS_TOKEN=#
ENV JIRA_HOST=#
ENV GH_ACCESS_TOKEN=#
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=#
ENV CLERK_SECRET_KEY=#

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next

EXPOSE 3000

CMD ["npm", "start"]