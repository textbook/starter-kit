FROM cypress/included:3.8.0

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./cypress.json .
COPY ./e2e /e2e

ENTRYPOINT [ "npm" ]
CMD [ "-v" ]
