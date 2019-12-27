FROM cypress/included:3.8.1

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./cypress.json .
COPY ./e2e /e2e

ENTRYPOINT [ "npm" ]
CMD [ "-v" ]
